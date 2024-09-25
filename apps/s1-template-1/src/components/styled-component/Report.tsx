import { media } from "@/theme/breakpoints";
import { styled as muiStyled, Table, TablePagination } from "@mui/material";
import styled from "styled-components";

export const ReportContainer = styled.div`
  width: 100%;
  margin-top: 1.6rem;
`;
export const ReportSummary = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text};
  border-radius: 5px;
  margin-bottom: 5px;

  ${media.sm} {
    margin-bottom: 20px;
  }
`;
export const ReportSummaryRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const ReportSummaryCol = styled.div``;
export const ReportCardsContainer = styled.div`
  color: ${({ theme }) => theme.text};
  border-radius: 5px;
  margin-bottom: 5px;
`;
export const ReportCard = styled.div`
  padding: 16px;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.gray20};
  border-radius: 5px;
  margin-bottom: 10px;
`;
export const ReportCardGroup = styled.div``;
export const ReportCardRow = styled.div`
  width: 100%;
  min-height: 40px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`;
export const ReportCardCol = styled.span`
  font-weight: normal;
  & > div {
    margin-bottom: 5px;
  }
`;
type CustomWinLoseProps = { $value: number | null };
export const CustomWinLose = styled.span<CustomWinLoseProps>`
  color: ${({ $value }: CustomWinLoseProps) => {
    return !$value ? "" : $value > 0 ? "rgb(3,189, 0)" : "rgb(255, 0, 0)";
  }};
`;
export const ReportTable = muiStyled(Table)(({ theme }) => ({
  borderRadius: `${theme.palette.table.tableBorderRadius}`,
  "& .MuiTableHead-root .MuiTableCell-root": {
    fontSize: "1.4rem",
    fontWeight: 500,
    whiteSpace: "nowrap",
    padding: "0 5px",
    color: `${theme.palette.table.tableHeaderColor}`,
    height: "3.6rem",
    background: `${theme.palette.table.tableHeaderBackground}`,
    textAlign: "center",
    borderBottom:  `1px solid ${theme.palette.table.tableHeaderBorderColor}`,   
    fontFamily: "inherit",
  },

  "& .MuiTableBody-root .MuiTableCell-root": {
    fontSize: "1.4rem",
    fontWeight: 400,
    color: theme.palette.text.primary,
    borderBottom: `1px solid ${theme.palette.table.tableBorderColor}`,
    height: "4.8rem",
    padding: "0 .8rem",
    lineHeight: "4.8rem",
    background: `${theme.palette.table.tableBackground}`,
    fontFamily: "inherit",
  },
  
}));

export const CustomizeTablePagination = muiStyled(TablePagination)(({ theme }) => ({
  fontSize: "1.6rem",
  "& .MuiTablePagination-displayedRows": {
    fontSize: "1.6rem",
    fontFamily: "inherit",
  },
  "& .MuiIconButton-root": {
    padding: ".4rem", 
    background: "#606E82",
    borderRadius: ".8rem",
    color: "#fff",
    "&.Mui-disabled": {
      background: "#2E353E",
    }
  },
  "& .MuiTablePagination-actions": {
    display: "flex",
    gap: "1.2rem",
    marginLeft: "1.6rem",
    "& .MuiSvgIcon-root": {
      fontSize: "2.4rem",
    }
  }
}));

export const ReportMainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
export const DateRangeSelector = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: .8rem;
  margin-right: 1.2rem;
`;


export const TagStatus = styled.span`
  padding: .8rem 1.2rem;
  border-radius: 2rem;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.text};
  position: relative;
  display: inline-block;
  &:before {
    content: "&\2B24";
    position:absolute;
    left: 0;
  }
`;