import axios from 'axios';

// CANNED REPLIES ENDPOINTS
const getAllCannedReplies = async (ctx) => {
  const headers = await ctx.getRequestHeaders(ctx);
  const res = await axios.get(`${ctx.url}/cannedreplies/getall`, { headers });
  return res?.data;
};

export default getAllCannedReplies;
