import "react-quill/dist/quill.snow.css";
import AgreementMembers from "../components/Agreement/AgreementMembers";
import AgreementContent from "../components/Agreement/AgreementContent";
import styled from "styled-components";
import AgreementChat from "../components/Agreement/AgreementChat/AgreementChat";
import { useEffect, useState } from "react";
import TransactionService from "../services/TransactionService";
import { useLocation } from "react-router-dom";
import { Transaction } from "../types/type";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const AgreementPage = () => {
  const [currentTransaction, setCurrentTransaction] = useState<Transaction>({});
  const [refresh, setRefresh] = useState(false);

  const location = useLocation();
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

    TransactionService.getTransactionDetail(
      location?.state?.id,
      currentUser.jwt
    ).then((res) => {
      setCurrentTransaction(res);
    });
  }, [refresh]);
  return (
    <Container>
      <AgreementMembers
        title="Thành Viên Bên A:"
        members={currentTransaction.membersA || []}
        transactionId={location?.state?.id}
        isLeft
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <AgreementContent />
        <AgreementChat />
      </div>
      <AgreementMembers
        title="Thành Viên Bên B:"
        members={currentTransaction.membersB || []}
        transactionId={location?.state?.id}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </Container>
  );
};

export default AgreementPage;
