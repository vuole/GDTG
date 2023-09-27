import styled from "styled-components";
import { Logo } from "../components/FormWrapper/FormWrapper";
import { useEffect, useState } from "react";
import { User } from "../types/type";
import UserService from "../services/UserService";
import Alert from "@mui/material/Alert";
import UpdateProfile from "../components/Profile/UpdateProfile";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px;
`;

export const Wrapper = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
  font-size: 18px;
  border-bottom: 1px solid #ccc;
  height: 60px;
`;
const Info = styled.div`
  flex: 1;
  font-weight: 600;
`;
const InfoValue = styled.div`
  flex: 1;
`;

const ProfilePage = () => {
  const [profile, setProfile] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean | null>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    UserService.getProfile(currentUser.jwt)
      .then((res) => {
        setProfile(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  return (
    <Container>
      <Wrapper>
        <Logo>Thông Tin Cá Nhân</Logo>
        {isError === false && (
          <Alert severity="success">Cập nhật hồ sơ thành công</Alert>
        )}
        <div style={{ width: "100%" }}>
          <InfoContainer>
            <Info>Họ và tên:</Info>
            <InfoValue> {profile?.name || "*Chưa có thông tin này*"}</InfoValue>
          </InfoContainer>

          <InfoContainer>
            <Info>Email:</Info>
            <InfoValue>
              {" "}
              {profile?.email || "*Chưa có thông tin này*"}
            </InfoValue>
          </InfoContainer>

          <InfoContainer>
            <Info>Số điện thoại:</Info>
            <InfoValue>
              {" "}
              {profile?.phone || "*Chưa có thông tin này*"}
            </InfoValue>
          </InfoContainer>

          <InfoContainer>
            <Info>Địa chỉ:</Info>
            <InfoValue>
              {" "}
              {profile?.address || "*Chưa có thông tin này*"}
            </InfoValue>
          </InfoContainer>

          <InfoContainer>
            <Info>Tên công ty:</Info>
            <InfoValue>
              {" "}
              {profile?.companyName || "*Chưa có thông tin này*"}
            </InfoValue>
          </InfoContainer>

          <InfoContainer>
            <Info>Chức vụ:</Info>
            <InfoValue>
              {" "}
              {profile?.position || "*Chưa có thông tin này*"}
            </InfoValue>
          </InfoContainer>
        </div>

        <UpdateProfile
          profile={profile || {}}
          setIsLoading={setIsLoading}
          setIsError={setIsError}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </Wrapper>
    </Container>
  );
};
export default ProfilePage;
