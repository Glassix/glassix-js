// When working with npm packages you often want to test your package without having to publish it to npm.
// This enables you to have a quicker feedback loop and keeps the number of published versions to a minimum.

// Run once: npm i
// After every changes in src files: npm run build
// To run examples.js: npm run test:examples

const glassix = require('../lib');
console.log("Runing example.js");

// Your glassix subdomain
const workspace = 'YOUR_WORKSPACE';
// Find your key and secret on Settings → Developers → Api keys
const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';
// a user with access to your department, preferably an API user
const userName = 'USER_NAME';


const client = new glassix.GlassixClient(workspace, apiKey, apiSecret, userName);
