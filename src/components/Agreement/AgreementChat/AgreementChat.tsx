import styled from "styled-components";
import Messages from "./Messages";
import { Socket } from "socket.io-client";
import InputBox from "./InputBox";
import { Transaction, User } from "../../../types/type";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: overlay;
  overflow-x: hidden;
`;

export interface AgreementChatProps {
  data: Transaction;
  currentUser: User;
}

const AgreementChat = ({ data, currentUser }: AgreementChatProps) => {
  return (
    <Container>
      <Messages data={data} />
      <InputBox data={data} currentUser={currentUser} />
    </Container>
  );
};

export default AgreementChat;
