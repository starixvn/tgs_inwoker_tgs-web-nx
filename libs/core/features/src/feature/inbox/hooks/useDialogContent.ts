import { InboxItemDetail, SendItemDetail } from "@tgs-web-nx/types";
import moment from "moment/moment";
import { useMemo } from "react";
import { useAccountStore } from "@tgs-web-nx/core";

export function useDialogContent(detailitem: InboxItemDetail | SendItemDetail) {
  const { subject, sender, sentOn, content } = detailitem;
  const { account } = useAccountStore();
  const username = account.info.member_username;

  const date = moment(sentOn).format("YYYY-MM-DD");

  const agoTime = useMemo(() => {
    const currentDate: Date = new Date();
    const sentDate: Date = new Date(sentOn);

    const timeDifference: number = currentDate.getTime() - sentDate.getTime();
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }, [sentOn]);

  return {
    subject,
    sender,
    date,
    agoTime,
    content,
    username,
  };
}
