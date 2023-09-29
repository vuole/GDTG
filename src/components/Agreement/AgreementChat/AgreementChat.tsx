import styled from "styled-components";
import Messages from "./Messages";
import InputBox from "./InputBox";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: overlay;
  overflow-x: hidden;
`;

const AgreementChat = (props: any) => {
  return (
    <Container>
      <Messages />
      <InputBox socket={props.socket}/>
    </Container>
  );
};

export default AgreementChat;
