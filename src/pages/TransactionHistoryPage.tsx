import { useEffect } from "react";
import THTopBar from "../components/TransactionHistory/THTopBar";
import TransactionHistory from "../components/TransactionHistory/TransactionHistory";
import UserService from "../services/UserService";

const TransactionHistoryPage = () => {
  return (
    <div>
      <THTopBar />
      <TransactionHistory />
    </div>
  );
};

export default TransactionHistoryPage;
