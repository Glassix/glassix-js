import axios from 'axios';
import catchError from '../helpers/catchError';

// CANNED REPLIES ENDPOINTS
export const getAllCannedReplies = async (ctx) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.get(`${ctx.url}/cannedreplies/getall`, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const addCannedReply = async (ctx, payload) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/cannedreplies/add`, payload, {
      headers,
    });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const deleteCannedReply = async (ctx, params = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.delete(`${ctx.url}/cannedreplies/delete`, {
      headers,
      params,
    });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};
