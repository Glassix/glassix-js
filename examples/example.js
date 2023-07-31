require('dotenv').config();
const glassix = require('glassix');

// When working with npm packages you often want to test your package without having to publish it to npm.
// This enables you to have a quicker feedback loop and keeps the number of published versions to a minimum.

// Run in terminal in examples folder: npm link glassix
// Run in terminal: npm run test:examples

console.log("Runing example.js");

const test = async ()=> {
    const client = new glassix(process.env.WORKSPACE, process.env.API_KEY, process.env.API_SECRET, process.env.USER_NAME);

    // get ticket
    let ticket = await client.tickets.get(53001859);
    
    // update it's tags
    const nextTags = ['Sales'];
    const result = await client.tickets.addTags(ticket.id, nextTags);
};
test();
