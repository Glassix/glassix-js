import axios from 'axios';

// USERS ENDPOINTS
export const getAllUsers = async (ctx) => {
	try {
		const headers = await ctx.getRequestHeaders(ctx);
		const res = await axios.get(`${ctx.url}/users/allusers`, {headers});
		return res?.data;
	} catch (error) {
		return {
			statusCode: error?.response?.status,
			message: error?.response?.data?.Message
		};
	}
};

export const setUserStatus = async (ctx, payload = {}) => {
	try {
		const headers = await ctx.getRequestHeaders(ctx);
		const res = await axios.put(`${ctx.url}/users/setstatus`, payload, {headers});
		return res?.data;
	} catch (error) {
		return {
			statusCode: error?.response?.status,
			message: error?.response?.data?.Message
		};
	}
};

export const getUserStatus = async (ctx) => {
	try {
		const headers = await ctx.getRequestHeaders(ctx);
		const res = await axios.get(`${ctx.url}/users/getstatus`, {headers});
		return res?.data;
	} catch (error) {
		return {
			statusCode: error?.response?.status,
			message: error?.response?.data?.Message
		};
	}
};

export const addUser = async (ctx, payload = {}, params = {}) => {
	try {
		const headers = await ctx.getRequestHeaders(ctx);
		const res = await axios.post(`${ctx.url}/users/add`, payload, {headers, params});
		return res?.data;
	} catch (error) {
		return {
			statusCode: error?.response?.status,
			message: error?.response?.data?.Message
		};
	}
};

export const deleteUser = async (ctx, params = {}) => {
	try {
		const headers = await ctx.getRequestHeaders(ctx);
		const res = await axios.delete(`${ctx.url}/users/delete`, {headers, params});
		return res?.data;
	} catch (error) {
		return {
			statusCode: error?.response?.status,
			message: error?.response?.data?.Message
		};
	}
};

export const setUserUniqueArgument = async (ctx, payload = {}) => {
	try {
		const headers = await ctx.getRequestHeaders(ctx);
		const res = await axios.put(`${ctx.url}/users/setuniqueargument`, payload, {headers});
		return res?.data;
	} catch (error) {
		return {
			statusCode: error?.response?.status,
			message: error?.response?.data?.Message
		};
	}
};

export const updateUser = async (ctx, payload = {}) => {
	try {
		const headers = await ctx.getRequestHeaders(ctx);
		const res = await axios.post(`${ctx.url}/users/update`, payload, {headers});
		return res?.data;
	} catch (error) {
		return {
			statusCode: error?.response?.status,
			message: error?.response?.data?.Message
		};
	}
};

export const getUserByUniqueArgument = async (ctx, params = {}) => {
	try {
		const headers = await ctx.getRequestHeaders(ctx);
		const res = await axios.get(`${ctx.url}/users/getbyuniqueargument`, {headers, params});
		return res?.data;
	} catch (error) {
		return {
			statusCode: error?.response?.status,
			message: error?.response?.data?.Message
		};
	}
};

export const setUserRoles = async (ctx, payload = {}, params = {}) => {
	try {
		const headers = await ctx.getRequestHeaders(ctx);
		const res = await axios.post(`${ctx.url}/users/setroles`, payload, {headers, params});
		return res?.data;
	} catch (error) {
		return {
			statusCode: error?.response?.status,
			message: error?.response?.data?.Message
		};
	}
};
