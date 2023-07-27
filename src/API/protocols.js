import axios from 'axios';
import catchError from '../helpers/catchError';

// PROTOCOLS ENDPOINTS
const sendProtocol = async (ctx, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/protocols/send`, payload, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export default sendProtocol;
