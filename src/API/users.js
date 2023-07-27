import axios from 'axios';
import catchError from '../helpers/catchError';

// USERS ENDPOINTS
export const getAllUsers = async (ctx) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.get(`${ctx.url}/users/allusers`, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const setUserStatus = async (ctx, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.put(`${ctx.url}/users/setstatus`, payload, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const getUserStatus = async (ctx) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.get(`${ctx.url}/users/getstatus`, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const addUser = async (ctx, payload = {}, params = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/users/add`, payload, { headers, params });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const deleteUser = async (ctx, params = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.delete(`${ctx.url}/users/delete`, { headers, params });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const setUserUniqueArgument = async (ctx, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.put(`${ctx.url}/users/setuniqueargument`, payload, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const updateUser = async (ctx, payload = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/users/update`, payload, { headers });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const getUserByUniqueArgument = async (ctx, params = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.get(`${ctx.url}/users/getbyuniqueargument`, { headers, params });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const setUserRoles = async (ctx, payload = {}, params = {}) => {
  try {
    const headers = await ctx.getRequestHeaders(ctx);
    const res = await axios.post(`${ctx.url}/users/setroles`, payload, { headers, params });
    return res?.data;
  } catch (error) {
    return catchError(error);
  }
};
