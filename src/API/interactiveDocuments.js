import axios from 'axios';

// INTERACTIVE DOCUMENTS ENDPOINTS
const sendInteractiveDocument = async (ctx, ticketId, payload = {}) => {
	try {
		const headers = await ctx.getRequestHeaders(ctx);
		const res = await axios.post(`${ctx.url}/interactivedocuments/send/${ticketId}`, payload, {headers});
		return res?.data;
	} catch (error) {
		return {
			statusCode: error?.response?.status,
			message: error?.response?.data?.Message
		};
	}
};

export default sendInteractiveDocument;
