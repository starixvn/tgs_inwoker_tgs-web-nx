import React from "react";
import { InboxItemDetail, ReplyInboxItemReqDto } from "@tgs-web-nx/types";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import ReplyForm from "@/pages/inbox/components/form/ReplyForm";

const InboxDialogContentContainer = styled.div``;
const Title = styled.div`
  font-size: 1.5rem;
  text-align: center;
  font-weight: 700;
  color: ${({ theme }) => theme.blue50};
  margin-bottom: 18px;
`;

type Props = {
  inboxItemDetail: InboxItemDetail;
  handleSubmitReply: (replyInboxItemReqDto: ReplyInboxItemReqDto) => Promise<void>;
};

const InboxDialogContent = ({ inboxItemDetail, handleSubmitReply }: Props) => {
  return (
    <InboxDialogContentContainer>
      <Title>{i18n.t("reply")}</Title>
      <ReplyForm inboxItemDetail={inboxItemDetail} handleSubmitReply={handleSubmitReply} />
    </InboxDialogContentContainer>
  );
};

export default InboxDialogContent;
