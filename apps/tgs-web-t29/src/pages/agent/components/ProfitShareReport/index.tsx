import QRCode from "react-qr-code";
import { useImageActions, useRebateTable, useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";
import {
  Button,
  FormControl,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  styled as muiStyled,
} from "@mui/material";
import { theme } from "@/theme";
import { QRCodeContainer } from "@/components/styled-component/Affiliate";
import { media } from "@/theme/breakpoints";

const ProfitShareContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProfitShareTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
  color: #23507d;
`;

const NonBorderTableCell = muiStyled(TableCell)(({ theme }) => ({
  border: "none",
  fontSize: "16px",
}));

const FillTableCell = muiStyled(NonBorderTableCell)(({ theme }) => ({
  border: "none",
  background: theme.palette.blue20,
}));

const TitleTableCell = muiStyled(NonBorderTableCell)(({ theme }) => ({
  color: "#23507D",
  fontWeight: 700,
}));

// const NonBorderTableCell = styled(TableCell)`
//   border-bottom: none;
// `;

const ProfitShareReport = () => {
  const { imageId } = useImageActions();
  const { affiliateLink } = useRebateTable();
  const { isDesktopSize } = useRwd();

  return (
    <ProfitShareContainer>
      <ProfitShareTitle>結算週期:每日</ProfitShareTitle>
      <Table sx={{ fontSize: "18px" }}>
        <TableHead>
          <TableRow>
            <NonBorderTableCell></NonBorderTableCell>
            <TitleTableCell>上期</TitleTableCell>
            <TitleTableCell>本期</TitleTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TitleTableCell>週期日期</TitleTableCell>
            <NonBorderTableCell>2024-05-18 07:41 pm</NonBorderTableCell>
            <NonBorderTableCell>2024-05-18 07:41 pm</NonBorderTableCell>
          </TableRow>
          <TableRow>
            <TitleTableCell>派發狀態</TitleTableCell>
            <NonBorderTableCell>審核中</NonBorderTableCell>
            <NonBorderTableCell>已派發</NonBorderTableCell>
          </TableRow>
          <TableRow>
            <TitleTableCell>代理承擔紅利</TitleTableCell>
            <NonBorderTableCell>111,111,111</NonBorderTableCell>
            <NonBorderTableCell>4</NonBorderTableCell>
          </TableRow>
          <TableRow>
            <TitleTableCell>代理承擔優惠調帳</TitleTableCell>
            <NonBorderTableCell>0</NonBorderTableCell>
            <NonBorderTableCell>0</NonBorderTableCell>
          </TableRow>

          <TableRow>
            <TitleTableCell>週期盈虧</TitleTableCell>
            <NonBorderTableCell>333,333,333</NonBorderTableCell>
            <NonBorderTableCell>400</NonBorderTableCell>
          </TableRow>
          <TableRow>
            <FillTableCell sx={{ textAlign: "right" }}>+ 公司輸贏</FillTableCell>
            <FillTableCell>222,222,222</FillTableCell>
            <FillTableCell>410</FillTableCell>
          </TableRow>
          <TableRow>
            <FillTableCell sx={{ textAlign: "right" }}>- 紅利金額</FillTableCell>
            <FillTableCell>111,111,111</FillTableCell>
            <FillTableCell>10</FillTableCell>
          </TableRow>

          <TableRow>
            <TitleTableCell>直屬玩家貢獻</TitleTableCell>
            <NonBorderTableCell>333,333,333</NonBorderTableCell>
            <NonBorderTableCell>400</NonBorderTableCell>
          </TableRow>
          <TableRow>
            <FillTableCell sx={{ textAlign: "right" }}>淨盈利</FillTableCell>
            <FillTableCell>222,222,222</FillTableCell>
            <FillTableCell>410</FillTableCell>
          </TableRow>
          <TableRow>
            <FillTableCell sx={{ textAlign: "right" }}>*分紅比例</FillTableCell>
            <FillTableCell>111,111,111</FillTableCell>
            <FillTableCell>10</FillTableCell>
          </TableRow>

          <TableRow>
            <TitleTableCell>分紅金額</TitleTableCell>
            <NonBorderTableCell>333,333,333</NonBorderTableCell>
            <NonBorderTableCell>400</NonBorderTableCell>
          </TableRow>
          <TableRow>
            <FillTableCell sx={{ textAlign: "right" }}>+ 直屬玩家貢獻</FillTableCell>
            <FillTableCell>222,222,222</FillTableCell>
            <FillTableCell>410</FillTableCell>
          </TableRow>
          <TableRow>
            <FillTableCell sx={{ textAlign: "right" }}>-平台費用</FillTableCell>
            <FillTableCell>111,111,111</FillTableCell>
            <FillTableCell>10</FillTableCell>
          </TableRow>
          <TableRow>
            <FillTableCell sx={{ textAlign: "right" }}>-產品費用</FillTableCell>
            <FillTableCell>111,111,111</FillTableCell>
            <FillTableCell>10</FillTableCell>
          </TableRow>
          <TableRow>
            <FillTableCell sx={{ textAlign: "right" }}>+ 團隊貢獻</FillTableCell>
            <FillTableCell>111,111,111</FillTableCell>
            <FillTableCell>10</FillTableCell>
          </TableRow>
          <TableRow>
            <FillTableCell sx={{ textAlign: "right" }}>累計負分紅</FillTableCell>
            <FillTableCell>111,111,111</FillTableCell>
            <FillTableCell>10</FillTableCell>
          </TableRow>
          <TableRow>
            <FillTableCell sx={{ textAlign: "right" }}>- 代理調帳</FillTableCell>
            <FillTableCell>111,111,111</FillTableCell>
            <FillTableCell>10</FillTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ProfitShareContainer>
  );
};

export default ProfitShareReport;
