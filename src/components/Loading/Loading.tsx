import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";
import { Center } from "../Agreement/AgreementContent";

const Container = styled(Center)`
  flex: 1;
`;

const Loading = () => {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

export default Loading;
