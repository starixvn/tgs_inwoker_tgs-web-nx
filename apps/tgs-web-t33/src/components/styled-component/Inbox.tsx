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
    fontSize: "1rem",
    lineHeight: "1.171rem",
    color: `${theme.palette.text.primary} !important`,
    borderBottom: "none",
  },
})) as typeof MuiTableHead;

export const TableBody = muiStyled(MuiTableBody)(({ theme }) => ({
  "& .MuiTableCell-root": {
    color: `${theme.palette.text.primary} !important`,
    cursor: "pointer",
  },
})) as typeof MuiTableBody;

export const TableRow = muiStyled(MuiTableRow)(({ theme }) => ({})) as typeof MuiTableRow;

export const TableCell = muiStyled(MuiTableCell)(({ theme }) => ({})) as typeof MuiTableCell;

export const TableSubjectCell = muiStyled(MuiTableCell)(({ theme }) => ({
  fontSize: "1rem",
  lineHeight: "1.171rem",
  fontWeight: 400,
  borderBottom: `1px solid #23507D`,
})) as typeof MuiTableCell;

export const TableDateCell = muiStyled(MuiTableCell)(({ theme }) => ({
  fontSize: "0.937rem",
  lineHeight: "1.098rem",
  fontWeight: 400,
  color: theme.palette.gray10,
  borderBottom: `1px solid #23507D`,
})) as typeof MuiTableCell;
