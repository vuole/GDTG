import styled from "styled-components";
import Messages from "./Messages";
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
  messagesEnd: React.RefObject<HTMLDivElement>;
}

const AgreementChat = ({
  data,
  currentUser,
  messagesEnd,
}: AgreementChatProps) => {
  return (
    <Container>
      <Messages data={data} messagesEnd={messagesEnd} />
      <InputBox data={data} currentUser={currentUser} />
    </Container>
  );
};

export default AgreementChat;
