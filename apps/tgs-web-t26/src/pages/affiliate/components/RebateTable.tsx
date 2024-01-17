import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import styled from "styled-components";
import { BrandAllAgent } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { media } from "@/theme/breakpoints";

const StyledTable = styled(Table)`
  padding: 20px;
`;

const StyledTableHead = styled(TableHead)`
  background: ${({ theme }) => theme.darkGray} !important;
  ${media.sm} {
    background: #0d0d0d !important;
  }
  & * {
    color: ${({ theme }) => theme.text} !important;
  }
`;

const StyledTableBody = styled(TableBody)`
  background: ${({ theme }) => theme.darkGray} !important;
  ${media.sm} {
    background: #161616 !important;
  }
  & * {
    color: ${({ theme }) => theme.text} !important;
  }
`;

const StyledHeadTableCell = styled(TableCell)`
  border: none !important;
`;

const StyledTableCell = styled(TableCell)`
  padding: 10px 20px;
  border: none !important;
  ${media.sm} {
    border-bottom: ${({ theme }) => `1px solid ${theme.darkGray} !important`};
  }
`;

type Props = {
  rebateTableRow: BrandAllAgent[];
};
const RebateTable = ({ rebateTableRow }: Props) => {
  return (
    <StyledTable>
      <StyledTableHead>
        <TableRow>
          <StyledHeadTableCell>{i18n.t("rebateRate.players")}</StyledHeadTableCell>
          <StyledHeadTableCell>{i18n.t("rebateRate.turnover")}</StyledHeadTableCell>
          <StyledHeadTableCell>{i18n.t("rebateRate.rebates")}(%)</StyledHeadTableCell>
        </TableRow>
      </StyledTableHead>

      <StyledTableBody>
        {rebateTableRow.map((brandAllAgent, index) => {
          const { activenumber, turnover, rebatepercentage } = brandAllAgent;
          return (
            <TableRow key={index}>
              <StyledTableCell>{activenumber}</StyledTableCell>
              <StyledTableCell>{turnover}</StyledTableCell>
              <StyledTableCell>{rebatepercentage}</StyledTableCell>
            </TableRow>
          );
        }) || <TableRow />}
      </StyledTableBody>
    </StyledTable>
  );
};

export default RebateTable;
