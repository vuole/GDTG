import styled from "styled-components";

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
export const Logo = styled.span`
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
`;

interface FormWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  navigate?: string | React.ReactNode;
}

const FormWrapper = ({ children, ...props }: FormWrapperProps) => {
  return (
    <StyledFormWrapper>
      <Logo>Trung Gian Giao Dịch</Logo>
      <Title>{props.title}</Title>
      <Form>{children}</Form>
      {props.navigate && <Nav>{props.navigate}</Nav>}
    </StyledFormWrapper>
  );
};

export default FormWrapper;
