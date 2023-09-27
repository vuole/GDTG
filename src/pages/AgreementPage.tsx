import "react-quill/dist/quill.snow.css";
import AgreementMembers from "../components/Agreement/AgreementMembers";
import AgreementContent from "../components/Agreement/AgreementContent";
import styled from "styled-components";
import AgreementChat from "../components/Agreement/AgreementChat/AgreementChat";
import { useEffect, useMemo, useState } from "react";
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

  const membersA = useMemo(() => {
    if (
      !currentTransaction.membersA?.find(
        (e) => e._id === currentTransaction.adminA?._id
      )
    ) {
      currentTransaction.membersA?.unshift(currentTransaction.adminA || {});
    }
    return currentTransaction.membersA;
  }, [currentTransaction]);

  const membersB = useMemo(() => {
    if (
      !currentTransaction.membersB?.find(
        (e) => e._id === currentTransaction.adminB?._id
      )
    ) {
      currentTransaction.membersB?.unshift(currentTransaction.adminB || {});
    }
    return currentTransaction.membersB;
  }, [currentTransaction]);

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
        members={membersA || []}
        transactionId={location?.state?.id}
        isLeft
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <AgreementContent transaction={currentTransaction}/>
        <AgreementChat />
      </div>
      <AgreementMembers
        title="Thành Viên Bên B:"
        members={membersB || []}
        transactionId={location?.state?.id}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </Container>
  );
};

export default AgreementPage;
