import {
  TableBody,
  TableCell,
  TableDateCell,
  TableHead,
  TableRow,
  TableSubjectCell
} from "@/components/styled-component/Inbox";
import { ReportTable } from "@/components/styled-component/Report";
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
          <TableCell>{i18n.t("subject")}</TableCell>
          <TableCell align={"right"}>{i18n.t("date")}</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {sendList.map((inboxItem) => {
          const { id, subject, sentOn } = inboxItem;
          const date = moment(sentOn).format("YYYY-MM-DD");

          return (
            <TableRow key={id} onClick={() => handleItemClick(inboxItem.id)}>
              <TableSubjectCell>{subject}</TableSubjectCell>
              <TableDateCell align={"right"}>{date}</TableDateCell>
            </TableRow>
          );
        })}
      </TableBody>
    </ReportTable>
  );
};

export default SendListTable;
