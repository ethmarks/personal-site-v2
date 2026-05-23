import { imageSize } from "npm:image-size@^2.0.2";

/**
 * Custom markdown-it rendering rule for images that supports:
 * - Video files (webm, mp4, ogg, mov)
 * - GIF replacement with video (using GIF marker in alt text)
 * - Tall images/videos (using TALL marker in alt text)
 * - Figure with optional caption
 */
export function imageRule(
  tokens,
  idx,
  _options,
  _env,
  _self,
) {
  const token = tokens[idx];
  const srcIndex = token.attrIndex("src");
  const src = token.attrs[srcIndex][1];
  const alt = token.content;
  const title = token.attrGet("title") || "";

  // Check if it's a video based on file extension
  const isVideo = /\.(webm|mp4|ogg|mov)$/i.test(src);

  // Check for special markers in alt text
  const isGif = /GIF/.test(alt);
  const isTall = /TALL/.test(alt);
  const isIframe = /IFRAME/.test(alt);

  // Process alt text by removing markers
  const altProcessed = alt.replace(/GIF/g, "").replace(/TALL/g, "").replace(
    /IFRAME/g,
    "",
  ).trim();

  // Determine the title/caption to use
  const caption = title;
  const displayTitle = caption || altProcessed;

  // Get image dimensions
  const isImgSizeProcessable = /\.(jpeg|png|gif|bmp|webp)$/i.test(src);
  let width, height;
  if (isImgSizeProcessable) {
    const imgData = Deno.readFileSync(src.replace(/^\//, ""));
    const info = imageSize(imgData);
    width = info.width;
    height = info.height;
  }

  // Compute all HTML attributes
  const tag = isVideo ? "video" : (isIframe ? "iframe" : "img");
  const typeClass = isVideo ? (isGif ? "gif" : "video") : "";
  const verticalClass = isTall ? " media-verytall" : "";
  const className = `responsive${
    typeClass ? ` ${typeClass}` : ""
  }${verticalClass}`;
  const dimAttrs = isImgSizeProcessable
    ? `width="${width}" height="${height}"`
    : "";
  const labelAttr = isVideo ? "aria-label" : (isIframe ? "title" : "alt");
  const titleAttr = displayTitle ? ` title="${displayTitle}"` : "";
  const videoAttrs = isVideo
    ? (isGif ? " autoplay loop muted playsinline" : " controls")
    : "";
  const iframeAttrs = isIframe
    ? `frameborder="no" allowtransparency="true" allowfullscreen="true"`
    : "";
  const captionHtml = isIframe
    ? ""
    : (caption ? `<figcaption>${caption}</figcaption>` : "");

  return `<figure>
            <${tag}
              class="${className}"
              src="${src}"
              ${dimAttrs}
              ${labelAttr}="${altProcessed}"
              ${titleAttr}
              ${videoAttrs}
              ${iframeAttrs}>
            </${tag}>
            ${captionHtml}
          </figure>`;
}
