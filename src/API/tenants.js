import axios from 'axios';
import catchError from '../helpers/catchError';

// TENANTS ENDPOINTS
export const tenantIsOnline = async (ctx, params = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.get(`${ctx.url}/tenants/isonline`, { headers, params });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const getTenantTags = async (ctx) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.get(`${ctx.url}/tenants/gettags`, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};
