const profile = require('./profile.js');
// Connect to the API URL (https://teamtreehouse.com/danlindsay.json)
const users = process.argv.slice(2);

users.forEach(profile.getrdone);

