import axios from 'axios';
import catchError from '../helpers/catchError';

// PROTOCOLS ENDPOINTS
const upload = async (ctx, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/files/upload`, payload, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export default upload;
