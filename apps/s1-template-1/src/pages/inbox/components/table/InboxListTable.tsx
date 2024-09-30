import { ReportTable } from "@/components/styled-component/Report";
import { theme } from "@/theme";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { InboxItem } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import moment from "moment";

type Props = {
  inboxList: InboxItem[];
  handleItemClick: (id: string) => void;
};

const InboxListTable = ({ inboxList, handleItemClick }: Props) => {
  return (
    <ReportTable>
      <TableHead>
        <TableRow>
          <TableCell sx={{
                borderTopLeftRadius: `${theme.tableBorderRadius}`
              }}>{i18n.t("subject")}</TableCell>
          <TableCell sx={{
                 borderTopRightRadius: `${theme.tableBorderRadius}`
              }} align={"right"}>{i18n.t("date")}</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {inboxList.map((inboxItem, index) => {
          const { id, subject, sentOn, haveRead } = inboxItem;

          const date = moment(sentOn).format("YYYY-MM-DD");
          const lastRow = index === inboxList.length - 1;

          return (
            <TableRow key={id} onClick={() => handleItemClick(inboxItem.id)}>
              <TableCell
                sx={{ borderBottom: lastRow ?  `none !important` : `inherit`, borderBottomLeftRadius: lastRow ? `${theme.tableBorderRadius}` : "0" }}
              >
                {subject}
              </TableCell>
              <TableCell sx={{ borderBottom: lastRow ?  `none !important` : `inherit`, borderBottomRightRadius: lastRow ? `${theme.tableBorderRadius}` : "0", color: `${theme.amountColor} !important`, fontWeight: "700 !important" }} align={"right"}>{date}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </ReportTable>
  );
};

export default InboxListTable;
