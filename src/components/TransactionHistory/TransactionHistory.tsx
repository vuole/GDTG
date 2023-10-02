import * as React from "react";
import { styled as styledMUI } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import CreateTransaction from "./CreateTransaction";
import { useEffect, useState } from "react";
import { Transaction } from "../../types/type";
import UserService from "../../services/UserService";
import Moment from "react-moment";
import SButton from "../Button/SButton";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styledMUI(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "#00524E",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styledMUI(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Container = styled.div`
  padding: 10px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin: 20px 0 30px 0;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export default function TransactionHistory() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [transactionList, setTransactionList] = useState<Array<Transaction>>(
    []
  );
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    UserService.getTransactionList(currentUser.jwt).then((res) => {
      setTransactionList(res);
    });
  }, [refresh]);

  return (
    <Container>
      <Title>Lịch Sử Giao Dịch</Title>
      <ActionContainer>
        <TextField
          variant="outlined"
          size="small"
          sx={{ width: "40%" }}
          placeholder="Tìm kiếm giao dịch..."
        />
        <CreateTransaction refresh={refresh} setRefresh={setRefresh} />
      </ActionContainer>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Thời gian tạo</StyledTableCell>
              <StyledTableCell align="left">Tên giao dịch</StyledTableCell>
              <StyledTableCell align="left">Số tiền giao dịch</StyledTableCell>
              <StyledTableCell align="left">
                Trạng thái giao dịch
              </StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionList.map((transaction) => (
              <StyledTableRow key={transaction._id}>
                <StyledTableCell component="th" scope="row">
                  <Moment format="YYYY-MM-DD HH:mm">
                    {transaction.createdAt}
                  </Moment>
                </StyledTableCell>
                <StyledTableCell align="left">
                  {transaction.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {transaction.amount}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {transaction.transactionState}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <SButton
                    size="small"
                    color="secondary"
                    onClick={(e) =>
                      navigate(`/agreement/${transaction._id}`, {
                        state: { id: transaction._id },
                      })
                    }
                  >
                    Chi tiết
                  </SButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={transactionList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}
