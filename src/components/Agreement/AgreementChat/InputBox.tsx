import TextField from "@mui/material/TextField";
import styled from "styled-components";
import SButton from "../../Button/SButton";
import { useContext, useEffect, useMemo, useState } from "react";
import { Socket } from "socket.io-client";
import { AgreementChatProps } from "./AgreementChat";
import TransactionService from "../../../services/TransactionService";
import { ChatContext } from "../../../contexts/ChatContext";
import { MessageType } from "../../../types/type";

const Container = styled.div`
  padding: 0 10px 0 0;
  height: 45px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InputBox = ({ data, currentUser }: AgreementChatProps) => {
  const [textMessage, setTextMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (textMessage) {     
      TransactionService.sendMessage(
        textMessage,
        data._id || "",
        currentUser.jwt || ""
      ).then((res) => {
        console.log(res);
      });
      setTextMessage("");
    }
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      handleSendMessage();
    }
  };

  return (
    <Container>
      <TextField
        placeholder="Aa..."
        size="small"
        fullWidth
        value={textMessage}
        onKeyDown={(e) => onEnterPress(e)}
        onChange={(e) => setTextMessage(e.target.value)}
      />
      <SButton onClick={(e) => handleSendMessage()}>Gửi</SButton>
    </Container>
  );
};

export default InputBox;
