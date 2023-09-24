import { useContext } from "react";
import THTopBar from "../components/TransactionHistory/THTopBar";
import TransactionHistory from "../components/TransactionHistory/TransactionHistory";
import { AuthContext } from "../contexts/AuthContext";

const TransactionHistoryPage = () => {
  const { auth, dispatch } = useContext(AuthContext);

  return (
    <div>
      <THTopBar />
      <TransactionHistory />
    </div>
  );
};

export default TransactionHistoryPage;
