import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { InboxItem } from "@tgs-web-nx/types";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableDateCell,
  TableHead,
  TableRow,
  TableSubjectCell,
} from "@/components/styled-component/Inbox";

type Props = {
  inboxList: InboxItem[];
  handleItemClick: (id: string) => void;
};

const InboxListTable = ({ inboxList, handleItemClick }: Props) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>{i18n.t("subject")}</TableCell>
          <TableCell align={"right"}>{i18n.t("date")}</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {inboxList.map((inboxItem) => {
          const { id, subject, sentOn, haveRead } = inboxItem;

          const date = moment(sentOn).format("YYYY-MM-DD");

          return (
            <TableRow key={id} onClick={() => handleItemClick(inboxItem.id)}>
              <TableSubjectCell
                sx={{
                  fontWeight: haveRead ? 700 : 400,
                }}
              >
                {subject}
              </TableSubjectCell>
              <TableDateCell align={"right"}>{date}</TableDateCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default InboxListTable;
