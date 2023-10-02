import { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";
import SButton from "../Button/SButton";
import { useDebounce } from "../../hooks/useDebounce";
import TransactionService from "../../services/TransactionService";
import { ContractState, GroupType, Transaction } from "../../types/type";
import { useNavigate } from "react-router-dom";
import Alert, { AlertColor } from "@mui/material/Alert";
import SFormDialog from "../FormDialog/SFormDialog";

const Container = styled.div`
  height: 60%;
  display: flex;
  flex-direction: column;
`;
const AgrContent = styled.div`
  position: relative;
  height: calc(100% - 115px);
`;
const AgrAction = styled.div`
  height: 115px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const AgrActionTop = styled.div`
  height: 63px;
  display: flex;
`;
const AgrActionBottom = styled.div`
  height: 52px;
  display: flex;
  border: 1px solid #ccc;
  div {
    flex: 1;
    border-right: 1px solid #ccc;
  }
`;
export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface AgreementContentProps {
  transaction: Transaction;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const AgreementContent = ({
  transaction,
  refresh,
  setRefresh,
}: AgreementContentProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<any>(null);
  const [aHasConfirmed, setAHasConfirmed] = useState(false);
  const [bHasConfirmed, setBHasConfirmed] = useState(false);
  const navigate = useNavigate();

  const admin = useMemo(() => {
    const currentUserId = JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    )._id;
    return {
      isAdminA: currentUserId === transaction.adminA?._id,
      isAdminB: currentUserId === transaction.adminB?._id,
      isAdmin:
        currentUserId === transaction.adminA?._id ||
        currentUserId === transaction.adminB?._id,
    };
  }, [transaction]);

  const isConfirmed = useMemo(() => {
    return transaction.contractState === ContractState.Confirmed;
  }, [transaction]);

  useEffect(() => {
    setValue(transaction.contract || "");
    if (transaction.contractState) {
      setAHasConfirmed(
        transaction.contractState === ContractState.WaitB ? true : false
      );
      setBHasConfirmed(
        transaction.contractState === ContractState.WaitA ? true : false
      );
    }
  }, [transaction]);

  const handleUpdateContractContent = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    try {
      await TransactionService.updateContractContent(
        transaction._id || "",
        value,
        currentUser.jwt
      ).then((res) => {
        setError(false);
        setRefresh(!refresh);
      });
    } catch (error: any) {
      setError(error.response);
    } finally {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const handleConfirmContract = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    try {
      await TransactionService.confirmContract(
        transaction._id || "",
        currentUser.jwt
      ).then((res) => {
        setRefresh(!refresh);
      });
    } catch (error: any) {
      setError(error.response);
    } finally {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const handleCancelContract = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    try {
      await TransactionService.cancelConfirmContract(
        transaction._id || "",
        currentUser.jwt
      ).then((res) => {
        setRefresh(!refresh);
      });
    } catch (error: any) {
      setError(error.response);
    } finally {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const TransactionAlert = (
    value: string,
    type?: AlertColor,
    resetError?: boolean
  ) => {
    if (resetError) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
    return (
      <Alert
        severity={type}
        sx={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        {value}
      </Alert>
    );
  };

  const handleConfirm = (group: GroupType) => {
    setOpen(true);
    if (!admin.isAdmin) {
      setError("You do not have permission to do this");
      return;
    }
    if (group === GroupType.A && admin.isAdminB) {
      setError("You only have permission in the group B");
      return;
    }
    if (group === GroupType.B && admin.isAdminA) {
      setError("You only have permission in the group A");
      return;
    }
    if (aHasConfirmed || bHasConfirmed) {
      handleCancelContract();
    } else {
      handleConfirmContract();
    }
    group === GroupType.A
      ? setAHasConfirmed(!aHasConfirmed)
      : setBHasConfirmed(!bHasConfirmed);
  };

  return (
    <Container>
      <AgrContent>
        {error === false && TransactionAlert("Đã lưu thành công", "success")}
        {error?.data?.message ===
          "You can't update contract content when transaction is not drafting" &&
          TransactionAlert(
            "Không thể lưu cập nhật nội dung hợp đồng khi bên của bạn đã bấm xác nhận",
            "error"
          )}
        {error === "You do not have permission to do this" &&
          TransactionAlert("Bạn không có quyền làm việc này", "error", true)}
        {error === "You only have permission in the group A" &&
          TransactionAlert(
            "Bạn là admin bên A. Bạn chỉ có quyền đối với bên A",
            "error",
            true
          )}
        {error === "You only have permission in the group B" &&
          TransactionAlert(
            "Bạn là admin bên B. Bạn chỉ có quyền đối với bên B",
            "error",
            true
          )}
        {error?.data?.message === "You have already confirmed this contract" &&
          TransactionAlert("Bạn đã xác nhận đồng ý thoải thuận này", "error")}

        <ReactQuill
          readOnly={isConfirmed}
          theme="snow"
          value={value}
          onChange={setValue}
          style={{ height: "calc(100% - 42px)" }}
        />
      </AgrContent>
      <AgrAction>
        <AgrActionTop>
          <Center style={{ flex: 1 }}>
            <SButton
              disabled={isConfirmed}
              color={!aHasConfirmed ? "info" : "error"}
              onClick={(e) => handleConfirm(GroupType.A)}
            >
              {isConfirmed
                ? "Bên A Đã Xác Nhận Đồng Ý"
                : aHasConfirmed
                ? "Bên A Hủy Xác Nhận"
                : "Bên A Xác Nhận Đồng Ý"}
            </SButton>
            <SFormDialog
              title={
                (aHasConfirmed ? "Bên A " : "Bên B ") +
                "Yêu Cầu Xác Nhận Với Nội Dung: "
              }
              actionName="Xác Nhận Đồng Ý"
              isError={false}
              open={open}
              setOpen={setOpen}
              onSave={() => {}}
            >
              <ReactQuill
                style={{ border: "1px solid #ccc" }}
                readOnly
                theme="bubble"
                value={value}
              />
            </SFormDialog>
          </Center>
          <Center
            style={{
              flex: 1,
              gap: "20px",
              borderLeft: "1px solid #ccc",
              borderRight: "1px solid #ccc",
            }}
          >
            <SButton color="secondary" onClick={(e) => navigate("/")}>
              Quay lại
            </SButton>
            <SButton
              disabled={isConfirmed}
              onClick={(e) => handleUpdateContractContent()}
            >
              Lưu
            </SButton>
          </Center>
          <Center style={{ flex: 1 }}>
            <SButton
              disabled={isConfirmed}
              color={!bHasConfirmed ? "info" : "error"}
              onClick={(e) => handleConfirm(GroupType.B)}
            >
              {isConfirmed
                ? "Bên B Đã Xác Nhận Đồng Ý"
                : bHasConfirmed
                ? "Bên B Hủy Xác Nhận"
                : "Bên B Xác Nhận Đồng Ý"}
            </SButton>
          </Center>
        </AgrActionTop>
        <AgrActionBottom>
          <Center>Đã Đặt Cọc</Center>
          <Center>Đã Giao Hàng</Center>
          <Center>Đã Nhận hàng</Center>
          <Center>Hoàn Thành Giao Dịch</Center>
        </AgrActionBottom>
      </AgrAction>
    </Container>
  );
};

export default AgreementContent;
