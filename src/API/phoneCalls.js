import axios from 'axios';
import catchError from '../helpers/catchError';

// PHONE CALLS ENDPOINTS
export const startedPhoneCall = async (ctx, ticketId, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/phonecalls/started/${ticketId}`, payload, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const endedPhoneCall = async (ctx, ticketId, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/phonecalls/ended/${ticketId}`, payload, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const audioLinkPhoneCall = async (ctx, ticketId, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/phonecalls/audiolink/${ticketId}`, payload, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};
