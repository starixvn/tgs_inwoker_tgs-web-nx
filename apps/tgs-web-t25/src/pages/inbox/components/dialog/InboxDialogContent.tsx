import React from "react";
import { InboxItemDetail } from "@tgs-web-nx/types";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useDialogContent } from "@tgs-web-nx/core/features";
import { SubmitButton } from "@/components/styled-component/ProfileForms";

const InboxDialogContentContainer = styled.div``;
const Title = styled.div`
  font-size: 1.563rem;
  line-height: 1.967rem;
  color: ${({ theme }) => theme.white};
  margin-bottom: 5px;
`;
const Info = styled.div`
  font-size: 0.812rem;
  color: ${({ theme }) => theme.white};
  margin-bottom: 18px;
`;
const Content = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.white};
  margin-bottom: 18px;
  white-space: pre-line;
`;

type Props = {
  inboxItemDetail: InboxItemDetail;
  handleReply: () => void;
};

const InboxDialogContent = ({ inboxItemDetail, handleReply }: Props) => {
  const { subject, sender, date, agoTime, content } = useDialogContent(inboxItemDetail);

  return (
    <InboxDialogContentContainer>
      <Title>{subject}</Title>
      <Info>{`${i18n.t("sentBy")} ${sender} ${date} - ${agoTime} ${i18n.t("daysago")}`}</Info>
      <Content>{content}</Content>

      <SubmitButton fullWidth onClick={handleReply}>
        {i18n.t("reply")}
      </SubmitButton>
    </InboxDialogContentContainer>
  );
};

export default InboxDialogContent;
