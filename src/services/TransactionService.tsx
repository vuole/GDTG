import axios from "axios";
import { User } from "../types/type";
import { BASE_URL } from "./config";
import qs from "qs";

export default {
  getTransactionDetail: async (transactionId: string, token: string) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/transactions/detail/${transactionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  addMembersA: async (
    transactionId: string,
    member: { memberID: string },
    token: string
  ) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/transactions/membersa/${transactionId}`,
        qs.stringify(member),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  addMembersB: async (
    transactionId: string,
    member: { memberID: string },
    token: string
  ) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/transactions/membersb/${transactionId}`,
        qs.stringify(member),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  updateContractContent: async (
    transactionId: string,
    contractContent: string,
    token: string
  ) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/transactions/contractcontent/${transactionId}`,
        qs.stringify({ contractContent }),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  confirmContract: async (transactionId: string, token: string) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/transactions/confirmcontract/${transactionId}`,
        qs.stringify({}),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  cancelConfirmContract: async (transactionId: string, token: string) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/transactions/cancelconfirm/${transactionId}`,
        qs.stringify({}),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  sendMessage: async (
    message: string,
    transactionId: string,
    token: string
  ) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/transactions/message/${transactionId}`,
        qs.stringify({ message }),
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
