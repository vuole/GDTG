import styled from "styled-components";
import FormWrapper from "../components/FormWrapper/FormWrapper";
import { Link, useNavigate } from "react-router-dom";
import PasswordTextField from "../components/PasswordTextField/PasswordTextField";
import { useMemo, useState } from "react";
import UserService from "../services/UserService";
import SButton from "../components/Button/SButton";
import STextField from "../components/TextField/STextField";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

export const FormContainer = styled.div`
  min-height: 100vh;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegisterPage = () => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const isErrorForm = useMemo(() => {
    return name === "" || phone === "" || email === "" || password === "";
  }, [name, phone, email, password]);

  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await UserService.register({ name, email, phone, password }).then(
        (res) => {
          navigate("/login", { state: { status: "success-register" } });
        }
      );
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer
      style={{ background: "linear-gradient(90deg, #0095C5 0%, #0DB966 100%)" }}
    >
      <FormWrapper
        title="Đăng ký"
        navigate={
          <>
            Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </>
        }
      >
        {isError && <Alert severity="error">Đăng ký không thành công</Alert>}
        <STextField
          label="Họ và tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          isEmty={name === ""}
        />
        <STextField
          label="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          isEmty={phone === ""}
        />
        <STextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isEmty={email === ""}
        />
        <PasswordTextField
          label="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isEmty={password === ""}
        />
        <SButton
          type="submit"
          onClick={(e) => handleSubmit(e)}
          disabled={isErrorForm || isLoading}
        >
          <>
          <p>Đăng Ký</p>
          {isLoading && (
            <CircularProgress
              sx={{ color: "white", marginLeft: "5px" }}
              size={25}
            />
          )}</>
        </SButton>
      </FormWrapper>
    </FormContainer>
  );
};

export default RegisterPage;
