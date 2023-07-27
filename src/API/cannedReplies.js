import axios from 'axios';
import catchError from '../helpers/catchError';

// CANNED REPLIES ENDPOINTS
const getAllCannedReplies = async (ctx) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.get(`${ctx.url}/cannedreplies/getall`, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export default getAllCannedReplies;
