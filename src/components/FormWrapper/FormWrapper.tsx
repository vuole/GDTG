import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import { Logo } from "../TransactionHistory/THTopBar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
const StyledFormWrapper = styled.div`
  background-color: white;
  padding: 20px 32px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  min-width: 430px;
`;
export const TextLogo = styled.span`
  color: #5d5b8d;
  font-weight: bold;
  font-size: 24px;
`;
const Title = styled.span`
  color: #5d5b8d;
  font-size: 12px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 366px;
`;
export const Nav = styled.p`
  color: #5d5b8d;
  font-size: 12px;
  margin-top: 10px;
  a {
    text-decoration: none;
  }
`;

interface FormWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  navigate?: string | React.ReactNode;
}

const FormWrapper = ({ children, ...props }: FormWrapperProps) => {
  return (
    <Container>
      <Link to={"/"}>
        <Logo src={logo} />
      </Link>
      <StyledFormWrapper>
        <TextLogo>Trung Gian Giao Dịch</TextLogo>
        <Title>{props.title}</Title>
        <Form>{children}</Form>
        {props.navigate && <Nav>{props.navigate}</Nav>}
      </StyledFormWrapper>
    </Container>
  );
};

export default FormWrapper;
