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
  background: theme.palette.grey06,
  borderRadius: "6px",

  [theme.breakpoints.up("sm")]: {
    background: theme.palette.black03,
  },
})) as typeof MuiTable;

export const TableHead = muiStyled(MuiTableHead)(({ theme }) => ({
  "& .MuiTableCell-root": {
    fontSize: "1.125rem",
    color: `${theme.palette.text.primary} !important`,
    [theme.breakpoints.up("sm")]: {
      background: " #000000B2",
      borderRadius: "10px",
    },
    borderBottom: "none",
  },
})) as typeof MuiTableHead;

export const TableBody = muiStyled(MuiTableBody)(({ theme }) => ({
  "& .MuiTableCell-root": {
    color: `${theme.palette.text.primary} !important`,
    cursor: "pointer",
    borderBottom: `1px solid ${theme.palette.grey06}`,
  },
})) as typeof MuiTableBody;

export const TableRow = muiStyled(MuiTableRow)(({ theme }) => ({})) as typeof MuiTableRow;

export const TableCell = muiStyled(MuiTableCell)(({ theme }) => ({})) as typeof MuiTableCell;

export const TableSubjectCell = muiStyled(MuiTableCell)(({ theme }) => ({
  fontSize: "0.937rem",
  lineHeight: "1.078rem",
  fontWeight: 700,
  border: "none",
})) as typeof MuiTableCell;

export const TableDateCell = muiStyled(MuiTableCell)(({ theme }) => ({
  fontSize: "0.937rem",
  lineHeight: "1.078rem",
  fontWeight: 400,
  border: "none",
})) as typeof MuiTableCell;
