import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import styled from "styled-components";
import { BrandAllAgent } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { media } from "@/theme/breakpoints";

const StyledTable = styled(Table)`
  padding: 20px;
`;

const StyledTableHead = styled(TableHead)`
  background: ${({ theme }) => theme.mainBackground};
  border: none !important;
  & * {
    color: ${({ theme }) => theme.text} !important;
  }
`;

const StyledTableBody = styled(TableBody)`
  background: ${({ theme }) => theme.inputBGC};
  ${media.sm} {
    background: ${({ theme }) => theme.mainBackground} !important;
  }
  & * {
    color: ${({ theme }) => theme.text} !important;
  }
`;

const StyledHeadTableCell = styled(TableCell)`
  border: none !important;
  background: ${({ theme }) => `${theme.gray20} !important`};
  ${media.sm} {
    color: ${({ theme }) => theme.black};
  }
`;

const StyledTableCell = styled(TableCell)`
  padding: 10px 20px;
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
