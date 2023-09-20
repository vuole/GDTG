import styled from "styled-components";
import FormWrapper from "../components/FormWrapper/FormWrapper";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import PasswordTextField from "../components/PasswordTextField/PasswordTextField";
import Button from "@mui/material/Button";
import { useState } from "react";

export const FormContainer = styled.div`
  background-color: #0095c5;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegisterPage = () => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(phone);
  };
  return (
    <FormContainer>
      <FormWrapper
        title="Register"
        navigate={
          <>
            You do have an account? <Link to="/login">Login</Link>
          </>
        }
      >
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Phone"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
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
          Register
        </Button>
      </FormWrapper>
    </FormContainer>
  );
};

export default RegisterPage;
