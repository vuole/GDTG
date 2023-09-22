import styled from "styled-components";
import Message from "./Message";
import { messages, users } from "./MockData";
import Avatar from "@mui/material/Avatar";

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

let tempId: number = -1;
let tempCount: number = 0;
const Messages = () => {
  return (
    <Container>
      {messages.map((m, i) => {
        const isLeft = m.partyId == 1;
        if (m.userId != tempId) {
          tempCount = 0;
        }
        const isFirstPoint = m.userId != tempId && tempCount === 0;
        const isEndPoint = tempId === -1 || m.userId != tempId;
        const user = users.find((user) => user.id == m.userId);
        tempId = m.userId;
        return (
          <MessageContainer $isLeft={isLeft} key={i}>
            {isFirstPoint && (
              <Avatar src={user?.avatar} alt={tempCount++ + ""} />
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
