import styled from "styled-components";
import Message from "./Message";
import Avatar from "@mui/material/Avatar";
import { ChatContext } from "../../../contexts/ChatContext";
import { useContext, useEffect } from "react";
import { MessageType, Transaction } from "../../../types/type";

const Container = styled.div`
  flex: 1;
  padding: 8px;
  overflow-y: overlay;
  overflow-x: hidden;
`;

const MessageContainer = styled.div<{ $isLeft: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.$isLeft ? "row" : "row-reverse")};
  gap: 5px;
`;

interface MessagesProps {
  data: Transaction;
}

const Messages = ({ data }: MessagesProps) => {
  const { chatContextData, dispatch } = useContext(ChatContext);

  useEffect(() => {
    dispatch({ type: "INIT_MESSAGE", payload: data.conversations });
  }, [data]);

  return (
    <Container>
      {chatContextData.conversations?.map((m, i) => {
        const isLeft = m.messageType === MessageType.MessageA;

        const isFirstPoint =
          m.senderID !== chatContextData.conversations[i - 1]?.senderID;

        return (
          <MessageContainer $isLeft={isLeft} key={i}>
            {isFirstPoint && <Avatar src="" />}
            <Message data={m} isLeft={isLeft} isFirstPoint={isFirstPoint} />
          </MessageContainer>
        );
      })}
    </Container>
  );
};

export default Messages;
