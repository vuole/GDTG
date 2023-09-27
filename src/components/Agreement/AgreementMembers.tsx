import styled from "styled-components";
import { User } from "../../types/type";
import STextField from "../TextField/STextField";
import SearchResultList from "../TransactionHistory/SearchResultList";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import UserService from "../../services/UserService";
import TransactionService from "../../services/TransactionService";
import Alert from "@mui/material/Alert";

const Container = styled.div`
  width: 20%;
  height: 100%;
  border: 1px solid #ccc;
  padding: 5px;
`;
const MemberSearching = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
`;
const MemberShow = styled.div`
  margin-top: 10px;
  ol {
    margin-left: 20px;
  }
`;

interface AgreementMembersProps {
  title: string;
  isLeft?: boolean;
  members: Array<User>;
  transactionId: string;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const AgreementMembers = (props: AgreementMembersProps) => {
  const [keyWord, setKeyWord] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Array<User>>([]);
  const [error, setError] = useState<any>(null);
  const [addMemberIsDone, setAddMemberIsDone] = useState(false);

  const searchQuery = useDebounce(keyWord, 1000);

  useEffect(() => {
    if (searchQuery) {
      UserService.findUser(searchQuery).then((res) => {
        setSearchResult(res);
      });
    } else {
      setSearchResult([]);
    }
  }, [searchQuery]);

  const handleAddMember = async (
    party: "addMembersA" | "addMembersB",
    value: any
  ) => {
    setKeyWord("");
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    try {
      await TransactionService[party](
        props.transactionId,
        { memberID: value._id },
        currentUser.jwt
      ).then((res) => {
        setAddMemberIsDone(true);
        props.setRefresh(!props.refresh);
      });
    } catch (error: any) {
      setError(error.response);
    } finally {
      setTimeout(() => {
        setAddMemberIsDone(false);
        setError(null);
      }, 3000);
    }
  };

  const handleSelectedItem = (value: any) => {
    if (props.isLeft) {
      handleAddMember("addMembersA", value);
    } else {
      handleAddMember("addMembersB", value);
    }
  };

  return (
    <Container>
      <MemberSearching>
        <Title>Tìm kiếm thành viên:</Title>
        {error?.data?.message === "You are not admin of A group" && (
          <Alert severity="error">Bạn không phải Admin bên A</Alert>
        )}
        {error?.data?.message === "You are not admin of B group" && (
          <Alert severity="error">Bạn không phải Admin bên B</Alert>
        )}
        {error?.data?.message === "This member already added" && (
          <Alert severity="error">Thành viên này đã được thêm</Alert>
        )}
        {addMemberIsDone && (
          <Alert severity="success">Thêm thành công</Alert>
        )}
        <STextField
          placeholder="Email hoặc số điện thoại"
          size="small"
          fullWidth
          value={keyWord}
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <SearchResultList
          data={searchResult}
          onSlectedItem={handleSelectedItem}
          fullSubInfo
        />
      </MemberSearching>
      <MemberShow>
        <Title>{props.title}</Title>
        <SearchResultList data={props.members} fullHeight highlightFirstItem />
      </MemberShow>
    </Container>
  );
};

export default AgreementMembers;
