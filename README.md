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
    // A user with access to your department, preferably an API user
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

#### [Assign available user](https://docs.glassix.com/reference/assign-available-user):
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

### Users:

#### [Get all](https://docs.glassix.com/reference/get-all-users):
```javascript
const users = await client.users.getAll();
```

#### [Set status](https://docs.glassix.com/reference/set-status):
```javascript
const payload = {
    nextStatus: "Break"
};
const result = await client.users.setStatus(payload);
  ```
  
#### [Get status](https://docs.glassix.com/reference/get-status):
```javascript
const status = await client.users.getStatus();
```

#### [Add](https://docs.glassix.com/reference/add-user):

```javascript
const params = {
    role: "SystemUser", 
    userType: "AGENT"
};
const payload = [{
    uniqueArgument: "exampleValue", 
    userName: "john.doe@gmail.com"
}];
const result = await client.users.add(payload, params);
```

#### [Delete](https://docs.glassix.com/reference/delete-user):

```javascript
const userName = {
    userName: "john.doe@gmail.com"
};
const result = await client.users.delete(userName);
```

#### [Set unique argument](https://docs.glassix.com/reference/put_users-setuniqueargument):
```javascript
const uniqueArgument = {
    nextUniqueArgument: "John Doe's unique argument"
};
const result = await client.users.setUniqueArgument(uniqueArgument);
```

#### [Update](https://docs.glassix.com/reference/user-update):
```javascript
const payload = {
        shortName: "John",
        fullName: "John Doe",
        jobTitle: "customer support representative"
    };
const result = await client.users.update(payload);
```

#### [Get by unique argument](https://docs.glassix.com/reference/get-by-unique-argument):
```javascript
const uniqueArgument = {
    uniqueArgument: "John Doe's unique argument"
};
const user = await client.users.getByUniqueArgument(uniqueArgument);
```

#### [Set roles](https://docs.glassix.com/reference/set-roles):
```javascript
const userName = {
    userName: "john.doe@gmail.com"
};
const roles = ["DepartmentAdmin", "SystemUser"];
const result = await client.users.setRoles(roles, userName);
```

### Tenants:

#### [Is online](https://docs.glassix.com/reference/is-online):
```javascript
const parameters = {
    departmentId: "YOUR_API_KEY", 
    protocolType: "Mail"
};
const result = await client.tenants.isOnline(parameters);
```

#### [Get tags](https://docs.glassix.com/reference/get-tags):
```javascript
const tags = await client.tenants.getTags();
```

### Contacts:

#### [Get](https://docs.glassix.com/reference/get-contacts):
```javascript
const contact = await client.contacts.get(contactId);
```

#### [Set name](https://docs.glassix.com/reference/set-name):
```javascript
const payload = {
    nextName: "Jane Doe"
};
const result = await client.contacts.setName(contactId, payload);
```

#### [Add identifier](https://docs.glassix.com/reference/add-identifier):
```javascript
const payload = {
    forceMerge: false, 
    identifierType: "MailAddress", 
    identifier: "jane.doe@gmail.com"
};
const result = await client.contacts.addIdentifier(contactId, payload);
```

#### [Set unique argument](https://docs.glassix.com/reference/set-contact-unique-argument):

```javascript
const payload = {
    nextUniqueArgument: "Jane Doe's unique argument"
};
const result = await client.contacts.setUniqueArgument(contactId, payload);
```

#### [Delete identifier](https://docs.glassix.com/reference/delete-identifier):
```javascript
const params = {
    contactIdentifierId: 1
};
const result = await client.contacts.deleteIdentifier(contactId, params);
```

### Canned Replies:

#### [Get all](https://docs.glassix.com/reference/get-all-c-anned-replies):

```javascript
const cannedReplies = await client.cannedReplies.getAll();
```

### Interactive documents:

#### [Send](https://docs.glassix.com/reference/send-interactive-document):
```javascript
const payload = {
    shouldLockDocument: false,
    baseTemplateId: 20,
    message: "Please enter your full name in the document.",
    fields: [
        {
             type: "Text",
             name: "fullName_1"
        }
    ]
};
const result = await client.interactiveDocuments.send(ticketId, payload);
```

### Protocols:

#### [Send](https://docs.glassix.com/reference/protocols-send):
```javascript
const payload = {
    protocolType: "Whatsapp",
    text: "Hi",
    from: "972524646214",
    to: "972547101833"
};
const result = await client.protocols.send(payload);
```

### Phone Calls:

#### [Started](https://docs.glassix.com/reference/send-interactive-document):
```javascript
const payload = {
    dateTime: "24/12/2020 11:20:00:22"
};
const result = await client.phoneCalls.started(ticketId, payload);
```

#### [Ended](https://docs.glassix.com/reference/call-ended):
```javascript
const payload = {
    dateTime: "24/12/2020 11:25:00:22"
};
const result = await client.phoneCalls.ended(ticketId, payload);
```

#### [Audio Link](https://docs.glassix.com/reference/call-audio-link):
```javascript
const payload = {
    audioUri: "https://file-examples-com.github.io/uploads/2017/11/file_example_OOG_1MG.ogg"
};
const result = await client.phoneCalls.audioLink(ticketId, payload);
```

### Files:
#### [Upload](https://docs.glassix.com/reference/file-upload):
```javascript
const payload = new FormData();

const response = await fetch('https://example.com/some-file.txt');
const blob = await response.blob();

const file = new File([blob], "downloaded_example.txt", {
	type: "text/plain",
});

payload.append(0, file);
const result = await client.files.upload(payload);
```

### Token:
#### [Get](https://docs.glassix.com/reference/access-token):
```javascript
const userName = "john.doe@gmail.com";
const result = await client.getToken(userName);
```

### Events:
#### [Get Events](https://docs.glassix.com/reference/get-events):
```javascript
  const payload = {
      deleteEvent: "false"
  };
  const result = await client.webhooks.getevents(payload);
```
## License

Apache-2.0
