import axios from 'axios';

// PROTOCOLS ENDPOINTS
const sendProtocol = async (ctx, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/protocols/send`, payload, { headers });
    return res?.data;
  } catch (error) {
    return {
      statusCode: error?.response?.status,
      message: error?.response?.data?.Message
    };
  }
};

export default sendProtocol;
