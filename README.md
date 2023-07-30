# glassix
Official JavaScript client library of the [Glassix REST API](https://docs.glassix.com/reference/overview)

[![NPM version](https://badgen.net/npm/v/glassix)](https://www.npmjs.com/package/glassix)
[![NPM downloads](https://badgen.net/npm/dm/glassix?v)](https://www.npmjs.com/package/glassix)

## Installation:

[NPM](https://www.npmjs.com/package/glassix):

```sh
npm i glassix
```

## Usage:

Import:
```javascript
import glassix from "glassix";
```

Create a client:

```javascript
// Your glassix subdomain
const workspace = 'YOUR_WORKSPACE';
// Find your key and secret on Settings → Developers → Api keys
const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';
// a user with access to your department, preferably an API user
const userName = 'USER_NAME';
```

After that you can invoke Glassix Client:

```javascript
const client = new glassix.GlassixClient(workspace, apiKey, apiSecret, userName);
```

## Methods:

### tickets:

#### [create](https://docs.glassix.com/reference/create-ticket):

```javascript
const payload = {NEW_TICKET_DATA};
const result = await client.tickets.create(payload);
```

#### [get](https://docs.glassix.com/reference/get-ticket):

This endpoint returns a ticket by id.

Variables:
- ticketId (number) required - Ticket Id.

Example:
```javascript
const ticketId = 111111;
const result = await client.tickets.get(ticketId);
```

#### [list](https://docs.glassix.com/reference/get-tickets-list):

This endpoint returns an array of [tickets](https://docs.glassix.com/reference/ticket) with activity in the time frame provided.
A ticket is determined as active if the value of at least one of the following JSON keys is in the time frame:
- open - The time the ticket was opened.
- close - The time the ticket was closed.
- lastActivity - The time of the last activity (e.g., ticket state change, message sent/received, ticket field update, etc.).
It is required to supply since and until.
The max time frame allowed is one calendar month.
The max number of tickets returned in the response is 100.
When there are more than 100 tickets, the response will supply a request URL for the next page. This URL contains the page Query Param. The last page returns an empty paging JSON key.

Variables:
- params (object) required - Tickets list query params.

Example:
```javascript
const params = {TICKETS_PARAMS};
const result = await client.tickets.list(params);
```

#### [send](https://docs.glassix.com/reference/send-ticket):
This endpoint sends a message (transaction type "Message") on behalf of the token's user to all the ticket's participants.
HTML is supported in email and web chat channels; [learn about our HTML support](https://docs.glassix.com/docs/send-a-message-with-html).

Variables:
- ticketId (number) required - Ticket Id.
- payload (object) required - Ticket updating payload.

Example:
```javascript
const ticketId = 111111;
const payload = {TICKET_UPDATING_PAYLOAD};
const result = await client.tickets.send(ticketId, payload);
```

#### [setState](https://docs.glassix.com/reference/set-ticket-sate):
This endpoint resets the state of a ticket.
Tickets may have 4 states:
- Closed
- Open
- Pending
- Snoozed (Note, it is not possible to set it to Snoozed via this endpoint.)

Variables:
- ticketId (number) required - Ticket Id.
- params (object) required - Change ticket status params.

Example:
```javascript
const ticketId = 111111;
const params = {CHANGE_TICKET_STATUS_PARAMS};
const result = await client.tickets.setState(ticketId, params);
```

#### [setFields](https://docs.glassix.com/reference/setfields):
This endpoint updates a ticket field/s.

Variables:
- ticketId (number) required - Ticket Id.
- payload (object) - Ticket fields updating payload. 

Example:
```javascript
const ticketId = 111111;
const payload = {CHANGE_TICKET_FIELDS_PAYLOAD};
const result = await client.tickets.setFields(ticketId, payload);
```

#### [setParticipantName](https://docs.glassix.com/reference/set-participant-name):
This endpoint updates the name of a single participant within a ticket.

Variables:
- ticketId (number) required - Ticket Id.
- payload (object) required - Participant updating payload. 

Example:
```javascript
const ticketId = 111111;
const payload = {PARTICIPANT_UPDATING_PAYLOAD};
const result = await client.tickets.setParticipantName(ticketId, payload);
```

#### [setOwner](https://docs.glassix.com/reference/set-owner):
This endpoint assigns a new owner to a ticket.

Variables:
- ticketId (number) required - Ticket Id.
- params (object) required - Change ticket owner params.

Example:
```javascript
const ticketId = 111111;
const params = {CHANGE_TICKET_OWNER_PARAMS};
const result = await client.tickets.setOwner(ticketId, params);
```

### [assignAvailableUser](https://docs.glassix.com/reference/assign-available-user):
This endpoint allows the specified ticket to be assigned to another available agent. If there is none, the ticket will be moved to the queue.

Variables:
- ticketId (number) required - Ticket Id. 

Example:
```javascript
const ticketId = 111111;
const result = await client.tickets.assignAvailableUser(ticketId);
```

#### [setDepartment](https://docs.glassix.com/reference/set-department):
This endpoint "moves" a ticket to another department. Note, this copies the ticket to the other department where the ticket will receive a new ticket id.

Variables:
- ticketId (number) required - Ticket Id.
- params (object) required - Ticket fields updating params. 

Example:
```javascript
const ticketId = 111111;
const params = {TICKET_DEPARTMENT_PARAMS};
const result = await client.tickets.setDepartment(ticketId, params);
```

#### [addTags](https://docs.glassix.com/reference/add-tags):
```javascript
const nextTags = ['Sales', 'Excel'];
const result = await client.tickets.addTags(ticketId, nextTags);
```

#### [removeTag](https://docs.glassix.com/reference/remove-tag):
This endpoint removes a single tag from a ticket.

Variables:
- ticketId (number) required - Ticket Id.
- payload (object) required - remove ticket tag payload.

Example:
```javascript
const ticketId = 111111;
const payload = {TICKET_TAGS_PAYLOAD};
const result = await client.tickets.removeTag(ticketId, payload);
```

#### [addNote](https://docs.glassix.com/reference/add-note):
This endpoint adds a note to the ticket.
The note will be sent on behalf of the token's user and not visible to customers, only to agents.
At least one of the following params is required to add a note:
- text
- HTML

Variables:
- ticketId (number) required - Ticket Id.
- payload (object) required - remove ticket tag payload. 

Example:
```javascript
const ticketId = 111111;
const payload = {TICKET_NOTE_PARAMS};
const result = await client.tickets.addNote(ticketId, payload);
```

#### [scramble](https://docs.glassix.com/reference/scramble-ticket):
This endpoints removes all the data from this ticket (this action cannot be reversed)

Variables:
- ticketId (number) required - Ticket Id.

Example:
```javascript
const ticketId = 111111;
const result = await client.tickets.scramble(ticketId);
```

#### [pdf](https://docs.glassix.com/referehttps://docs.glassix.com/reference/ticket-pdfnce/add-note):
This endpoint will return the ticket summary, containing all the messages, ticket details and photos as a pdf document.

Variables:
- ticketId (number) required - Ticket Id.
- payload (object) required - ticket PDF payload. 

Example:
```javascript
const ticketId = 111111;
const payload = {TICKET_PDF_PAYLOAD};
const result = await client.tickets.pdf(ticketId, payload);
```

#### [html](https://docs.glassix.com/reference/ticket-html):
This endpoint will return the ticket summary, containing all the messages, ticket details and photos as an HTML document.

Variables:
- ticketId (number) required - Ticket Id.
- payload (object) required - ticket HTML payload. More information .

Example:
```javascript
const ticketId = 111111;
const payload = {TICKET\_HTML\_PAYLOAD};
const result = await client.tickets.html(ticketId, payload);
```

#### [generateSurveyLink](https://docs.glassix.com/reference/generate-survey-link):
Surveys are your way of receiving from your customer information about their experience contacting your center.
Glassix allows you to create and send surveys once tickets are closed.
For the phone call protocol, mapping a survey isn't possible. Using this API endpoint, you can generate a URL to a survey for your ticket that can be sent either using this endpoint or an external service.
Using this endpoint is possible only if:
- The ticket is closed.
- A survey hasn't been sent in the ticket.
- The specific channel of the ticket isn't mapped to a survey.

Variables:
- ticketId (number) required - Ticket Id.
- payload (object) required - generate Survey Link payload.

Example:
```javascript
const ticketId = 111111;
const payload = {GENERATE_SURVAY_LINK_PAYLOAD};
const result = await client.tickets.generateSurveyLink(ticketId, payload);
```

### users:

#### [getAll](https://docs.glassix.com/reference/get-all-users):
This endpoint will return all the users in the department. 

Example:
```javascript
const result = await client.users.getAll();
```

#### [setStatus](https://docs.glassix.com/reference/set-status):
Set the status of a user.

Variables:
- payload (object) required - set Status payload.

Example:
```javascript
  const payload = {SET_STATUS_PAYLOAD};
  const result = await client.users.setStatus(payload);
  ```
  
#### [getStatus](https://docs.glassix.com/reference/get-status):
This get the status of an user

Example:
```javascript
const result = await client.users.getStatus();
```

#### [add](https://docs.glassix.com/reference/add-user):
This endpoint adds new users to the current department.
Each user name needs to be a valid email address.
The API allows you to attach a unique argument to your users.

Variables:
- params (object) required -add user url params.
- payload (object) required -add user payload.

Example:
```javascript
const params = {ADD_USER_PARAMS};
const payload = {ADD_USER_PAYLOAD};
const result = await client.user.add(payload,params);
```

#### [delete](https://docs.glassix.com/reference/delete-user):
This endpoint deletes a user from all of the departments.
The user will only be deleted from departments that both the user and the token's user are in.

Variables:
- params (object) required - delete user params.

Example:
```javascript
const params = {DELETE_USER_PARAMS};
const result = await client.user.delete(params);
```

#### [setUniqueArgument](https://docs.glassix.com/reference/put_users-setuniqueargument):
Add a custom value to a user in this department.
The value is not used by Glassix.
Can be helpfull to set this value as the user id in your CRM for example.
(this argument is per department, meaning that if a user is in 2 departments, it'll have 2 different arguments). Max length is 50 chars.

Variables:
- payload (object) required -set unique argument payload.

Example:
```javascript
const payload = {SET_UNAQUE_ARGUMENT_PAYLOAD};
const result = await client.users.setUniqueArgument(payload);
```

#### [update](https://docs.glassix.com/reference/user-update):
Update a user's information.

Variables:
- payload (object) required - Update a user's information payload. 

Example:
```javascript
const payload = {UPDATE_USERS_INFORMATION_PAYLOAD};
const result = await client.users.update(payload);
```

#### [getByUniqueArgument](https://docs.glassix.com/reference/get-by-unique-argument):
This endpointreturnes a user according to the unique argument provided.

Variables:
- params (object) required -get user by unique argument params.

Example:
```javascript
const params = {GET_USER_BY_UNIQUE_ARGUMENT_PARAMS};
const result = await client.user.getByUniqueArgument(params);
```

#### [setRoles](https://docs.glassix.com/reference/set-roles):
This endpoint updates the roles of an existing user.
This endpoint overrides all existing roles and replaces them with the new ones.
The access token of the user which performs the request must have an admin role.
One of the following roles is always required:
- SystemtUser
- DepartmentAdmin
- DataControler
- MasterUser
- ReadOnly

Variables:
- params (object) required - set user roles params.
- payload (object) required - set user roles payload. 

Example:
```javascript
const params = {SET_USER_ROLES_PARAMS};
const payload = {SET_USER_ROLES_PAYLOAD};
const result = await client.user.setRoles(payload,params);
```

### tenants:

#### [isOnline](https://docs.glassix.com/reference/is-online):
This endpoint checks if the department is open at the moment. Each protocol can have different business hours.

Variables:
- params (object) required -open tenants params. 

Example:
```javascript
const params = {OPEN_TENANTS_PARAMS};
const result = await client.tenants.isOnline(params);
```

#### [getTags](https://docs.glassix.com/reference/get-tags):
This endpoint returns all the available ticket tags from this department. 

Example:
```javascript
const result = await client.tenants.getTags();
```

### contacts:

#### [get](https://docs.glassix.com/reference/get-contacts):
This endpoint returns a contact based on the contact id.

Variables:
- contactId (number) required - Contact Id. 

Example:
```javascript
const contactId = 111111;
const result = await client.contacts.get(contactId);
```

#### [setName](https://docs.glassix.com/reference/set-name):
This endpoint updates the name of the contact.

Variables:
- contactId (number) required - Contact Id. 
- payload (object) required - updates contacts name payload. 

Example:
```javascript
const contactId = 111111;
const payload = {UPDATES_CONTACTS_NAME_PAYLOAD};
const result = await client.contacts.setName(contactId, payload);
```

#### [addIdentifier](https://docs.glassix.com/reference/add-identifier):
This endpoint adds an identifier to an existing contact.
The identifiers that can be added using this endpoint are:
- Phone numer
- Email address
- Facebook ID
- Instgram ID

Variables:
- contactId (number) required - Contact Id. 
- payload (object) required - adds contacts identifier payload. 

Example:
```javascript
const contactId = 111111;
const payload = {ADDS_CONTACTS_IDENTIFIER_PAYLOAD};
const result = await client.contacts.addIdentifier(contactId, payload);
```

#### [setUniqueArgument](https://docs.glassix.com/reference/set-contact-unique-argument):
This endpoint adds and changes a unique parameter to a contact. The parameter can be the contact id in your CRM or any other id you want.

Variables:
- contactId (number) required - Contact Id. 
- payload (object) required - set contacts unique parameter payload . 

Example:
```javascript
const contactId = 111111;
const payload = {SET_CONTACTS_UNIQUE_PARAMETER\_PAYLOAD};
const result = await client.contacts.setUniqueArgument(contactId, payload);
```

#### [deleteIdentifier](https://docs.glassix.com/reference/delete-identifier):
This endpoint deletes an identifier from an existing contact.

Variables:
- contactId (number) required - Contact Id. 
- params (object) required - delete contacts identifier params. 

Example:
```javascript
const contactId = 111111;
const params = {DELETE\_CONTACTS\_IDENTIFIER\_PARAMS};
const result = await client.contacts.deleteIdentifier(contactId, params);
```

### cannedReplies:

#### [getAll](https://docs.glassix.com/reference/get-all-c-anned-replies):
This endpoint returns all of the department's canned replies.

Example:
```javascript
const result = await client.cannedReplies.getAll();
```

### interactiveDocuments:

#### [send](https://docs.glassix.com/reference/send-interactive-document):
Create new documents and send them to all the ticket's participants.
The document will be sent on behalf of the ticket owner.
Each document being sent has a template.
The template is the "structure" of the document, which fields are required, their default values, and more.
After creating a template, in Glassix's settings, you can programmatically send documents without any user interaction.
The request can contain an array of fields.

Variables:
- contactId (number) required - Contact Id. 
- payload (object) required - send documents payload . 

Example:
```javascript
const contactId = 111111;
const payload = {SEND\_DOCUMENTS\_PAYLOAD};
const result = await client.interactiveDocuments.send(contactId, payload);
```

### protocols:

#### [send](https://docs.glassix.com/reference/protocols-send):
This endpoint sends a message, not as a part of a ticket.
Currently the supported protocols are:
- WhatsApp
- SMS
The from parameter must be a number or an email address which is linked to your department.

Variables:
- payload (object) required - send message payload. 

Example:
```javascript
const payload = {SEND_MESSAGE_PAYLOAD};
const result = await client.protocols.send(payload);
```

### phoneCalls:

#### [started](https://docs.glassix.com/reference/send-interactive-document):
This endpoint adds a record that the phone call has started. Have a look at our guide for more details and examples.

Variables:
- contactId (number) required - Contact Id. 
- payload (object) required - record payload .

Example:
```javascript
const contactId = 111111;
const payload = {RECORD_PAYLOAD};
const result = await client.phoneCalls.started(contactId, payload);
```

#### [ended](https://docs.glassix.com/reference/call-ended):
This endpoint adds a record that the phone call has ended. Have a look at our guide for more details and examples.

Variables:
- contactId (number) required - Contact Id. 
- payload (object) required - record payload . 

Example:
```javascript
const contactId = 111111;
const payload = {RECORD_PAYLOAD};
const result = await client.phoneCalls.ended(contactId, payload);
```

#### [audioLink](https://docs.glassix.com/reference/call-audio-link):
This endpoint adds a recording of the phone call as a link reference. Have a look at our guide for more details and examples.

Variables:
- contactId (number) required - Contact Id. 
- payload (object) required - record payload . 

Example:
```javascript
const contactId = 111111;
const payload = {RECORD_PAYLOAD};
const result = await client.phoneCalls.audioLink(contactId, payload);
```

### [getToken](https://docs.glassix.com/reference/access-token):
```javascript
const userName = 'USER_EMAIL_ADDRESS';
const result = await client.getToken(userName);
```

## License

Apache-2.0
