import axios from 'axios';

// TENANTS ENDPOINTS
export const tenantIsOnline = async (ctx, params = {}) => {
  const headers = await ctx.getRequestHeaders(ctx);
  const res = await axios.get(`${ctx.url}/tenants/isonline`, { headers, params });
  return res?.data;
};

export const getTenantTags = async (ctx) => {
  const headers = await ctx.getRequestHeaders(ctx);
  const res = await axios.get(`${ctx.url}/tenants/gettags`, { headers });
  return res?.data;
};
