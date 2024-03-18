import axios from 'axios';
import { serverUrl } from './settings';

const api = axios.create({
  baseURL: `${serverUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const readUser = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};

export const signin = async (email: string, password: string) => {
  const res = await api.post(
    '/auth/signin',
    { email, password },
  );
  return res.data;
};

export const signup = async (email: string, password: string) => {
  const res = await api.post(
    '/auth/signup',
    { email, password },
  );
  return res.data;
};

export const readPads = async () => {
  const res = await api.get('/pads');
  return res.data;
};

export const createPad = async (payload: {
  title: string;
  content: string;
}) => {
  const res = await api.post('/pads', payload);
  return res.data;
};

export const updatePad = async (
  id: number,
  payload: {
    title: string;
    content: string;
  },
) => {
  const res = await api.put(`/pads/${id}`, payload);
  return res.data;
};

export const deletePad = async (id: number) => {
  const res = await api.delete(`/pads/${id}`);
  return res.data;
};
