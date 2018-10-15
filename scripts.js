// How many total commits were made in all of Steve's events?

let commitCount = 0;
for (let i = 0; i < githubData.length; i++) {

  let eventCommits = githubData[i].payload.commits;

  // Check if event has commits and increase commit count if so
  if(eventCommits) {
    commitCount += eventCommits.length;
  } else {
    // No commits in this event
  }

}

console.log("Total Commits:", commitCount);

// How many of each event type are there? (PullRequestEvent, PushEvent, etc)

// List all Github users who submitted a pull request that was approved by Steve.

// List all repositories on which Steve had an event, and show how many events were on each one.

// Which event had the most number of commits?

// Which programming langugages were affected by Steve's events?

// What programming language was the most affected by Steve's events?
