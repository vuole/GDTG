import "react-quill/dist/quill.snow.css";
import AgreementMembers from "../components/Agreement/AgreementMembers";
import AgreementContent from "../components/Agreement/AgreementContent";
import styled from "styled-components";
import AgreementChat from "../components/Agreement/AgreementChat/AgreementChat";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const AgreementPage = () => {
  return (
    <Container>
      <AgreementMembers title="Thành Viên Bên A:" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <AgreementContent />
        <AgreementChat />
      </div>
      <AgreementMembers title="Thành Viên Bên B:" />
    </Container>
  );
};

export default AgreementPage;
