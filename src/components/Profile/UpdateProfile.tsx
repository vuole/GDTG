import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import UserService from "../../services/UserService";
import SFormDialog from "../FormDialog/SFormDialog";
import STextField from "../TextField/STextField";
import { User } from "../../types/type";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TextFieldContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

interface UpdateProfileProps {
  profile: User;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean | null>>;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateProfile = ({
  profile,
  setIsLoading,
  setIsError,
  refresh,
  setRefresh,
}: UpdateProfileProps) => {
  const [profileFormData, setProfileFormData] = useState<User>({});

  useEffect(() => {
    setProfileFormData(profile);
  }, [profile]);

  const isErrorForm = useMemo(() => {
    return (
      !profileFormData?.name ||
      !profileFormData?.phone ||
      !profileFormData?.email ||
      !profileFormData?.address ||
      !profileFormData?.companyName ||
      !profileFormData?.position
    );
  }, [profileFormData]);

  const updateProfile = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setIsError(false);
    setIsLoading(true);
    try {
      UserService.updateProfile(profileFormData || {}, currentUser.jwt).then(
        (res) => {
          setRefresh(!refresh);
        }
      );
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setIsError(null);
      }, 2000);
    }
  };

  return (
    <SFormDialog
      title="Cập nhật hồ sơ"
      actionName="Cập nhật"
      isError={isErrorForm}
      onSave={updateProfile}
      onCancel={() => {}}
    >
      <Container>
        <TextFieldContainer>
          <STextField
            label="Họ và tên"
            fullWidth
            value={profileFormData?.name || ""}
            onChange={(e) =>
              setProfileFormData({ ...profileFormData, name: e.target.value })
            }
            isEmty={!profileFormData?.name}
            sx={{ marginTop: "10px" }}
          />
        </TextFieldContainer>
        <TextFieldContainer>
          <STextField
            label="Email"
            fullWidth
            value={profileFormData?.email || ""}
            onChange={(e) =>
              setProfileFormData({ ...profileFormData, email: e.target.value })
            }
            isEmty={!profileFormData?.email}
          />
        </TextFieldContainer>
        <TextFieldContainer>
          <STextField
            label="Số điện thoại"
            fullWidth
            value={profileFormData?.phone || ""}
            onChange={(e) =>
              setProfileFormData({ ...profileFormData, phone: e.target.value })
            }
            isEmty={!profileFormData?.phone}
          />
        </TextFieldContainer>
        <TextFieldContainer>
          <STextField
            label="Địa chỉ"
            fullWidth
            value={profileFormData?.address || ""}
            onChange={(e) =>
              setProfileFormData({
                ...profileFormData,
                address: e.target.value,
              })
            }
            isEmty={!profileFormData?.address}
          />
        </TextFieldContainer>
        <TextFieldContainer>
          <STextField
            label="Tên công ty"
            fullWidth
            value={profileFormData?.companyName || ""}
            onChange={(e) =>
              setProfileFormData({
                ...profileFormData,
                companyName: e.target.value,
              })
            }
            isEmty={!profileFormData?.companyName}
          />
        </TextFieldContainer>
        <TextFieldContainer>
          <STextField
            label="Chức vụ"
            fullWidth
            value={profileFormData?.position || ""}
            onChange={(e) =>
              setProfileFormData({
                ...profileFormData,
                position: e.target.value,
              })
            }
            isEmty={!profileFormData?.position}
          />
        </TextFieldContainer>
      </Container>
    </SFormDialog>
  );
};
export default UpdateProfile;
