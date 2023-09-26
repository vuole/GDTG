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
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import CreateTransaction from "./CreateTransaction";

const StyledTableCell = styledMUI(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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
  margin: 20px 0 10px 0;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

function createData(
  date: string,
  name: string,
  amount: number,
  status: string
) {
  return { date, name, amount, status };
}

const rows = [
  createData("21/9/2023", "Commercial Website", 1000000, "Completed"),
  createData("21/9/2023", "Commercial Website", 1000000, "Completed"),
  createData("21/9/2023", "Commercial Website", 1000000, "Completed"),
  createData("21/9/2023", "Commercial Website", 1000000, "Completed"),
  createData("21/9/2023", "Commercial Website", 1000000, "Completed"),
];

export default function TransactionHistory() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Title>Lịch Sử Giao Dịch</Title>
      <ActionContainer>
        <TextField
          variant="outlined"
          size="small"
          sx={{ width: "40%"}}
          placeholder="Tìm kiếm..."
        />
        <CreateTransaction />
      </ActionContainer>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Thời gian tạo</StyledTableCell>
              <StyledTableCell align="right">Tên giao dịch</StyledTableCell>
              <StyledTableCell align="right">Số tiền giao dịch</StyledTableCell>
              <StyledTableCell align="right">
                Trạng thái giao dịch
              </StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  {row.date}
                </StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.amount}</StyledTableCell>
                <StyledTableCell align="right">{row.status}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ textTransform: "unset" }}
                  >
                    Chi tiết
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}
