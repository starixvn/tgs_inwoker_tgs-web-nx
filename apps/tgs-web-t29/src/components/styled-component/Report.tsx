import styled from "styled-components";
import { styled as muiStyled, Table } from "@mui/material";
import { media } from "@/theme/breakpoints";

export const ReportContainer = styled.div``;
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
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text};
  border-radius: 5px;
  margin-bottom: 5px;
`;
export const ReportCard = styled.div`
  padding: 16px;
  font-size: 0.8rem;
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
    fontWeight: 700,
    whiteSpace: "nowrap",
    padding: "0 5px",
    color: theme.palette.black,
  },

  "& .MuiTableBody-root .MuiTableCell-root": {
    fontSize: "0.812rem",
    fontWeight: 400,
    lineHeight: "0.951rem",
    color: theme.palette.text,
    borderBottom: `1px solid ${theme.palette.gray10}`,
    padding: "26px 5px 10px",
  },
}));
