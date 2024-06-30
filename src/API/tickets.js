
import axios from 'axios';
import catchError from '../helpers/catchError';

// TICKETS ENDPOINTS
export const createTicket = async (ctx, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/tickets/create`, payload, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const getTicket = async (ctx, ticketId) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.get(`${ctx.url}/tickets/get/${ticketId}`, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const getTicketsList = async (ctx, params = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    let tickets = [];

    let count = 0;
    let nextRequestUrl = null;
    do {
      let res = null;
      if (count === 0) {
        // first request
        res = await axios.get(`${ctx.url}/tickets/list`, { headers, params });
      }
      else {
        // pagination
        res = await axios.get(nextRequestUrl, { headers });
      }

      console.log(nextRequestUrl);
      count += 1;

      // Aggregate the response tickets
      if (res?.data?.tickets && res?.data?.tickets.length) {
        console.warn(res?.data?.tickets.length);
        tickets = tickets.concat(res?.data?.tickets);
      }

      // Let's check if we need to make more requests
      nextRequestUrl = res?.data?.paging?.next;
    }
    while (nextRequestUrl && count < 15);

    return tickets;
  } catch (error) {
    return catchError(error);
  }
};

export const sendTicket = async (ctx, ticketId, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/tickets/send/${ticketId}`, payload, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const setTicketState = async (ctx, ticketId, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const queryParams = {};
    const bodyParams = {};
    if (Object.keys(payload).length > 0) {
      Object.keys(payload).forEach((key) => {
        switch (key) {
          case 'nextState':
          case 'sendTicketStateChangedMessage':
          case 'getTicket':
          case 'enableWebhook':
            queryParams[key] = payload[key];
            break;
          default:
            bodyParams[key] = payload[key];
        }
      });
    }
    const queryString = new URLSearchParams(queryParams).toString();

    const res = await axios.put(`${ctx.url}/tickets/setstate/${ticketId}?${queryString}`, bodyParams, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const setTicketFields = async (ctx, ticketId, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.put(`${ctx.url}/tickets/setfields/${ticketId}`, payload, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const setTicketParticipantName = async (ctx, ticketId, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.put(`${ctx.url}/tickets/setparticipantname/${ticketId}`, payload, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const setTicketOwner = async (ctx, ticketId, params = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.put(`${ctx.url}/tickets/setowner/${ticketId}`, {}, { headers, params });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const assignTicketAvailableUser = async (ctx, ticketId) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.put(`${ctx.url}/tickets/assignavailableuser/${ticketId}`, {}, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const setTicketDepartment = async (ctx, ticketId, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.put(`${ctx.url}/tickets/setdepartment/${ticketId}`, payload, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const addTicketTags = async (ctx, ticketId, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/tickets/addtags/${ticketId}`, payload, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const removeTicketTag = async (ctx, ticketId, params = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.delete(`${ctx.url}/tickets/removetag/${ticketId}`, { headers, params });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const addTicketNote = async (ctx, ticketId, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/tickets/addnote/${ticketId}`, payload, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const scrambleTicket = async (ctx, ticketId) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.delete(`${ctx.url}/tickets/scramble/${ticketId}`, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const pdfTicket = async (ctx, ticketId, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/tickets/pdf/${ticketId}`, payload, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const htmlTicket = async (ctx, ticketId, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/tickets/html/${ticketId}`, payload, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const generateTicketSurveyLink = async (ctx, ticketId, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/tickets/generatesurveylink/${ticketId}`, payload, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};
