import axios from 'axios';
import catchError from '../helpers/catchError';


export const getEvents = async (ctx, payload) => {
    try {
        const headers = await ctx.getRequestHeaders(ctx);
        if (Object.keys(payload).length > 0) {
            Object.keys(payload).forEach((key) => {
                switch (key) {
                    case 'deleteEvents':
                        queryParams[key] = payload[key];
                        break;
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
