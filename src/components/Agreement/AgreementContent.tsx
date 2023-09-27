import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";
import SButton from "../Button/SButton";
import { useDebounce } from "../../hooks/useDebounce";
import TransactionService from "../../services/TransactionService";
import { Transaction } from "../../types/type";

const Container = styled.div`
  height: 60%;
  display: flex;
  flex-direction: column;
`;
const AgrContent = styled.div`
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
}

const AgreementContent = ({ transaction }: AgreementContentProps) => {
  const [value, setValue] = useState<string>("<ol><li>abcdefgh</li><li>b</li><li>c</li></ol>");

  useEffect(() => {
    setValue(transaction.contract || "")
  }, [transaction]);

  // const valueQuery = useDebounce(value, 3000);

  // useEffect(() => {
  //   const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  //   TransactionService.updateContractContent(
  //     transaction._id || "65131d75633ac505425d1ff9",
  //     valueQuery,
  //     currentUser.jwt
  //   ).then((res) => {
  //     console.log(res);
  //   });
  // }, [valueQuery, transaction]);

  return (
    <Container>
      <AgrContent>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          style={{ height: "calc(100% - 42px)" }}
        />
      </AgrContent>
      <AgrAction>
        <AgrActionTop>
          <Center style={{ flex: 1 }}>
            <SButton>Bên A Xác Nhận Đồng Ý</SButton>
          </Center>
          <Center style={{ flex: 1 }}>
            <SButton>Bên B Xác Nhận Đồng Ý</SButton>
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
