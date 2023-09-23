import axios from "axios";
import { User } from "../types/type";
import { BASE_URL, HEADERS } from "./config";
import qs from "qs";

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
};
