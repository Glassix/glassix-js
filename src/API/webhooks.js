import axios from 'axios';
import catchError from '../helpers/catchError';

const getEvents = async (ctx, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const queryParams = {};
    if (Object.keys(payload).length > 0) {
      Object.keys(payload).forEach((key) => {
        if (key === 'deleteEvents') {
          queryParams[key] = payload[key];
        }
      });
    }
    const queryString = new URLSearchParams(queryParams).toString();
    const res = await axios.get(`${ctx.url}/webhooks/getevents?${queryString}`, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export default getEvents;
