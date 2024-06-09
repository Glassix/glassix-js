require('dotenv').config();
const glassix = require('glassix');

// When working with npm packages you often want to test your package without having to publish it to npm.
// This enables you to have a quicker feedback loop and keeps the number of published versions to a minimum.

// Run in terminal in examples folder: npm link glassix
// Run in terminal: npm run test:examples

console.log("Runing example.js");
const test = async () => {
    const clientOptions = {
        workspace: process.env.WORKSPACE,
        apiKey: process.env.API_KEY,
        apiSecret: process.env.API_SECRET,
        userName: process.env.USER_NAME
    };

    const client = new glassix(clientOptions);

    let ticketId = 53001859;
    return;
   
    // create ticket
    let payload = {
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

    // send a message in an existing ticket
    const sendPayload = {
        text: 'Hello!'
    };
    const result = await client.tickets.send(ticket.id, sendPayload);

    // set ticket fields
    let fieldsPayload = {
        field1: "The great gig in the sky",
        uniqueArgument: "8bc5812f-22cb-4dda-89a4-7dc93a123ede",
        details: {
            source: {
                title: "My Landing Page",
                uri: "https://www.example.com/landing-page"
            }
        }
    };
    const result2 = await client.tickets.setFields(ticket.id, fieldsPayload);

    // set ticket state
    const setStatePayload = {
        nextState: "Closed"
    };
    const result3 = await client.tickets.setState(ticket.id, setStatePayload);

    // set participant name
    const setNamePayload = {
        id: 1,
        name: "Brenda Rahman"
    };
    const result4 = await client.tickets.setParticipantName(ticketId, setNamePayload);

    // set ticket owner
    const setOwnerPayload = {
        nextOwnerUserName: "alinamiss@acme.com",
        keepCurrentOwnerInConversation: false
    };
    const result5 = await client.tickets.setOwner(ticketId, setOwnerPayload);
};
test();
