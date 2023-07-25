# glassix-js
Javascript and Node.js client library SDK for the Glassix REST API


[![NPM version](https://badgen.net/npm/v/glassix-js)](https://www.npmjs.com/package/glassix-js)
[![NPM downloads](https://badgen.net/npm/dm/glassix-js)](https://www.npmjs.com/package/glassix-js)

## Installation:

[NPM](https://www.npmjs.com/package/glassix-js):

```sh
npm i glassix-js
```

## Usage:

For using Glassix API you need prepare next variables:

const workspace = 'YOUR\_WORKSPACE';

const apiKey = 'YOUR\_API\_KEY';

const apiSecret = 'YOUR\_API\_SECRET';

const apiVersion = 'API\_VERSION\_YOU\_NEED';

const userName = 'YOUR\_USER\_NAME';

const domain = 'YOUR\_DOMAIN';

**Workspace** - this is your subdomain.

For example in <https://app.glassix.com/> subdomain is “app”.


To obtain your **API key** and **API secret**:

- Login into [Glassix](https://app.glassix.com/signin/credentials).
- Click on Settings → Developers → Api keys, or click [here](https://app.glassix.com/00000000-0000-0000-0000-000000000000/admin/api-keys).

Actual information about the **API version** you can find [here](https://docs.glassix.com/reference/overview).

“1.2” API version by default.


**User name** - this is the user’s email address that uses Glassix API.


**Domain** - this is your domain.

For example in <https://app.glassix.com/> domain is “glassix.com”.

“glassix.com” domain by default.

After that you can invoke Glassix Client:

const client = new GlassixClient(workspace, apiKey, apiSecret, apiVersion, userName, domain);

And use Glassix API:


const token = await client.users.getStatus();

const ticketId = 111111;

const ticket = await client.tickets.get(ticketId);

const params = ['Sales', 'Excel'];

const result = await client.tickets.addTags(ticket.ticketId, params);

**Endpoints:**

**getToken:**

An Access Token is a short-lived credential used to authenticate your application to Glassix.

To get an access token, which is valid for 3 hours, use this endpoint.

The access token contains the user and the department.
After obtaining the access token, you must pass it in every request, in the "Authorization" header. Authorization: Bearer TOKEN

Variables:

- userName (string) required - Users' Email address. More information [here](https://docs.glassix.com/reference/access-token).

Example:

const userName = 'USER\_EMAIL\_ADDRESS';
const result = await client.getToken(userName);

**tickets:**

- **create:**
  This endpoint creates a new ticket with participant/s and fields.

After creation, you can send messages on behalf of users. You don't need to include the ticket's owner as a participant. Learn more about how to create a ticket in [this guide](https://docs.glassix.com/docs/create-a-ticket-using-the-api).

Variables:

- payload (object) required - New ticket data. More information [here](https://docs.glassix.com/reference/create-ticket).


Example:
const payload = {NEW\_TICKET\_DATA};

const result = await client.tickets.create(payload);

- **get:**
  This endpoint returns a ticket by id.


Variables:

- ticketId (number) required - Ticket Id. More information [here](https://docs.glassix.com/reference/get-ticket).



Example:
`	`const ticketId = 111111;

const result = await client.tickets.get(ticketId);

- **list:**
  This endpoint returns an array of [tickets](https://docs.glassix.com/reference/ticket) with activity in the time frame provided.
  A ticket is determined as active if the value of at least one of the following JSON keys is in the time frame:
1. open - The time the ticket was opened.
1. close - The time the ticket was closed.
1. lastActivity - The time of the last activity (e.g., ticket state change, message sent/received, ticket field update, etc.).

It is required to supply since and until.

The max time frame allowed is one calendar month.

The max number of tickets returned in the response is 100.

When there are more than 100 tickets, the response will supply a request URL for the next page. This URL contains the page Query Param. The last page returns an empty paging JSON key.

Variables:

- params (object) required - Tickets list query params. More information [here](https://docs.glassix.com/reference/get-tickets-list).


Example:

const params = {TICKETS\_PARAMS};
const result = await client.tickets.list(params);

- **send:**
  This endpoint sends a message (transaction type "Message") on behalf of the token's user to all the ticket's participants.

HTML is supported in email and web chat channels; [learn about our HTML support](https://docs.glassix.com/docs/send-a-message-with-html).

Variables:

- ticketId (number) required - Ticket Id.
- payload (object) required - Ticket updating payload. More information [here](https://docs.glassix.com/reference/send-ticket).


`	`Example:

const ticketId = 111111;

const payload = {TICKET\_UPDATING\_PAYLOAD};

const result = await client.tickets.send(ticketId, payload);

- **setState:**
  This endpoint resets the state of a ticket.
  Tickets may have 4 states:
1. Closed
1. Open
1. Pending
1. Snoozed (Note, it is not possible to set it to Snoozed via this endpoint.)


Variables:

- ticketId (number) required - Ticket Id.
- params (object) required - Change ticket status params. More information [here](https://docs.glassix.com/reference/set-ticket-sate).

Example:

const ticketId = 111111;

const params = {CHANGE\_TICKET\_STATUS\_PARAMS};
const result = await client.tickets.setState(ticketId, params);

- **setFields:**
  This endpoint updates a ticket field/s.

  Variables:
- ticketId (number) required - Ticket Id.
- payload (object) - Ticket fields updating payload. More information [here](https://docs.glassix.com/reference/setfields).


Example:


const ticketId = 111111;

const payload = {CHANGE\_TICKET\_FIELDS\_PAYLOAD};
const result = await client.tickets.setFields(ticketId, payload);

- **setParticipantName:**
  This endpoint updates the name of a single participant within a ticket.

  Variables:
- ticketId (number) required - Ticket Id.
- payload (object) required - Participant updating payload. More information [here](https://docs.glassix.com/reference/set-participant-name).

Example:

const ticketId = 111111;

const payload = {PARTICIPANT\_UPDATING\_PAYLOAD};
const result = await client.tickets.setParticipantName(ticketId, payload);

- **setOwner:**
  This endpoint assigns a new owner to a ticket.

  Variables:
- ticketId (number) required - Ticket Id.
- params (object) required - Change ticket owner params. More information [here](https://docs.glassix.com/reference/set-owner).


`	`Example:


const ticketId = 111111;

const params = {CHANGE\_TICKET\_OWNER\_PARAMS};
`	`const result = await client.tickets.setOwner(ticketId, params);

- **assignAvailableUser:**
  This endpoint allows the specified ticket to be assigned to another available agent. If there is none, the ticket will be moved to the queue.

  Variables:
- ticketId (number) required - Ticket Id. More information [here](https://docs.glassix.com/reference/assign-available-user).


`	`Example:


`	`const ticketId = 111111;

const result = await client.tickets.assignAvailableUser(ticketId);

- **setDepartment:**
  This endpoint "moves" a ticket to another department. Note, this copies the ticket to the other department where the ticket will receive a new ticket id.

  Variables:
- ticketId (number) required - Ticket Id.
- params (object) required - Ticket fields updating params. More information [here](https://docs.glassix.com/reference/set-department).


`	`Example:


const ticketId = 111111;

const params = {TICKET\_DEPARTMENT\_PARAMS};
`	`const result = await client.tickets.setDepartment(ticketId, params);

- **addTags:**
  This endpoint adds tags to a specified ticket.

Note:

1. Each new tag must exist in the allowed tags list, which can be edited in the settings page.
1. You can only update open or snoozed tickets.


Variables:

- ticketId (number) required - Ticket Id.
- payload (object) required - ticket tags updating payload. More information [here](https://docs.glassix.com/reference/add-tags).

Example:


`	`const ticketId = 111111;

const payload = {TICKET\_TAGS\_PAYLOAD};

const result = await client.tickets.addTags(ticketId, payload);

- **removeTag:**
  This endpoint removes a single tag from a ticket.

  Variables:
- ticketId (number) required - Ticket Id.
- payload (object) required - remove ticket tag payload. More information [here](https://docs.glassix.com/reference/remove-tag).


`	`Example:


const ticketId = 111111;

const payload = {TICKET\_TAGS\_PAYLOAD};

const result = await client.tickets.removeTag(ticketId, payload);

- **addNote:**
  This endpoint adds a note to the ticket.

The note will be sent on behalf of the token's user and not visible to customers, only to agents.

At least one of the following params is required to add a note:

1. text
1. HTML


`	`Variables:

- ticketId (number) required - Ticket Id.
- payload (object) required - remove ticket tag payload. More information [here](https://docs.glassix.com/reference/add-note).

Example:


`	`const ticketId = 111111;

const payload = {TICKET\_NOTE\_PARAMS};
`	`const result = await client.tickets.addNote(ticketId, payload);

- **scramble:**
  This endpoints removes all the data from this ticket (this action cannot be reversed)

Variables:

- ticketId (number) required - Ticket Id. More information [here](https://docs.glassix.com/reference/scramble-ticket)

Example:

const ticketId = 111111;
`	`const result = await client.tickets.scramble(ticketId);

- **pdf:**
  This endpoint will return the ticket summary, containing all the messages, ticket details and photos as a pdf document.

  Variables:
- ticketId (number) required - Ticket Id.
- payload (object) required - ticket PDF payload. More information [here](https://docs.glassix.com/referehttps://docs.glassix.com/reference/ticket-pdfnce/add-note).

Example:


`	`const ticketId = 111111;

const payload = {TICKET\_PDF\_PAYLOAD};
const result = await client.tickets.pdf(ticketId, payload);

- **html:**
  This endpoint will return the ticket summary, containing all the messages, ticket details and photos as an HTML document.

  Variables:
- ticketId (number) required - Ticket Id.
- payload (object) required - ticket HTML payload. More information [here](https://docs.glassix.com/reference/ticket-html).

Example:


`	`const ticketId = 111111;

const payload = {TICKET\_HTML\_PAYLOAD};
const result = await client.tickets.html(ticketId, payload);

- **generateSurveyLink:**


Surveys are your way of receiving from your customer information about their experience contacting your center.

Glassix allows you to create and send surveys once tickets are closed.

For the phone call protocol, mapping a survey isn't possible. Using this API endpoint, you can generate a URL to a survey for your ticket that can be sent either using this endpoint or an external service.

Using this endpoint is possible only if:

1. The ticket is closed.
1. A survey hasn't been sent in the ticket.
1. The specific channel of the ticket isn't mapped to a survey.


Variables:

- ticketId (number) required - Ticket Id.
- payload (object) required - generate Survey Link payload. More information [here](https://docs.glassix.com/reference/generate-survey-link).

Example:


`	`const ticketId = 111111;

const payload = {GENERATE\_SURVAY\_LINK\_PAYLOAD};
const result = await client.tickets.generateSurveyLink(ticketId, payload);

**users:**

- **getAll:**
  This endpoint will return all the users in the department. 
  More information [here](https://docs.glassix.com/reference/get-all-users)

  Example:

const result = await client.users.getAll();

- **setStatus:**
  Set the status of a user.

  Variables:
- payload (object) required - set Status payload. More information [here](https://docs.glassix.com/reference/set-status).

  Example:

  const payload = {SET\_STATUS\_PAYLOAD};
  const result = await client.users.setStatus(payload);
- **getStatus:**
  This get the status of an user
  More information [here](https://docs.glassix.com/reference/get-status)

  Example:

const result = await client.users.getStatus();

- **add:**
  This endpoint adds new users to the current department.
  Each user name needs to be a valid email address.
  The API allows you to attach a unique argument to your users.

  Variables:
- params (object) required -add user url params.
- payload (object) required -add user payload. More information [here](https://docs.glassix.com/reference/add-user).

Example:


const params = {ADD\_USER\_PARAMS};
const payload = {ADD\_USER\_PAYLOAD};
const result = await client.user.add(payload,params);

- **delete:**
  This endpoint deletes a user from all of the departments.
  The user will only be deleted from departments that both the user and the token's user are in.

  Variables:
- params (object) required - delete user params.More information [here](https://docs.glassix.com/reference/delete-user)

Example:


const params = {DELETE\_USER\_PARAMS};
const result = await client.user.delete(params);

- **setUniqueArgument:**
  Add a custom value to a user in this department.

The value is not used by Glassix.

Can be helpfull to set this value as the user id in your CRM for example.

(this argument is per department, meaning that if a user is in 2 departments, it'll have 2 different arguments). Max length is 50 chars.

Variables:

- payload (object) required -set unique argument payload. More information [here](https://docs.glassix.com/reference/put_users-setuniqueargument).

Example:


const payload = {SET\_UNAQUE\_ARGUMENT\_PAYLOAD};
const result = await client.users.setUniqueArgument(payload);

- **update:**
  Update a user's information.

  Variables:
- payload (object) required - Update a user's information payload. More information [here](https://docs.glassix.com/reference/user-update).

Example:


const payload = {UPDATE\_USERS\_INFORMATION\_PAYLOAD};
const result = await client.users.update(payload);

- **getByUniqueArgument:**
  This endpointreturnes a user according to the unique argument provided.

  Variables:
- params (object) required -get user by unique argument params.More information [here](https://docs.glassix.com/reference/get-by-unique-argument)

Example:


const params = {GET\_USER\_BY\_UNIQUE\_ARGUMENT\_PARAMS};
const result = await client.user.getByUniqueArgument(params);

- **setRoles:**
  This endpoint updates the roles of an existing user.

This endpoint overrides all existing roles and replaces them with the new ones.

The access token of the user which performs the request must have an admin role.

One of the following roles is always required:

1. SystemtUser
1. DepartmentAdmin
1. DataControler
1. MasterUser
1. ReadOnly


- Variables:
- params (object) required - set user roles params.
- payload (object) required - set user roles payload. More information [here](https://docs.glassix.com/reference/set-roles).

Example:


const params = {SET\_USER\_\_ROLES\_PARAMS};
const payload = {SET\_USER\_ROLES\_PAYLOAD};
const result = await client.user.setRoles(payload,params);


**tenants:**

- **isOnline:**
  This endpoint checks if the department is open at the moment. Each protocol can have different business hours.

  Variables:
- params (object) required -open tenants params. More information [here](https://docs.glassix.com/reference/is-online)

Example:


const params = {OPEN\_TENANTS\_PARAMS};
const result = await client.tenants.isOnline(params);

- **getTags:**
  This endpoint returns all the available ticket tags from this department. More information [here](https://docs.glassix.com/reference/get-tags)

  Example:

const result = await client.tenants.getTags();

**contacts:**

- **get:**
  This endpoint returns a contact based on the contact id.

  Variables:
- contactId (number) required - Contact Id. More information [here](https://docs.glassix.com/reference/get-contacts).


`	`Example:


`	`const contactId = 111111;

const result = await client.contacts.get(contactId);

- **setName:**
  This endpoint updates the name of the contact.

  Variables:
- contactId (number) required - Contact Id. 
- payload (object) required - updates contacts name payload. More information [here](https://docs.glassix.com/reference/set-name).


`	`Example:


`	`const contactId = 111111;

const payload = {UPDATES\_CONTACTS\_NAME\_PAYLOAD};

const result = await client.contacts.setName(contactId, payload);

- **addIdentifier:**
  This endpoint adds an identifier to an existing contact.

The identifiers that can be added using this endpoint are:

1. Phone numer
1. Email address
1. Facebook ID
1. Instgram ID


Variables:

- contactId (number) required - Contact Id. 
- payload (object) required - adds contacts identifier payload. More information [here](https://docs.glassix.com/reference/add-identifier).


`	`Example:


`	`const contactId = 111111;

const payload = {ADDS\_CONTACTS\_IDENTIFIER\_PAYLOAD};

const result = await client.contacts.addIdentifier(contactId, payload);

- **setUniqueArgument:**
  This endpoint adds and changes a unique parameter to a contact. The parameter can be the contact id in your CRM or any other id you want.

  Variables:
- contactId (number) required - Contact Id. 
- payload (object) required - set contacts unique parameter payload . More information [here](https://docs.glassix.com/reference/set-contact-unique-argument).


`	`Example:


`	`const contactId = 111111;

const payload = {SET\_CONTACTS\_UNIQUE\_PARAMETER\_PAYLOAD};

const result = await client.contacts.setUniqueArgument(contactId, payload);

- **deleteIdentifier:**
  This endpoint deletes an identifier from an existing contact.

  Variables:
- contactId (number) required - Contact Id. 
- params (object) required - delete contacts identifier params. More information [here](https://docs.glassix.com/reference/delete-identifier).


`	`Example:


`	`const contactId = 111111;

const params = {DELETE\_CONTACTS\_IDENTIFIER\_PARAMS};

const result = await client.contacts.deleteIdentifier(contactId, params);

**cannedReplies:**

- **getAll:**
  This endpoint returns all of the department's canned replies.More information  [here](https://docs.glassix.com/reference/get-all-c-anned-replies)

  Example:


const result = await client.cannedReplies.getAll();

**interactiveDocuments:**

- **send:**
  Create new documents and send them to all the ticket's participants.

The document will be sent on behalf of the ticket owner.

Each document being sent has a template.

The template is the "structure" of the document, which fields are required, their default values, and more.

After creating a template, in Glassix's settings, you can programmatically send documents without any user interaction.

The request can contain an array of fields.

Variables:

- contactId (number) required - Contact Id. 
- payload (object) required - send documents payload . More information [here](https://docs.glassix.com/reference/send-interactive-document).


`	`Example:


`	`const contactId = 111111;

const payload = {SEND\_DOCUMENTS\_PAYLOAD};

const result = await client.interactiveDocuments.send(contactId, payload);

**protocols:**

- **send:**
  This endpoint sends a message, not as a part of a ticket.
  Currently the supported protocols are:
1. WhatsApp
1. SMS

The from parameter must be a number or an email address which is linked to your department.

Variables:

- payload (object) required - send message payload . More information [here](https://docs.glassix.com/reference/protocols-send).


`	`Example:

const payload = {SEND\_MESSAGE\_PAYLOAD};

const result = await client.protocols.send(payload);

**phoneCalls:**

- **started:**
  This endpoint adds a record that the phone call has started. Have a look at our guide for more details and examples.

  Variables:
- contactId (number) required - Contact Id. 
- payload (object) required - record payload . More information [here](https://docs.glassix.com/reference/send-interactive-document).


`	`Example:


`	`const contactId = 111111;

const payload = {RECORD\_PAYLOAD};

const result = await client.phoneCalls.started(contactId, payload);

- **ended:**
  This endpoint adds a record that the phone call has ended. Have a look at our guide for more details and examples.

  Variables:
- contactId (number) required - Contact Id. 
- payload (object) required - record payload . More information [here](https://docs.glassix.com/reference/call-ended).


`	`Example:


`	`const contactId = 111111;

const payload = {RECORD\_PAYLOAD};

const result = await client.phoneCalls.ended(contactId, payload);

- **audioLink:**
  This endpoint adds a recording of the phone call as a link reference. Have a look at our guide for more details and examples.


Variables:

- contactId (number) required - Contact Id. 
- payload (object) required - record payload . More information [here](https://docs.glassix.com/reference/call-audio-link).


`	`Example:


`	`const contactId = 111111;

const payload = {RECORD\_PAYLOAD};

const result = await client.phoneCalls.audioLink(contactId, payload);
