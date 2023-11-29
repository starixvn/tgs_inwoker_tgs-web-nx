import { InboxItemDetail, SendItemDetail } from "@tgs-web-nx/types";
import moment from "moment/moment";
import { useMemo } from "react";

export function useDialogContent(detailitem: InboxItemDetail | SendItemDetail) {
  const { subject, sender, sentOn, content } = detailitem;

  const date = moment(sentOn).format("YYYY-MM-DD");

  const agoTome = useMemo(() => {
    const currentDate = new Date();
    const sentDate = new Date(sentOn);

    const timeDifference = currentDate - sentDate;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }, [sentOn]);

  return {
    subject,
    sender,
    date,
    agoTome,
    content,
  };
}
