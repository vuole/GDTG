import TextField from "@mui/material/TextField";
import SButton from "../components/Button/SButton";
import styled from "styled-components";
import FormWrapper from "../components/FormWrapper/FormWrapper";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useMemo, useState } from "react";
import STextField from "../components/TextField/STextField";
import { User } from "../types/type";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Action = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;
const TextFieldContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const UpdateProfilePage = () => {
  // const [position, setPosition] = useState<string>("");

  // const handleChange = (event: SelectChangeEvent) => {
  //   setPosition(event.target.value as string);
  // };
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [position, setPosition] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const isErrorForm = useMemo(() => {
    return !name || !phone || !email || !address || !companyName || !position;
  }, [name, phone, email, address, companyName, position]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    UserService.getProfile(currentUser.jwt)
      .then((res) => {
        setName(res.name);
        setEmail(res.email);
        setAddress(res.address);
        setPhone(res.phone);
        setCompanyName(res.companyName);
        setPosition(res.position);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateProfile = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setIsError(false);
    setIsLoading(true);
    try {
      UserService.updateProfile(
        { name, email, address, phone, companyName, position },
        currentUser.jwt
      ).then((res) => {
        console.log("update", res);
      });
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <FormWrapper title="Chỉnh Sửa Hồ Sơ">
        {isError === false && (
          <Alert severity="success">Cập nhật hồ sơ thành công</Alert>
        )}
        <TextFieldContainer>
          {/* <p>Họ và tên: </p> */}
          <STextField
            label="Họ và tên"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            isEmty={!name}
          />
        </TextFieldContainer>
        <TextFieldContainer>
          {/* <p>Email: </p> */}
          <STextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isEmty={!email}
          />
        </TextFieldContainer>
        <TextFieldContainer>
          {/* <p>Số điện thoại: </p> */}
          <STextField
            label="Số điện thoại"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            isEmty={!phone}
          />
        </TextFieldContainer>
        <TextFieldContainer>
          {/* <p>Địa chỉ: </p> */}
          <STextField
            label="Địa chỉ"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            isEmty={!address}
          />
        </TextFieldContainer>
        <TextFieldContainer>
          {/* <p>Tên công ty: </p> */}
          <STextField
            label="Tên công ty"
            fullWidth
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            isEmty={!companyName}
          />
        </TextFieldContainer>
        <TextFieldContainer>
          {/* <p>Chức vụ: </p> */}
          <STextField
            label="Chức vụ"
            fullWidth
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            isEmty={!position}
          />
        </TextFieldContainer>
        {/* <FormControl fullWidth>
          <InputLabel>Chức vụ</InputLabel>
          <Select value={position} label="Position" onChange={handleChange}>
            <MenuItem value={10}>A</MenuItem>
            <MenuItem value={20}>B</MenuItem>
            <MenuItem value={30}>C</MenuItem>
          </Select>
        </FormControl> */}
        <Action>
          <SButton
            color="error"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Hủy
          </SButton>
          <SButton
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              updateProfile();
            }}
            disabled={isErrorForm}
          >
            Lưu
          </SButton>
        </Action>
      </FormWrapper>
    </Container>
  );
};
export default UpdateProfilePage;
