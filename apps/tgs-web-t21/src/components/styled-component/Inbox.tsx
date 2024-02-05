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
})) as typeof MuiTable;

export const TableHead = muiStyled(MuiTableHead)(({ theme }) => ({
  "& .MuiTableCell-root": {
    fontSize: "15px",
    fontWeight: "400",
    lineHeight: "17px",
    letterSpacing: "0em",
    color: `${theme.palette.black} !important`,
    background: theme.palette.gray5,
    padding: "8px 20px",
    borderBottom: `1px solid ${theme.palette.gray30}`,
    [theme.breakpoints.up("sm")]: {
      borderBottom: `none`,
    },
  },
})) as typeof MuiTableHead;

export const TableBody = muiStyled(MuiTableBody)(({ theme }) => ({
  "& .MuiTableCell-root": {
    color: `${theme.palette.gray80} !important`,
    cursor: "pointer",
    borderBottom: "none",
    background: theme.palette.gray5,
    [theme.breakpoints.up("sm")]: {
      borderBottom: `1px solid ${theme.palette.gray80}`,
      background: "transparent",
    },
  },
})) as typeof MuiTableBody;

export const TableRow = muiStyled(MuiTableRow)(({ theme }) => ({})) as typeof MuiTableRow;

export const TableCell = muiStyled(MuiTableCell)(({ theme }) => ({})) as typeof MuiTableCell;

export const TableSubjectCell = muiStyled(MuiTableCell)(({ theme }) => ({
  fontSize: "0.937rem",
  lineHeight: "1.078rem",
  fontWeight: 700,
  // borderBottom: `1px solid ${theme.palette.gray30}`,
})) as typeof MuiTableCell;

export const TableDateCell = muiStyled(MuiTableCell)(({ theme }) => ({
  fontSize: "0.937rem",
  lineHeight: "1.078rem",
  fontWeight: 400,
  // borderBottom: `1px solid ${theme.palette.gray30}`,
})) as typeof MuiTableCell;
