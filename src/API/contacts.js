import axios from 'axios';
import catchError from '../helpers/catchError';

// CONTACTS ENDPOINTS
export const getContacts = async (ctx, contactId) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.get(`${ctx.url}/contacts/get/${contactId}`, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const setContactName = async (ctx, contactId, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.put(`${ctx.url}/contacts/setname/${contactId}`, payload, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const addContactIdentifier = async (ctx, contactId, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/contacts/addidentifier/${contactId}`, payload, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const setContactUniqueArgument = async (ctx, contactId, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.put(`${ctx.url}/contacts/setuniqueargument/${contactId}`, payload, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const deleteContactIdentifier = async (ctx, contactId, params = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.delete(`${ctx.url}/contacts/deleteidentifier/${contactId}`, { headers, params });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};
