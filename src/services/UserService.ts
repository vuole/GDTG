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
  getProfile: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/profile`, {
        withCredentials: true
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
