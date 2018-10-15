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

// -----------------------------------------------------------------------------

// How many of each event type are there? (PullRequestEvent, PushEvent, etc)

  // Make array to store event types.
  let eventTypes = [];
  
  // Query event type for each object.
  for (let i = 0; i < githubData.length; i++) {
    let eventType = githubData[i].type;

    // If event type is not in array, add it. If not, move on.
    if(eventTypes.indexOf(eventType) === -1) {
      eventTypes.push(eventType);
    }
  }

  // Create an object to store the count of each event type.
  let eventTypesCount = {};
  for (let i = 0; i < eventTypes.length; i++) {
    eventTypesCount[eventTypes[i]] = 0;
  }

  // Loop through events again and increase counter object depending on event type.

  for (let i = 0; i < githubData.length; i++) {
    let eventType = githubData[i].type;
    eventTypesCount[eventType] += 1;
  }
  
  // Print results to console.
  for(eventType in eventTypesCount) {
    console.log(`${eventType} occurred ${eventTypesCount[eventType]} times.`);
  }
  
//-------------------------------------------------------------------------------  

// List all Github users who submitted a pull request that was approved by Steve.

// List all repositories on which Steve had an event, and show how many events were on each one.

// Which event had the most number of commits?

// Which programming langugages were affected by Steve's events?

// What programming language was the most affected by Steve's events?
