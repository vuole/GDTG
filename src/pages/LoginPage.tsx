import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import FormWrapper from "../components/FormWrapper/FormWrapper";
import { FormContainer } from "./RegisterPage";
import { useContext, useMemo, useState } from "react";
import PasswordTextField from "../components/PasswordTextField/PasswordTextField";
import SButton from "../components/Button/SButton";
import STextField from "../components/TextField/STextField";
import Alert from "@mui/material/Alert";
import UserService from "../services/UserService";
import { AuthContext } from "../contexts/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { auth, dispatch } = useContext(AuthContext);

  const isErrorForm = useMemo(() => {
    return email === "" || password === "";
  }, [email, password]);

  const location = useLocation();
  const navigate = useNavigate();

  if (auth.currentUser) return <Navigate to="/" />;

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await UserService.login({ email, password }).then((res) => {
        dispatch({ type: "LOGGED", payload: res });
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
        {isError && (
          <Alert severity="error">Email hoặc mật khẩu không chính xác</Alert>
        )}
        <STextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isEmty={email === ""}
        />
        <PasswordTextField
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
