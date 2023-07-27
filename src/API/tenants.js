import axios from 'axios';

// TENANTS ENDPOINTS
export const tenantIsOnline = async (ctx, params = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.get(`${ctx.url}/tenants/isonline`, { headers, params });
    return res?.data;
  } catch (error) {
    return {
      statusCode: error?.response?.status,
      message: error?.response?.data?.Message
    };
  }
};

export const getTenantTags = async (ctx) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.get(`${ctx.url}/tenants/gettags`, { headers });
    return res?.data;
  } catch (error) {
    return {
      statusCode: error?.response?.status,
      message: error?.response?.data?.Message
    };
  }
};
