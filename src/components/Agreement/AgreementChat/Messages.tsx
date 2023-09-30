import styled from "styled-components";
import Message from "./Message";
import { messages, users } from "./MockData";
import Avatar from "@mui/material/Avatar";
import { ChatContext } from "../../../contexts/ChatContext";
import { useContext, useEffect } from "react";
import { MessageType, Transaction } from "../../../types/type";

const Container = styled.div`
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

let tempId: string = "";
let tempCount: number = 0;

const Messages = ({ data }: MessagesProps) => {
  const { chatContextData, dispatch } = useContext(ChatContext);

  useEffect(() => {
    dispatch({ type: "INIT_MESSAGE", payload: data.conversations });
  }, [data]);

  return (
    <Container>
      {chatContextData.conversations?.map((m, i) => {
        const isLeft = m.messageType == MessageType.MessageA;
        if (m.senderID != tempId) {
          tempCount = 0;
        }
        const isFirstPoint = m.senderID != tempId && tempCount === 0;
        const isEndPoint = tempId === "" || m.senderID != tempId;
        // const user = users.find((user) => user.id == m.userId);
        tempId = m.senderID || "";
        return (
          <MessageContainer $isLeft={isLeft} key={i}>
            {isFirstPoint && (
              <Avatar src="" alt={tempCount++ + ""} />
            )}
            <Message
              data={m}
              isLeft={isLeft}
              isFirstPoint={isFirstPoint}
              isEndPoint={isEndPoint}
            />
          </MessageContainer>
        );
      })}
    </Container>
  );
};

export default Messages;
