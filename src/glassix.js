/* eslint-disable camelcase */
import axios from 'axios';
import {
  createTicket,
  getTicket,
  getTicketsList,
  sendTicket,
  setTicketState,
  setTicketFields,
  setTicketParticipantName,
  setTicketOwner,
  assignTicketAvailableUser,
  setTicketDepartment,
  addTicketTags,
  removeTicketTag,
  addTicketNote,
  scrambleTicket,
  pdfTicket,
  htmlTicket,
  generateTicketSurveyLink
} from './API/tickets';
import {
  getAllUsers,
  setUserStatus,
  getUserStatus,
  addUser,
  deleteUser,
  setUserUniqueArgument,
  updateUser,
  getUserByUniqueArgument,
  setUserRoles
} from './API/users';
import { getTenantTags, tenantIsOnline } from './API/tenants';
import {
  getContacts,
  setContactName,
  addContactIdentifier,
  setContactUniqueArgument,
  deleteContactIdentifier,
} from './API/contacts';
import getAllCannedReplies from './API/cannedReplies';
import sendInteractiveDocument from './API/interactiveDocuments';
import sendProtocol from './API/protocols';
import { audioLinkPhoneCall, endedPhoneCall, startedPhoneCall } from './API/phoneCalls';
import getEvents from './API/webhooks';
import upload from './API/files';
import catchError from './helpers/catchError';

class glassix {
  constructor(clientOptions) {
    this.workspace = clientOptions.workspace;
    this.apiKey = clientOptions.apiKey;
    this.apiSecret = clientOptions.apiSecret;
    this.apiVersion = clientOptions.apiVersion ? `v${clientOptions.apiVersion}` : 'v1.2';
    this.userName = clientOptions.userName;
    this.domain = clientOptions.domain || 'glassix.com';
    const protocol = this.domain.includes('localhost') ? 'http' : 'https';
    this.url = `${protocol}://${this.workspace}.${this.domain}/api/${this.apiVersion}`;
    this.accessTokenData = {};
    this.tokenExpirationDate = null;
    this.headers = clientOptions.headers ? clientOptions.headers : {};
  }

  async getToken(userName) {
    try {
      const payload = {
        apiKey: this.apiKey,
        apiSecret: this.apiSecret,
        userName: userName || this.userName,
      };
      const res = await axios.post(`${this.url}/token/get`, payload);
      this.accessTokenData = res?.data;
      this.tokenExpirationDate = new Date(Date.now() + (res?.data?.expires_in * 1000));
      return res?.data;
    } catch (error) {
      return catchError(error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getRequestHeaders(ctx) {
    const headers = Object.assign({}, ctx?.headers);
    let token = ctx?.accessTokenData?.access_token;
    if (!token || !ctx.tokenExpirationDate || (ctx.tokenExpirationDate <= Date.now())) {
      const { access_token } = await ctx.getToken();
      token = access_token;
    }

    headers.Authorization = `Bearer ${token}`;
    return headers;
  }

  // TICKETS ENDPOINTS
  get tickets() {
    const self = this;
    return {
      create: payload => createTicket(self, payload),
      get: ticketId => getTicket(self, ticketId),
      list: params => getTicketsList(self, params),
      send: (ticketId, payload) => sendTicket(self, ticketId, payload),
      setState: (ticketId, params) => setTicketState(self, ticketId, params),
      setFields: (ticketId, payload) => setTicketFields(self, ticketId, payload),
      setParticipantName: (ticketId, payload) => setTicketParticipantName(self, ticketId, payload),
      setOwner: (ticketId, params) => setTicketOwner(self, ticketId, params),
      assignAvailableUser: ticketId => assignTicketAvailableUser(self, ticketId),
      setDepartment: (ticketId, payload) => setTicketDepartment(self, ticketId, payload),
      addTags: (ticketId, payload) => addTicketTags(self, ticketId, payload),
      removeTag: (ticketId, params) => removeTicketTag(self, ticketId, params),
      addNote: (ticketId, payload) => addTicketNote(self, ticketId, payload),
      scramble: ticketId => scrambleTicket(self, ticketId),
      pdf: (ticketId, payload) => pdfTicket(self, ticketId, payload),
      html: (ticketId, payload) => htmlTicket(self, ticketId, payload),
      generateSurveyLink: (ticketId, payload) => generateTicketSurveyLink(self, ticketId, payload),
    };
  }

  // USERS ENDPOINTS
  get users() {
    const self = this;
    return {
      getAll: () => getAllUsers(self),
      setStatus: payload => setUserStatus(self, payload),
      getStatus: () => getUserStatus(self),
      add: (payload, params) => addUser(self, payload, params),
      delete: params => deleteUser(self, params),
      setUniqueArgument: payload => setUserUniqueArgument(self, payload),
      update: payload => updateUser(self, payload),
      getByUniqueArgument: params => getUserByUniqueArgument(self, params),
      setRoles: (payload, params) => setUserRoles(self, payload, params),
    };
  }

  // TENANTS ENDPOINTS
  get tenants() {
    const self = this;
    return {
      isOnline: params => tenantIsOnline(self, params),
      getTags: () => getTenantTags(self),
    };
  }

  // CONTACTS ENDPOINTS
  get contacts() {
    const self = this;
    return {
      get: contactId => getContacts(self, contactId),
      setName: (contactId, payload) => setContactName(self, contactId, payload),
      addIdentifier: (contactId, payload) => addContactIdentifier(self, contactId, payload),
      setUniqueArgument: (contactId, payload) => setContactUniqueArgument(self, contactId, payload),
      deleteIdentifier: (contactId, params) => deleteContactIdentifier(self, contactId, params),
    };
  }

  // CANNED REPLIES ENDPOINTS
  get cannedReplies() {
    const self = this;
    return {
      getAll: () => getAllCannedReplies(self),
    };
  }

  // INTERACTIVE DOCUMENTS ENDPOINTS
  get interactiveDocuments() {
    const self = this;
    return {
      send: (ticketId, payload) => sendInteractiveDocument(self, ticketId, payload),
    };
  }

  // PROTOCOLS ENDPOINTS
  get protocols() {
    const self = this;
    return {
      send: payload => sendProtocol(self, payload),
    };
  }

  // PHONE CALLS ENDPOINTS
  get phoneCalls() {
    const self = this;
    return {
      started: (ticketId, payload) => startedPhoneCall(self, ticketId, payload),
      ended: (ticketId, payload) => endedPhoneCall(self, ticketId, payload),
      audioLink: (ticketId, payload) => audioLinkPhoneCall(self, ticketId, payload),
    };
  }

  // FILES ENDPOINTS
  get files() {
    const self = this;
    return {
      upload: payload => upload(self, payload)
    };
  }

  // PROTOCOLS ENDPOINTS
  get webhooks() {
    const self = this;
    return {
      getevents: payload => getEvents(self, payload),
    };
  }
}

export default glassix;
