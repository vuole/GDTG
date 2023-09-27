import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import FormWrapper from "../components/FormWrapper/FormWrapper";
import { FormContainer } from "./RegisterPage";
import { useMemo, useState } from "react";
import PasswordTextField from "../components/PasswordTextField/PasswordTextField";
import SButton from "../components/Button/SButton";
import STextField from "../components/TextField/STextField";
import Alert from "@mui/material/Alert";
import UserService from "../services/UserService";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const isErrorForm = useMemo(() => {
    return email === "" || password === "";
  }, [email, password]);

  const location = useLocation();
  const navigate = useNavigate();

  if (
    Object.keys(JSON.parse(localStorage.getItem("currentUser") || "{}"))
      .length > 0
  ) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await UserService.login({ email, password }).then((res) => {
        localStorage.setItem("currentUser", JSON.stringify(res));
        navigate("/");
      });
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
        title="Đăng nhập"
        navigate={
          <>
            Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </>
        }
      >
        {location?.state?.status === "success-register" && (
          <Alert severity="success">
            Đăng ký tài khoản thành công. Đăng nhập ngay!
          </Alert>
        )}
        {location?.state?.status === "success-password-change" && (
          <Alert severity="success">
            Đổi mật khẩu thành công. Đăng nhập lại!
          </Alert>
        )}
        {isError && <Alert severity="error">Đăng nhập thất bại</Alert>}
        <STextField
          label="Email"
          variant="outlined"
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
          disabled={isErrorForm}
        >
          Đăng Nhập
        </SButton>
      </FormWrapper>
    </FormContainer>
  );
};

export default LoginPage;
