import axios from 'axios';

// PHONE CALLS ENDPOINTS
export const startedPhoneCall = async (ctx, ticketId, payload = {}) => {
  const headers = await ctx.getRequestHeaders(ctx);
  const res = await axios.post(`${ctx.url}/phonecalls/started/${ticketId}`, payload, { headers });
  return res?.data;
};

export const endedPhoneCall = async (ctx, ticketId, payload = {}) => {
  const headers = await ctx.getRequestHeaders(ctx);
  const res = await axios.post(`${ctx.url}/phonecalls/ended/${ticketId}`, payload, { headers });
  return res?.data;
};

export const audioLinkPhoneCall = async (ctx, ticketId, payload = {}) => {
  const headers = await ctx.getRequestHeaders(ctx);
  const res = await axios.post(`${ctx.url}/phonecalls/audiolink/${ticketId}`, payload, { headers });
  return res?.data;
};
