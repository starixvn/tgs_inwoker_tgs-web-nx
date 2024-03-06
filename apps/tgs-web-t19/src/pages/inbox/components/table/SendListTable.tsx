import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { SendItem } from "@tgs-web-nx/types";
import moment from "moment";
import { Pagination, TablePagination } from "@mui/material";
import { INBOX_TABLE_ROW_COUNT } from "@tgs-web-nx/core/features";
import {
  Table,
  TableBody,
  TableCell,
  TableDateCell,
  TableHead,
  TableRow,
  TableSubjectCell,
} from "@/components/styled-component/Inbox";
import { theme } from "@/theme";

type Props = {
  sendList: SendItem[];
  handleItemClick: (id: string) => void;
};

const SendListTable = ({ sendList, handleItemClick }: Props) => {
  return (
    <Table style={{ backgroundColor: "transparent" }}>
      <TableHead style={{ backgroundColor: theme.pureBlack, borderRadius: "10px" }}>
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
    </Table>
  );
};

export default SendListTable;
