import TextField from "@mui/material/TextField";
import styled from "styled-components";
import SButton from "../../Button/SButton";
import { useState } from "react";

const Container = styled.div`
  padding: 0 10px 0 0;
  height: 45px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const InputBox = ({socket}: any) => {
  const [textMessage, setTextMessage] = useState<string>("");
  
  // const handleSendMessage = () => {
  //   socket?.emit("messagea")
  // }

  return (
    <Container>
      <TextField
        placeholder="Aa..."
        size="small"
        fullWidth
        value={textMessage}
        onChange={(e) => setTextMessage(e.target.value)}
      />
      <SButton>Gửi</SButton>
    </Container>
  );
};

export default InputBox;
