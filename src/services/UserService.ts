import axios from "axios";
import { User } from "../types/type";
import { BASE_URL, HEADERS } from "./config";
import qs from "qs";

// axios.defaults.withCredentials = true

export default {
  register: async (data: User) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/users/register`,
        qs.stringify(data),
        HEADERS
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  login: async (data: User) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/users/auth`,
        qs.stringify(data),
        HEADERS
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  getProfile: async (token: string) => {
    try {
      const res = await axios.get(`${BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  updateProfile: async (data: User, token: string) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/users/profile`,
        qs.stringify(data),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  logout: async (token: string) => {
    try {
      const res = await axios.get(`${BASE_URL}/users/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  findUser: async (keyword: string, token: string) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/users/find`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { keyword: keyword },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  createTransaction: async (
    data: { name: string; adminB: string },
    token: string
  ) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/transactions/create`,
        qs.stringify(data),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  getTransactionList: async (token: string) => {
    try {
      const res = await axios.get(`${BASE_URL}/transactions/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  changePassword: async (
    data: { oldPassword: string; newPassword: string },
    token: string
  ) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/users/changepass`,
        qs.stringify(data),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
