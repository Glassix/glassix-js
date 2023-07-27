import axios from 'axios';
import catchError from '../helpers/catchError';

// INTERACTIVE DOCUMENTS ENDPOINTS
const sendInteractiveDocument = async (ctx, ticketId, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/interactivedocuments/send/${ticketId}`, payload, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export default sendInteractiveDocument;
