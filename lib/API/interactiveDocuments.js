import axios from "axios";

// INTERACTIVE DOCUMENTS ENDPOINTS
export const sendInteractiveDocument = async (ctx, ticketId, payload = {}) => {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/interactivedocuments/send/${ticketId}`, payload, { headers });
    return res?.data;
}