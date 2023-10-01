import TextField from "@mui/material/TextField";
import styled from "styled-components";
import SButton from "../../Button/SButton";
import { AgreementChatProps } from "./AgreementChat";
import TransactionService from "../../../services/TransactionService";
import { useState } from "react";
import STextField from "../../TextField/STextField";
import theme from "../../../theme";

const Container = styled.div`
  padding: 0 10px 0 0;
  height: fit-content;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InputBox = ({ data, currentUser }:  Omit<AgreementChatProps, "messagesEnd">) => {
  const [textMessage, setTextMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (textMessage) {
      TransactionService.sendMessage(
        textMessage,
        data._id || "",
        currentUser.jwt || ""
      ).then((res) => {});
      setTextMessage("");
    }
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container>
      <STextField
        placeholder="Aa..."
        size="small"
        multiline
        maxRows={4}
        fullWidth
        value={textMessage}
        onKeyDown={(e) => onEnterPress(e)}
        onChange={(e) => setTextMessage(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px",
            backgroundColor: theme.palette.grey["100"],
          },
          padding: "5px 5px 2px 5px",
        }}
      />
      <SButton color="info" onClick={(e) => handleSendMessage()}>
        Gửi
      </SButton>
    </Container>
  );
};

export default InputBox;
