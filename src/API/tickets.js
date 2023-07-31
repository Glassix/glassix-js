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


    let nextRequestUrl = `${ctx.url}/tickets/list`;
    do
    {
      const res = await axios.get(nextRequestUrl, { headers, params });

      if(res?.tickets && res?.tickets.length)
      {
        console.log(res?.tickets.length);
        tickets = tickets.concat(res?.tickets);
      }
    }
    while(nextRequestUrl)


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

export const setTicketState = async (ctx, ticketId, params = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.put(`${ctx.url}/tickets/setstate/${ticketId}`, {}, { headers, params });
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
