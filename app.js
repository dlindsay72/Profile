
const https = require('https');


function printMessage(userName, badgeCount, point) {
    const message = `${userName} has ${badgeCount} total badge(s) and ${point} points in JavaScript`;
    console.log(message)
}

// Connect to the API URL (https://teamtreehouse.com/danlindsay.json)
const username = "danlindsay";
const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
    let body = "";
    //Read the data
    response.on('data', data => {
        body += data.toString();
    });

    response.on('end', () => {
        //Parse the data
        //Print the data
        const profile = JSON.parse(body);
        printMessage(username, profile.badges.length, profile.points.JavaScript);
    });
    
});

