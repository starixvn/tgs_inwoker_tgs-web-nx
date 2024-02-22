import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import styled from "styled-components";
import { BrandAllAgent } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";

const StyledTable = styled(Table)`
  padding: 20px;
`;

const StyledTableHead = styled(TableHead)`
  border: none;
  & * {
    color: ${({ theme }) => theme.tertiaryLight} !important;
  }
`;

const StyledTableBody = styled(TableBody)`
  background: ${({ theme }) => theme.tertiaryDark};
  & * {
    color: ${({ theme }) => theme.gray50} !important;
  }
`;

const StyledHeadTableCell = styled(TableCell)`
  border: none !important;
`;

const StyledTableCell = styled(TableCell)`
  padding: 10px 20px;
  text-align: right !important;
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
