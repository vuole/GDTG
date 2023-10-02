import styled from "styled-components";
import { AgreementChatProps } from "./AgreementChat";
import TransactionService from "../../../services/TransactionService";
import { useState } from "react";
import STextField from "../../TextField/STextField";
import SendIcon from "@mui/icons-material/Send";
import { Center } from "../AgreementContent";

const Container = styled.div`
  padding: 0 10px 0 0;
  height: fit-content;
  display: flex;
  align-items: center;
`;

const SendButton = styled(Center)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  &:hover {
    background-color: #f0f2f5;
  }
`;

const InputBox = ({
  data,
  currentUser,
}: Omit<AgreementChatProps, "messagesEnd">) => {
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
          padding: "5px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px",
            backgroundColor: "#f0f2f5",
          },
          ".MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            { border: "none" },
        }}
      />
      <SendButton onClick={(e) => handleSendMessage()}>
        <SendIcon sx={{ color: "#0095C5", fontSize: "20px" }} />
      </SendButton>
    </Container>
  );
};

export default InputBox;
