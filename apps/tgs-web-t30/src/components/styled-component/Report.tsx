import styled from "styled-components";
import { styled as muiStyled, Table } from "@mui/material";
import { media } from "@/theme/breakpoints";

export const ReportContainer = styled.div``;
export const ReportSummary = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.white};
  margin-bottom: 5px;

  ${media.sm} {
    margin-bottom: 20px;
    background: ${({ theme }) => theme.main};
    padding: 10px;
  }
`;
export const ReportSummaryRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const ReportSummaryCol = styled.div``;
export const ReportCardsContainer = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.white};
  margin-bottom: 5px;
`;
export const ReportCard = styled.div`
  padding: 9px 16px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.mainLightBackground};
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
  "& .MuiTableHead-root .MuiTableCell-root": {
    fontSize: "0.937rem",
    lineHeight: "1.098rem",
    fontWeight: 400,
    whiteSpace: "nowrap",
    padding: "0 5px",
    color: "#98a7b5",
    background: theme.palette.main,
  },

  [theme.breakpoints.up("sm")]: {
    "& .MuiTableHead-root .MuiTableCell-root": {
      padding: "10px",
      color: theme.palette.white,
      background: theme.palette.main,
    },
  },

  "& .MuiTableBody-root .MuiTableCell-root": {
    fontSize: "0.812rem",
    fontWeight: 400,
    lineHeight: "0.951rem",
    color: "#98a7b5",
    borderBottom: `1px solid ${theme.palette.blueBorder}`,
    padding: "26px 5px 10px",
  },
}));
export const ReportMainContainer = styled.div`
  width: 100%;
`;
export const DateRangeSelector = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;

  ${media.sm} {
    flex-wrap: wrap;
    flex-direction: row;
  }
`;
