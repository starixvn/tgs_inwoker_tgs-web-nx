import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";
import { styled as muiStyled, Table, TableCell, TablePagination } from "@mui/material";
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
type CustomWinLoseProps = { $value: number | null, theme: typeof theme };
export const CustomWinLose = styled.span<CustomWinLoseProps>`
  color: ${({ $value, theme }: CustomWinLoseProps) => {
    return !$value ? "" : $value > 0 ? theme.winAmountColor : theme.lossAmountColor;
  }};
`;

export const WinLossZero = styled.span`
  color: ${({ theme }) => theme.white};
`;

export const ReportTable = muiStyled(Table)(({ theme }) => ({
  borderRadius: `${theme.palette.table.tableBorderRadius}`,
  "& .MuiTableHead-root .MuiTableCell-root": {
    fontSize: "1.2rem",
    fontWeight: 500,
    whiteSpace: "nowrap",
    padding: "0 .4rem",
    color: `${theme.palette.table.tableHeaderColor}`,
    height: "3.6rem",
    background: `${theme.palette.table.tableHeaderBackground}`,
    borderBottom:  `1px solid ${theme.palette.table.tableHeaderBorderColor}`,   
    fontFamily: "inherit",
    [theme.breakpoints.up('sm')]: {
      padding: "0 1.6rem",
      fontSize: "1.4rem",
      height: "4.8rem",
    },
    
  },

  "& .MuiTableBody-root .MuiTableCell-root": {
    fontSize: "1.1rem",
    fontWeight: 400,
    color: theme.palette.text.primary,
    borderBottom: `1px solid ${theme.palette.table.tableBorderColor}`,
    padding: ".8rem .4rem",
    background: `${theme.palette.table.tableBackground}`,
    fontFamily: "inherit",    
    height: "3.6rem",
    lineHeight: "1.2rem",    
    [theme.breakpoints.up('sm')]: {
      fontSize: "1.2rem",
      padding: ".8rem 1.6rem",
      lineHeight: "2.4rem",
      height: "4.8rem",
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: "1.4rem"
    },
  },
  
}));

export const CustomizeTablePagination = muiStyled(TablePagination)(({ theme }) => ({
  fontSize: "1.6rem",
  display: "flex",
  justifyContent: "flex-end",
  borderBottom: "none",
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

export const DateTimeTableCell = muiStyled(TableCell)(({ theme }) => ({
  width: "9rem",
  [theme.breakpoints.up('sm')]: {
    width: "28rem",
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
  margin-bottom: 1.2rem;
`;


export const TagStatus = styled.span`
  padding: .3rem .6rem .3rem .6rem;
  border-radius: 2rem;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text};
  position: relative;
  display: inline-block;
  line-height: 2rem;
  background: transparent;
  &:before {
    position:absolute;
    left: .5rem;
    width: .8rem;
    height: .8rem;
    top: .9rem;
    border-radius: 2rem;
  }
  ${media.sm} {
    font-size: 1.2rem;
    padding: .6rem 1.2rem .6rem 3.2rem;
    line-height: 2.4rem;
    &:before {
    left: 1.4rem;
    top: 1.3rem;
    content: "";
  }
  ${media.lg} {
    font-size: 1.4rem;
  }
  }
`;

export const TagStatusProcessing = styled(TagStatus)`  
  color: ${({ theme }) => theme.circleProcessingBackground};
  ${media.sm} {
    background: ${({ theme }) => theme.statusProcessingBackground};
  }
  &:before {
    background: ${({ theme }) => theme.circleProcessingBackground};
  }
`;

export const TagStatusPending = styled(TagStatus)`
  color: ${({ theme }) => theme.circlePendingBackground};
  ${media.sm} {
    background: ${({ theme }) => theme.statusPendingBackground};
  }  
  &:before {
    background: ${({ theme }) => theme.circlePendingBackground};
  }
`;

export const TagStatusApproved = styled(TagStatus)`
  color: ${({ theme }) => theme.circleApprovedBackground};
  ${media.sm} { 
    background: ${({ theme }) => theme.statusApprovedBackground};
  }
  
  &:before {
    background: ${({ theme }) => theme.circleApprovedBackground};
  }
`;

export const TagStatusRejected = styled(TagStatus)`
  color: ${({ theme }) => theme.circleRejectBackground};
 ${media.sm} {
  background: ${({ theme }) => theme.statusRejectBackground};
 }
  
  &:before {
    background: ${({ theme }) => theme.circleRejectBackground};
  }
`;

export const TagStatusPaying = styled(TagStatus)`
  color: ${({ theme }) => theme.circlePayingBackground};
  ${media.sm} { 
    background: ${({ theme }) => theme.statusPayingBackground};
  }
  
  &:before {
    background: ${({ theme }) => theme.circlePayingBackground};
  }
`;

export const TagStatusPaid = styled(TagStatus)`
  color: ${({ theme }) => theme.circlePaidBackground};
  ${media.sm} { 
    background: ${({ theme }) => theme.statusPaidBackground};
  }
  
  &:before {
    background: ${({ theme }) => theme.circlePaidBackground};
  }
`;