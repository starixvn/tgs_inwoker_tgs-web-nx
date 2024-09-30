
import { ReportTable } from "@/components/styled-component/Report";
import { theme } from "@/theme";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { SendItem } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import moment from "moment";

type Props = {
  sendList: SendItem[];
  handleItemClick: (id: string) => void;
};

const SendListTable = ({ sendList, handleItemClick }: Props) => {
  return (
    <ReportTable>
      <TableHead>
        <TableRow>
          <TableCell  sx={{
                borderTopLeftRadius: `${theme.tableBorderRadius}`
              }}>{i18n.t("subject")}</TableCell>
          <TableCell  sx={{
                 borderTopRightRadius: `${theme.tableBorderRadius}`
              }} align={"right"}>{i18n.t("date")}</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {sendList.map((inboxItem, index) => {
          const { id, subject, sentOn } = inboxItem;
          const date = moment(sentOn).format("YYYY-MM-DD");
          const lastRow = index === sendList.length - 1;
          return (
            <TableRow key={id} onClick={() => handleItemClick(inboxItem.id)}>
              <TableCell sx={{ borderBottom: lastRow ?  `none !important` : `inherit`, borderBottomLeftRadius: lastRow ? `${theme.tableBorderRadius}` : "0" }}>{subject}</TableCell>
              <TableCell sx={{ borderBottom: lastRow ?  `none !important` : `inherit`, borderBottomRightRadius: lastRow ? `${theme.tableBorderRadius}` : "0", fontWeight: "700 !important" }} align={"right"}>{date}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </ReportTable>
  );
};

export default SendListTable;
