import "react-quill/dist/quill.snow.css";
import AgreementMembers from "../components/Agreement/AgreementMembers";
import AgreementContent from "../components/Agreement/AgreementContent";
import styled from "styled-components";
import AgreementChat from "../components/Agreement/AgreementChat/AgreementChat";
import { useContext, useEffect, useMemo, useState } from "react";
import TransactionService from "../services/TransactionService";
import { useLocation } from "react-router-dom";
import { MessageType, Transaction } from "../types/type";
import { Socket, io } from "socket.io-client";
import { SOCKET_URL } from "../services/config";
import { ChatContext } from "../contexts/ChatContext";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const AgreementPage = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction>({});
  const [refresh, setRefresh] = useState(false);
  const { dispatch } = useContext(ChatContext);

  const location = useLocation();

  const currentUser = useMemo(() => {
    return JSON.parse(localStorage.getItem("currentUser") || "{}");
  }, []);

  useEffect(() => {
    TransactionService.getTransactionDetail(
      location?.state?.id,
      currentUser.jwt
    ).then((res) => {
      setCurrentTransaction(res);
    });
  }, [refresh]);

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

  const isMemberA = useMemo(() => {
    const memberA = currentTransaction.membersA?.find(
      (member) => member._id === currentUser._id
    );
    return !memberA ? false : true;
  }, [currentTransaction]);

  useEffect(() => {
    setSocket(
      io(SOCKET_URL, {
        auth: {
          token: currentUser.jwt,
        },
      })
    );
    return () => {
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    socket?.on("connect", () => {
      socket?.emit("transactionView", { transactionID: location?.state?.id });
      socket.on("messagea", (data) => {
        dispatch({
          type: "SENT_MESSAGE",
          payload: {
            message: data.message,
            senderID: data.sender._id,
            senderName: data.sender.name,
            messageType: MessageType.MessageA,
            createAt: data.createAt,
          },
        });
      });
      socket.on("messageb", (data) => {
        dispatch({
          type: "SENT_MESSAGE",
          payload: {
            message: data.message,
            senderID: data.sender._id,
            senderName: data.sender.name,
            messageType: MessageType.MessageB,
            createAt: data.createAt,
          },
        });
      });
    });
    return () => {
      socket?.disconnect();
    };
  }, [socket]);

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
        <AgreementContent
          transaction={currentTransaction}
          refresh={refresh}
          setRefresh={setRefresh}
        />
        <AgreementChat data={currentTransaction} currentUser={currentUser} />
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
