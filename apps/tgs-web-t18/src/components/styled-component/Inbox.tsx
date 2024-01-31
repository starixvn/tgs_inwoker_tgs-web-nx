import {
  Table as MuiTable,
  TableHead as MuiTableHead,
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
} from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";

export const Table = muiStyled(MuiTable)(({ theme }) => ({
  width: "100%",
  background: "rgb(24,31,43)",
  // padding: "20px",
})) as typeof MuiTable;

export const TableHead = muiStyled(MuiTableHead)(({ theme }) => ({
  "& .MuiTableCell-root": {
    fontSize: "1.125rem",
    color: `${theme.palette.black} !important`,
    borderBottom: "none",
  },
})) as typeof MuiTableHead;

export const TableBody = muiStyled(MuiTableBody)(({ theme }) => ({
  "& .MuiTableCell-root": {
    // color: `${theme.palette.gray80} !important`,
    cursor: "pointer",
  },
})) as typeof MuiTableBody;

export const TableRow = muiStyled(MuiTableRow)(({ theme }) => ({})) as typeof MuiTableRow;

export const TableCell = muiStyled(MuiTableCell)(({ theme }) => ({})) as typeof MuiTableCell;

export const TableSubjectCell = muiStyled(MuiTableCell)(({ theme }) => ({
  fontSize: "0.937rem",
  lineHeight: "1.078rem",
  fontWeight: 700,
  borderBottom: "none",
  // borderBottom: `1px solid ${theme.palette.gray30}`,
})) as typeof MuiTableCell;

export const TableDateCell = muiStyled(MuiTableCell)(({ theme }) => ({
  fontSize: "0.937rem",
  lineHeight: "1.078rem",
  fontWeight: 400,
  borderBottom: "none",
  // borderBottom: `1px solid ${theme.palette.gray30}`,
})) as typeof MuiTableCell;
