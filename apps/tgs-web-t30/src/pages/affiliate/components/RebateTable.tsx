import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import styled from "styled-components";
import { BrandAllAgent } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { media } from "@/theme/breakpoints";

const StyledTable = styled(Table)`
  padding: 20px;

  ${media.sm} {
    border: 1px solid ${({ theme }) => theme.blueBorder};
  }
`;

const StyledTableHead = styled(TableHead)`
  background: ${({ theme }) => theme.blue};
  & * {
    color: ${({ theme }) => theme.text};
  }
`;

const StyledTableBody = styled(TableBody)`
  background: ${({ theme }) => theme.white};
  & * {
    color: ${({ theme }) => theme.text};
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
          <StyledTableCell>{i18n.t("rebateRate.players")}</StyledTableCell>
          <StyledTableCell>{i18n.t("rebateRate.turnover")}</StyledTableCell>
          <StyledTableCell>{i18n.t("rebateRate.rebates")}(%)</StyledTableCell>
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
