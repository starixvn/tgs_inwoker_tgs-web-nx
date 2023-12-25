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
  background: theme.palette.mainBackground,

  [theme.breakpoints.up("sm")]: {
    background: theme.palette.white,
  },
})) as typeof MuiTable;

export const TableHead = muiStyled(MuiTableHead)(({ theme }) => ({
  "& .MuiTableCell-root": {
    fontSize: "0.812rem",
    lineHeight: "0.934rem",
    color: `${theme.palette.white} !important`,
    borderBottom: "none",

    [theme.breakpoints.up("sm")]: {
      background: theme.palette.main,
    },
  },
})) as typeof MuiTableHead;

export const TableBody = muiStyled(MuiTableBody)(({ theme }) => ({
  "& .MuiTableCell-root": {
    cursor: "pointer",
  },
})) as typeof MuiTableBody;

export const TableRow = muiStyled(MuiTableRow)(({ theme }) => ({})) as typeof MuiTableRow;

export const TableCell = muiStyled(MuiTableCell)(({ theme }) => ({})) as typeof MuiTableCell;

export const TableSubjectCell = muiStyled(MuiTableCell)(({ theme }) => ({
  fontSize: "0.937rem",
  lineHeight: "1.078rem",
  fontWeight: 700,
  borderBottom: `1px solid ${theme.palette.blueBorder}`,
  color: theme.palette.white,
  [theme.breakpoints.up("sm")]: {
    color: "#23507D",
  },
})) as typeof MuiTableCell;

export const TableDateCell = muiStyled(MuiTableCell)(({ theme }) => ({
  fontSize: "0.937rem",
  lineHeight: "1.078rem",
  fontWeight: 400,
  borderBottom: `1px solid ${theme.palette.blueBorder}`,
  color: theme.palette.blue,

  [theme.breakpoints.up("sm")]: {
    color: "#535867",
  },
})) as typeof MuiTableCell;
