import { Link } from "react-router-dom";
import FormWrapper from "../components/FormWrapper/FormWrapper";
import { FormContainer } from "./RegisterPage";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import PasswordTextField from "../components/PasswordTextField/PasswordTextField";
import axios from "axios";
import qs from "qs";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
  };

  useEffect(() => {
    axios
      .post(
        "https://trunggiangiaodich.vn:8443/api/users/auth",
        qs.stringify({ email: "abc@gmail.com", password: "123456" }),
        { headers: { "content-type": "application/x-www-form-urlencoded" } }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

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
