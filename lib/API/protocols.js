import axios from "axios";

// PROTOCOLS ENDPOINTS
export const sendProtocol = async (ctx, payload = {}) => {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/protocols/send`, payload, { headers });
    return res?.data;
}