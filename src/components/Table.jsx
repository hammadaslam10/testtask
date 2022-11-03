import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}

const rows = [
  createData("Lasania Chiken Fri", 18908424, "2 March 2022", "Approved"),
];

const makeStyle = (status) => {
  if (status === "Approved") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "Pending") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
    };
  }
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BasicTable(data) {
  React.useEffect(() => {
    console.log(data);
  });
  return (
    <div className="Table">
      <h3>entry</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px blue" }}
      >
        <Table
          stickyHeader
          aria-label="simple table"
          sx={{ minWidth: 650, overflow: "hidden" }}
        >
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="left">Accomadation Type</StyledTableCell>
              <StyledTableCell align="left">city</StyledTableCell>
              <StyledTableCell align="left">room message</StyledTableCell>
              <StyledTableCell align="left" />
            </StyledTableRow>
          </TableHead>
          <TableBody style={{ color: "black" }}>
            {data.map((row) => (
              <StyledTableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.main_photo_url}
                </TableCell>
                <TableCell align="left">
                  {row.accommodation_type_name}
                </TableCell>
                <TableCell align="left">{row.city}</TableCell>
                <TableCell align="left">{row.urgency_room_msg}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
