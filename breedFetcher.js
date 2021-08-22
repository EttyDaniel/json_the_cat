const request = require('request');
const args = process.argv.slice(2);

// Make sure that the user provided at least one argument
if (args[0] === undefined) {
  console.log("Error: Incorrect usage, a single argument ('breed') is required");
  process.exit();
}

request(`https://api.thecatapi.com/v1/breeds/search?name=${args[0]}`, (error, response, body) => {
  // An error has occured , print it and exit
  if (error !== null) {
    console.log("The program has encountred an error:");
    console.log(error);
    process.exit();
  }

  const data = JSON.parse(body);

  // Making sure the reply contains something
  if (data === null || data === undefined) {
    console.log("Error: received a null response");
  } else if (data.length === 0) {
    // The response is empty, breed was not found
    console.log("Error:Breed (" + args[0] + ") provided as argument was not found!");
  } else {
    // We've got something, print the description
    console.log("Breed (" + args[0] + "):" + data[0].description);
  }
});