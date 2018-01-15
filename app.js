//Require for https module
const https = require('https');
//Require http module for status codes
const http = require('http');

//Print error messages
function printError(error) {
    console.error(error.message);
}

function printMessage(userName, badgeCount, point) {
    const message = `${userName} has ${badgeCount} total badge(s) and ${point} points in JavaScript`;
    console.log(message)
}
function getProfile(username) {
    try {
        const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
            if (response.statusCode === 200) {
                let body = "";
                //Read the data
                response.on('data', data => {
                    body += data.toString();
                });

                response.on('end', () => {
                    //Parse the data
                    //Print the data
                    try {
                        const profile = JSON.parse(body);
                        printMessage(username, profile.badges.length, profile.points.JavaScript);
                    } catch (error) {
                        printError(error);
                    }
                });
            } else {
                const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
                const statusCodeError = new Error(message);
                printError(statusCodeError);
            }
        });

        request.on('error', printError);
    } catch (error) {
        printError(error);
    }
}
// Connect to the API URL (https://teamtreehouse.com/danlindsay.json)
const users = process.argv.slice(2);

users.forEach(getProfile);

