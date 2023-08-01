require('dotenv').config();
const glassix = require('glassix');

// When working with npm packages you often want to test your package without having to publish it to npm.
// This enables you to have a quicker feedback loop and keeps the number of published versions to a minimum.

// Run in terminal in examples folder: npm link glassix
// Run in terminal: npm run test:examples

console.log("Runing example.js");

const test = async ()=> {
    const clientOptions = {
        workspace: process.env.WORKSPACE,
        apiKey: process.env.API_KEY,
        apiSecret: process.env.API_SECRET,
        userName: process.env.USER_NAME
    };
    const client = new glassix(clientOptions);

    // create ticket
    payload = {
        participants: [
          {
            type: "Client",
            protocolType: "Mail",
            subProtocolType: "MailTo",
            name: "David Gilmour",
            identifier: "david.gilmour@gmail.com"
          }
        ],
        tags: [
          "Info"
        ]
      };
    let newTicket = await client.tickets.create(payload);

    // get ticket
    let ticket = await client.tickets.get(newTicket.id);
    
    // update ticket's tags
    const newTags = ['Sales'];
    const nextTags = await client.tickets.addTags(ticket.id, newTags);

    // list all tickets between dates
    let query = {
        since: '01/07/2023 00:00:00:00',
        until: '30/07/2023 23:59:59:00'
    };
    const tickets = await client.tickets.list(query); 
};
test();
