export async function getRepoCount(username) {
  const reposResponse = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    },
  );

  if (!reposResponse.ok) {
    throw new Error(`Failed to fetch repositories: ${reposResponse.status}`);
  }

  const repos = await reposResponse.json();

  return repos.length;
}

export async function getCommitCount(username) {
  const commitsResponse = await fetch(
    `https://api.github.com/search/commits?q=author:${username}&per_page=1`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    },
  );

  if (!commitsResponse.ok) {
    throw new Error(`Failed to fetch commits: ${commitsResponse.status}`);
  }

  const commitsData = await commitsResponse.json();
  return commitsData.total_count;
}

export async function getContributionCount(username) {
  const contributionsResponse = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}`,
  );

  if (!contributionsResponse.ok) {
    throw new Error(
      `Failed to fetch contributions: ${contributionsResponse.status}`,
    );
  }

  const contributionsData = await contributionsResponse.json();
  const totalContributions = Object.values(
    contributionsData.total || {},
  ).reduce((sum, count) => sum + count, 0);

  return totalContributions;
}
