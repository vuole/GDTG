import TextField from "@mui/material/TextField";
import styled from "styled-components";
import SButton from "../../Button/SButton";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Container = styled.div`
  padding: 0 10px 0 0;
  height: 45px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const InputBox = () => {
  const [socket, setSocket] = useState<any>(null);
  const [textMessage, setTextMessage] = useState<string>("");

  useEffect(() => {
    setSocket(io("http://localhost:8000/chat"));
  }, []);

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
