import { Link } from "react-router-dom";
import FormWrapper from "../components/FormWrapper/FormWrapper";
import { FormContainer } from "./RegisterPage";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import PasswordTextField from "../components/PasswordTextField/PasswordTextField";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
  };
  return (
    <FormContainer>
      <FormWrapper
        title="Login"
        navigate={
          <>
            You don't have an account? <Link to="/register">Register</Link>
          </>
        }
      >
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordTextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </Button>
      </FormWrapper>
    </FormContainer>
  );
};

export default LoginPage;
