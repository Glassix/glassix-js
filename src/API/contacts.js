import axios from 'axios';

// CONTACTS ENDPOINTS
export const getContacts = async (ctx, contactId) => {
  const headers = await ctx.getRequestHeaders(ctx);
  const res = await axios.get(`${ctx.url}/contacts/get/${contactId}`, { headers });
  return res?.data;
};

export const setContactName = async (ctx, contactId, payload = {}) => {
  const headers = await ctx.getRequestHeaders(ctx);
  const res = await axios.put(`${ctx.url}/contacts/setname/${contactId}`, payload, { headers });
  return res?.data;
};

export const addContactIdentifier = async (ctx, contactId, payload = {}) => {
  const headers = await ctx.getRequestHeaders(ctx);
  const res = await axios.post(`${ctx.url}/contacts/addidentifier/${contactId}`, payload, { headers });
  return res?.data;
};

export const setContactUniqueArgument = async (ctx, contactId, payload = {}) => {
  const headers = await ctx.getRequestHeaders(ctx);
  const res = await axios.put(`${ctx.url}/contacts/setuniqueargument/${contactId}`, payload, { headers });
  return res?.data;
};

export const deleteContactIdentifier = async (ctx, contactId, params = {}) => {
  const headers = await ctx.getRequestHeaders(ctx);
  const res = await axios.delete(`${ctx.url}/contacts/deleteidentifier/${contactId}`, { headers, params });
  return res?.data;
};
