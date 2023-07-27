import axios from 'axios';

// CANNED REPLIES ENDPOINTS
const getAllCannedReplies = async (ctx) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.get(`${ctx.url}/cannedreplies/getall`, { headers });
    return res?.data;
  } catch (error) {
    return {
      statusCode: error?.response?.status,
      message: error?.response?.data?.Message
    };
  }
};

export default getAllCannedReplies;
