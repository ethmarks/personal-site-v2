/**
 * Custom markdown-it plugin for blockquote citations.
 * Parses citation patterns (like "-- Author Name") from blockquotes
 * and wraps them in <cite> tags.
 *
 * Uses a core ruler to modify the token stream before rendering,
 * ensuring proper handling of nested markdown (links, etc).
 */

const dashPatterns = ["-- ", "– ", "— ", "~ "];
const citationLengthLimit = 2048;

/**
 * Plugin function to add citation support to blockquotes.
 * Must be used with markdown-it's .use() method.
 */
export function citationPlugin(md) {
  md.core.ruler.push("blockquote_citation", function (state) {
    const tokens = state.tokens;

    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type !== "blockquote_open") continue;

      // Find the matching blockquote_close
      let depth = 1;
      let closeIdx = i + 1;
      while (closeIdx < tokens.length && depth > 0) {
        if (tokens[closeIdx].type === "blockquote_open") {
          depth++;
        } else if (tokens[closeIdx].type === "blockquote_close") {
          depth--;
        }
        closeIdx++;
      }
      closeIdx--; // Point to the actual close token

      // Search backwards for citation in inline tokens
      let citationInfo = null;

      for (let j = closeIdx - 1; j > i; j--) {
        const token = tokens[j];
        if (token.type !== "inline" || !token.children) continue;

        // Look for citation pattern in children
        for (let k = 0; k < token.children.length; k++) {
          const child = token.children[k];
          if (child.type !== "text") continue;

          for (const pattern of dashPatterns) {
            const patternIdx = child.content.indexOf(pattern);
            if (patternIdx !== -1) {
              // Check if what follows is a valid citation length
              const afterPattern = child.content.substring(
                patternIdx + pattern.length,
              );
              // Sum up remaining text in children to check length
              let totalCiteLen = afterPattern.length;
              for (let m = k + 1; m < token.children.length; m++) {
                totalCiteLen += token.children[m].content?.length || 0;
              }

              if (totalCiteLen > 0 && totalCiteLen < citationLengthLimit) {
                citationInfo = {
                  tokenIdx: j,
                  childIdx: k,
                  patternIdx: patternIdx,
                  pattern: pattern,
                };
                break;
              }
            }
          }
          if (citationInfo) break;
        }
        if (citationInfo) break;
      }

      if (!citationInfo) continue;

      const inlineToken = tokens[citationInfo.tokenIdx];
      const children = inlineToken.children;
      const childIdx = citationInfo.childIdx;
      const patternIdx = citationInfo.patternIdx;
      const pattern = citationInfo.pattern;

      // Split children: before citation and citation content
      const textChild = children[childIdx];
      const beforeText = textChild.content.substring(0, patternIdx);
      const afterText = textChild.content.substring(
        patternIdx + pattern.length,
      );

      // Build citation children (tokens after the pattern)
      const citationChildren = [];
      if (afterText) {
        const newTextToken = new state.Token("text", "", 0);
        newTextToken.content = afterText;
        citationChildren.push(newTextToken);
      }
      for (let k = childIdx + 1; k < children.length; k++) {
        citationChildren.push(children[k]);
      }

      // Modify original inline token to only contain content before citation
      const newChildren = children.slice(0, childIdx);
      if (beforeText.trim()) {
        const newTextToken = new state.Token("text", "", 0);
        newTextToken.content = beforeText.trimEnd();
        newChildren.push(newTextToken);
      }
      inlineToken.children = newChildren;

      // Update the content property
      inlineToken.content = inlineToken.content.substring(
        0,
        inlineToken.content.indexOf(pattern),
      ).trimEnd();

      // Check if the paragraph containing the citation is now empty
      // If the inline token only had the citation, remove the paragraph
      const isEmptyParagraph = newChildren.length === 0 ||
        (newChildren.length === 1 &&
          newChildren[0].type === "softbreak");

      // Find the paragraph tokens around the inline token
      const paragraphOpenIdx = citationInfo.tokenIdx - 1;
      const paragraphCloseIdx = citationInfo.tokenIdx + 1;

      // Create citation tokens
      const citeOpen = new state.Token("cite_open", "cite", 1);
      const citeInline = new state.Token("inline", "", 0);
      citeInline.children = citationChildren;
      citeInline.content = citationChildren
        .map((c) => c.content || "")
        .join("");
      const citeClose = new state.Token("cite_close", "cite", -1);

      if (
        isEmptyParagraph &&
        tokens[paragraphOpenIdx]?.type === "paragraph_open" &&
        tokens[paragraphCloseIdx]?.type === "paragraph_close"
      ) {
        // Replace the empty paragraph with the cite element
        tokens.splice(
          paragraphOpenIdx,
          3,
          citeOpen,
          citeInline,
          citeClose,
        );
        // Adjust closeIdx since we removed/added tokens
        closeIdx = closeIdx - 3 + 3;
      } else {
        // Insert cite tokens before blockquote_close
        tokens.splice(closeIdx, 0, citeOpen, citeInline, citeClose);
      }
    }

    return true;
  });
}
