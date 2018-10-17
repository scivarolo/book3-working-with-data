// How many total commits were made in all of Steve's events?

let commitCount = 0;
githubData.forEach((event) => {

  let eventCommits = event.payload.commits;
  // Check if event has commits and increase commit count if so
  if(eventCommits) {
    commitCount += eventCommits.length;
  } 
});

console.log("Total Commits:", commitCount);

// -----------------------------------------------------------------------------

// 2. How many of each event type are there? (PullRequestEvent, PushEvent, etc)

  // Make array to store event types.
  let allEventTypes = [];
  
  githubData.forEach((event) => {
    allEventTypes.push(event.type);
  });

  //Make object to count each eventtype in array
  let eventTypesCounter = {};
  allEventTypes.forEach((eventType) => {
    //If eventType is already in object, 
    eventTypesCounter[eventType] = (eventTypesCounter[eventType] || 0) + 1;
  });

  // Print results to console.
  for(eventType in eventTypesCounter) {
    console.log(`${eventType} occurred ${eventTypesCounter[eventType]} times.`);
  }

//-------------------------------------------------------------------------------  

// List all Github users who submitted a pull request that was approved by Steve.

  // Make array of all pull requests.
  // let pullRequests = [];

  // Make array to hold users that submitted pull requests approved by Steve
  let prUsers = [];

  // Loop through events and do something if type is PullRequestEvent
  githubData.forEach((event) => {
    if(event.type === "PullRequestEvent") {
      // Get user that created Pull Request
      let user = event.payload.pull_request.user.login;
      
      // Store PullRequestEvent Action (open or closed)
      let action = event.payload.action;

      // check if PR was approved by stevebrownlee
      // Excludes any "open" events
      if (action === "closed") {
        // Add user to prUsers array if not in there already.
        if (prUsers.indexOf(user) === -1) {
          prUsers.push(user);
        }    
      }
    }
  });

  console.log(`The following users have submitted Pull Requests approved by Steve: ${prUsers.join(", ")}.`);

//-------------------------------------------------------------------------------

// List all repositories on which Steve had an event, and show how many events were on each one.

// Array to store unique repos, and count them.
let eventRepos = [];

// For each event, get repository name and create object if not already there.
githubData.forEach((event) => {
  // Get repo name
  let repoName = event.repo.name;
  
  // For first event, go ahead and add its object to array so array isn't empty.
  if(eventRepos.length === 0) {
    let repoObject = {
      repoName: repoName,
      count: 0
    }
    eventRepos.push(repoObject);
  }
  
  // Look for event object in array
  let repoObjectIndex = -1;
  
  for(let j = 0; j < eventRepos.length; j++) {
    // Store index if repo is found
    if (eventRepos[j].repoName === repoName) {
      repoObjectIndex = j;
    }
  }
  
  // If event object is in array, increase it's count by 1
  // If event object is not found, create object with count of 1
  if (repoObjectIndex >= 0) {
    eventRepos[repoObjectIndex].count += 1;
  } else {
    let repoObject = {
      repoName: repoName,
      count: 1
    }
    eventRepos.push(repoObject);
  }
  
});

// Log the number of events in each repo.
eventRepos.forEach((repo) => {
  console.log(`Repo ${repo.repoName} has ${repo.count} events.`);
});

//-------------------------------------------------------------------------------

// Which event had the most number of commits?

// Create variable to store highest count
let mostCommitsId;
let mostCommitsCount = 0;

// Loop through events and get number of commits.

for (let i = 0; i < githubData.length; i++) {
  let eventCommits = githubData[i].payload.commits;
  let eventId = githubData[i].id;

  // Check if event has more commits than current highest commit. 
  // If it has more, replace mostCommitsId and mostCommitsCount.
  // If not, continue to the next one.
  if(eventCommits && eventCommits.length > mostCommitsCount) {
    mostCommitsId = eventId;
    mostCommitsCount = eventCommits.length;
  }
}

console.log(`Event ${mostCommitsId} has the most commits with a count of ${mostCommitsCount}.`);

//-------------------------------------------------------------------------------

// Which programming langugages were affected by Steve's events?

let languages = [];

for (let i = 0; i < githubData.length; i++) {

  // Pull requests have language attached to them
  let pullRequest = githubData[i].payload.pull_request;
  let language;

  // If its a pull request, find the language and add it to the languages array if its not already there.
  if (pullRequest) {
    language = pullRequest.head.repo.language;
    if(languages.indexOf(language) === -1) {
      languages.push(language);
    }
  }
}

console.log(`The languages affected by Steve's events are ${languages.join(" and ")}.`);

//-------------------------------------------------------------------------------

// What programming language was the most affected by Steve's events?

// Take languages array from step above and make into objects so we can count
let languageCounter = {};
for (let i = 0; i < languages.length; i++) {
  languageCounter[languages[i]] = 0;
}

//Loop through githubData and count language usage.
for (let i = 0; i < githubData.length; i++) {
  //Check if event is pull request
  let isPR = githubData[i].payload.pull_request;
  let language;
  if (isPR) {
    language = isPR.head.repo.language;
    // Find language in languageCounter and +1
    languageCounter[language] += 1;
  }
}

let mostUsedLang;
let mostUsedLangCount = 0;

//Loop through values in languageCounter and compare
for (key in languageCounter) {
  //If the current value being looped is larger than the mostUsedLangCount, make it the mostUsedLang and mostUsedLangCount
  if (languageCounter[key] > mostUsedLangCount) {
    mostUsedLang = key;
    mostUsedLangCount = languageCounter[key];
  }
}

console.log("Language Counter:", languageCounter);
console.log("Most Used Language:", mostUsedLang);


