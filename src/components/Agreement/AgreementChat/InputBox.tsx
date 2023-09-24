import TextField from "@mui/material/TextField";
import styled from "styled-components";
import SButton from "../../Button/SButton";

const Container = styled.div`
  padding: 0 10px 0 0;
  height: 45px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const InputBox = () => {
  return (
    <Container>
      <TextField placeholder="Aa..." size="small" fullWidth />
      <SButton>Gửi</SButton>
    </Container>
  );
};

export default InputBox;
