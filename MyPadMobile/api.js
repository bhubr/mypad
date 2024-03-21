import axios from "axios";
import { serverUrl } from "./settings";

const api = axios.create({
  baseURL: `${serverUrl}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const readUser = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const signin = async (email, password) => {
  const res = await api.post("/auth/signin", { email, password });
  return res.data;
};

export const signup = async (email, password) => {
  const res = await api.post("/auth/signup", { email, password });
  return res.data;
};

export const readPads = async ({ jwt }) => {
  const res = await api.get("/pads", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.data;
};

export const readOnePad = async (id) => {
  const res = await api.get(`/pads/${id}`);
  return res.data;
};

export const createPad = async (payload) => {
  const res = await api.post("/pads", payload);
  return res.data;
};

export const updatePad = async (id, payload) => {
  const res = await api.put(`/pads/${id}`, payload);
  return res.data;
};

export const deletePad = async (id) => {
  const res = await api.delete(`/pads/${id}`);
  return res.data;
};
