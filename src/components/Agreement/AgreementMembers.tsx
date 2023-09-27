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
const MemberSearching = styled.div``;
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
        props.setRefresh(!props.refresh);
      });
    } catch (error: any) {
      setError(error.response);
    } finally {
      setTimeout(() => {
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
        <p>Tìm kiếm thành viên:</p>
        {error?.data?.message && (
          <Alert severity="error">Bạn không có quyền trong nhóm này</Alert>
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
        />
      </MemberSearching>
      <MemberShow>
        <p>{props.title}</p>
        <ol>
          {props.members.map((member) => {
            return <li key={member._id}>{member.name}</li>;
          })}
        </ol>
      </MemberShow>
    </Container>
  );
};

export default AgreementMembers;
