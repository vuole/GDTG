import styled from "styled-components";
import Messages from "./Messages";
import { Socket } from "socket.io-client";
import InputBox from "./InputBox";
import { Transaction } from "../../../types/type";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: overlay;
  overflow-x: hidden;
`;

export interface AgreementChatProps {
  socket: Socket;
  data: Transaction;
}

const AgreementChat = ({ socket, data }: AgreementChatProps) => {
  return (
    <Container>
      <Messages data={data} />
      <InputBox socket={socket} data={data} />
    </Container>
  );
};

export default AgreementChat;
