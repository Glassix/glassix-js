# [Glassix](https://www.glassix.com)

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
import glassix from 'glassix';
```

Or using require:
```javascript
const glassix = require('glassix');
```

Create a client:

```javascript
const clientOptions = {
    // Your glassix subdomain
    workspace: process.env.WORKSPACE,
    // Find your key and secret on Settings → Developers → Api keys
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    // a user with access to your department, preferably an API user
    userName: process.env.USER_NAME
};
const client = new glassix(clientOptions);
```

## Methods:

### Tickets:

#### [Create](https://docs.glassix.com/reference/create-ticket):

```javascript
const payload = {
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
const newTicket = await client.tickets.create(payload);
```

#### [Get](https://docs.glassix.com/reference/get-ticket):

```javascript
const ticket = await client.tickets.get(ticketId);
```

#### [List](https://docs.glassix.com/reference/get-tickets-list):

```javascript
let payload = {
    since: '01/07/2023 00:00:00:00',
    until: '30/07/2023 23:59:59:00'
};
const tickets = await client.tickets.list(payload);
```

#### [Send](https://docs.glassix.com/reference/send-ticket):
```javascript
const payload = {
    text: 'Hello!'
};
const result = await client.tickets.send(ticketId, payload);
```

#### [Set state](https://docs.glassix.com/reference/set-ticket-sate):
```javascript
  const payload = {
      nextState: "Closed"
  };
  const result = await client.tickets.setState(ticketId, payload);
```

#### [Set fields](https://docs.glassix.com/reference/setfields):
```javascript
let payload = {
    field1: "The great gig in the sky",
    uniqueArgument: "8bc5812f-22cb-4dda-89a4-7dc93a123ede",
    details: {
        source: {
            title: "My Landing Page",
            uri: "https://www.example.com/landing-page"
        }   
    }
};
const result = await client.tickets.setFields(ticketId, payload);
```

#### [Set participant name](https://docs.glassix.com/reference/set-participant-name):
```javascript
const payload = {
    id: 1,
    name: "Brenda Rahman"
};
const result = await client.tickets.setParticipantName(ticketId, payload);
```

#### [Set ticket owner](https://docs.glassix.com/reference/set-owner):
```javascript
const payload = {
    nextOwnerUserName: "alinamiss@acme.com",
    keepCurrentOwnerInConversation: false
};
const result = await client.tickets.setOwner(ticketId, payload);
```

### [Assign available user](https://docs.glassix.com/reference/assign-available-user):
```javascript
const result = await client.tickets.assignAvailableUser(ticketId);
```

#### [Set department](https://docs.glassix.com/reference/set-department):
```javascript
const payload = {
  departmentId: '5baf94b7-4ebb-4442-81a5-27ac4dd1f03f'
};
const result = await client.tickets.setDepartment(ticketId, payload);
```

#### [Add tags](https://docs.glassix.com/reference/add-tags):
```javascript
const newTags = ['Sales', 'Excel'];
const nextTags = await client.tickets.addTags(ticketId, newTags);
```

#### [Remove tag](https://docs.glassix.com/reference/remove-tag):
```javascript
const payload = {
  tag: 'Sales'
};
const result = await client.tickets.removeTag(ticketId, payload);
```

#### [Add note](https://docs.glassix.com/reference/add-note):
```javascript
const payload = {
  text: 'Ye on properly handsome returned throwing am no whatever.'
};
const result = await client.tickets.addNote(ticketId, payload);
```

#### [Scramble](https://docs.glassix.com/reference/scramble-ticket):
```javascript
const result = await client.tickets.scramble(ticketId);
```

#### [PDF](https://docs.glassix.com/referehttps://docs.glassix.com/reference/ticket-pdfnce/add-note):
```javascript
const payload = {
  includeDetails: true,
  includeConversationLink: false,
  includeNotes: true
};
const result = await client.tickets.pdf(ticketId, payload);
```

#### [HTML](https://docs.glassix.com/reference/ticket-html):
```javascript
const payload = {
  includeDetails: true,
  includeConversationLink: false,
  includeNotes: true
};
const result = await client.tickets.html(ticketId, payload);
```

#### [Generate survey link](https://docs.glassix.com/reference/generate-survey-link):
```javascript
const payload = {
  surveyId: 73993,
  participantId: 1
};
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
