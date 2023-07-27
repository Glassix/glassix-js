import axios from 'axios';

// PHONE CALLS ENDPOINTS
export const startedPhoneCall = async (ctx, ticketId, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/phonecalls/started/${ticketId}`, payload, { headers });
    return res?.data;
  } catch (error) {
    return {
      statusCode: error?.response?.status,
      message: error?.response?.data?.Message
    };
  }
};

export const endedPhoneCall = async (ctx, ticketId, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/phonecalls/ended/${ticketId}`, payload, { headers });
    return res?.data;
  } catch (error) {
    return {
      statusCode: error?.response?.status,
      message: error?.response?.data?.Message
    };
  }
};

export const audioLinkPhoneCall = async (ctx, ticketId, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/phonecalls/audiolink/${ticketId}`, payload, { headers });
    return res?.data;
  } catch (error) {
    return {
      statusCode: error?.response?.status,
      message: error?.response?.data?.Message
    };
  }
};
