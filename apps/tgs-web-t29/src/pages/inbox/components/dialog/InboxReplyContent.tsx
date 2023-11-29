import React from "react";
import { InboxItemDetail } from "@tgs-web-nx/types";
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
  handleSubmit: () => Promise<void>;
};

const InboxDialogContent = ({ inboxItemDetail, handleSubmit }: Props) => {
  return (
    <InboxDialogContentContainer>
      <Title>{i18n.t("reply")}</Title>
      {/*<Info>{`${i18n.t("sentBy")} ${sender} ${sentOn}`}</Info>*/}
      {/*<Content>{content}</Content>*/}
      <ReplyForm inboxItemDetail={inboxItemDetail} handleSubmit={handleSubmit} />
    </InboxDialogContentContainer>
  );
};

export default InboxDialogContent;
