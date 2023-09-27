import { useMemo, useState } from "react";
import { Logo } from "../components/FormWrapper/FormWrapper";
import PasswordTextField from "../components/PasswordTextField/PasswordTextField";
import { Container, Wrapper } from "./ProfilePage";
import SButton from "../components/Button/SButton";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import Alert from "@mui/material/Alert";

const ActionButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const PasswordChangePage = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState({});

  const navigate = useNavigate();

  const isErrorForm = useMemo(() => {
    return !oldPassword || !newPassword;
  }, [oldPassword, newPassword]);

  const handlePasswordChange = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setIsLoading(true);
    try {
      await UserService.changePassword(
        { oldPassword, newPassword },
        currentUser.jwt
      ).then((res) => {
        setData(res);
      });
    } catch (err: any) {
      setError(err.response);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setError(null);
        setData({});
      }, 2000);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Logo>Đổi Mật Khẩu</Logo>
        {Object.keys(data).length > 0 && (
          <Alert severity="success">Đổi mật khẩu thành công</Alert>
        )}
        {error?.data?.message === "Wrong password" && (
          <Alert severity="error">Sai mật khẩu</Alert>
        )}
        <PasswordTextField
          label="Mật khẩu cũ"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          isEmty={!oldPassword}
        />
        <PasswordTextField
          label="Mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          isEmty={!newPassword}
        />

        <ActionButtonContainer>
          <SButton
            color="error"
            onClick={(e) => {
              navigate("/");
            }}
          >
            Hủy
          </SButton>
          <SButton
            onClick={(e) => {
              handlePasswordChange();
            }}
            disabled={isErrorForm}
          >
            Lưu
          </SButton>
        </ActionButtonContainer>
      </Wrapper>
    </Container>
  );
};

export default PasswordChangePage;
