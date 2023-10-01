import styled from "styled-components";
import Moment from "react-moment";
import { Message as MessageType} from "../../../types/type";

const Container = styled.div<{
  $isLeft: boolean;
  $isFirstPoint: boolean;
  $isEndPoint: boolean;
}>`
  height: fit-content;
  background-color: ${(props) => (props.$isLeft ? "#ccc" : "#A9E1F7")};
  border-radius: 6px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isLeft ? "flex-start" : "flex-end")};
  width: fit-content;
  max-width: 80%;
  margin-bottom: 2px;
  margin-left: ${(props) =>
    props.$isLeft && !props.$isFirstPoint ? "45px" : "0px"};
  margin-right: ${(props) =>
    !props.$isLeft && !props.$isFirstPoint ? "45px" : "0px"};
  .sending-time {
    display: ${(props) => (props.$isEndPoint ? "block" : "none")};
    font-size: 10px;
    color: grey;
  }
`;
const Sender = styled.div<{ $isFirstPoint: boolean }>`
  color: #7f69cb;
  font-size: 12px;
  display: ${(props) => (props.$isFirstPoint ? "flex" : "none")};
`;
const TextMessage = styled.div`
  display: flex;
  align-items: center;
`;

const calendarStrings = {
  lastDay: "HH:mm [Yesterday]",
  sameDay: "HH:mm",
  nextDay: "[Tomorrow at] HH:mm",
  lastWeek: "HH:mm [last] dddd",
  nextWeek: "dddd [at] HH:mm",
  sameElse: "HH:mm L",
};

interface MessageProps {
data: MessageType;
isLeft: boolean;
isFirstPoint: boolean;
isEndPoint?: boolean;
}

const Message = ({ data, isLeft, isFirstPoint, isEndPoint=true }: MessageProps) => {
  return (
    <Container
      $isLeft={isLeft}
      $isFirstPoint={isFirstPoint}
      $isEndPoint={isEndPoint}
    >
      <Sender $isFirstPoint={isFirstPoint}>{data.senderName}</Sender>
      <TextMessage>{data.message}</TextMessage>
      <Moment className="sending-time" calendar={calendarStrings}>
        {data.createdAt}
      </Moment>
    </Container>
  );
};

export default Message;
