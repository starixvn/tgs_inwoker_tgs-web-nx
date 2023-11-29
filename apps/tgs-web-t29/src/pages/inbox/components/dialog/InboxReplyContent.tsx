import React from "react";
import { InboxItemDetail } from "@tgs-web-nx/types";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { SubmitButton } from "@/components/styled-component/ProfileForms";

const InboxDialogContentContainer = styled.div``;
const Title = styled.div`
  font-size: 1.563rem;
  line-height: 1.967rem;
  color: ${({ theme }) => theme.blue50};
  margin-bottom: 5px;
`;
const Info = styled.div`
  font-size: 0.812rem;
  color: ${({ theme }) => theme.gray50};
  margin-bottom: 18px;
`;
const Content = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.gray50};
  margin-bottom: 18px;
`;

type Props = {
  inboxItemDetail: InboxItemDetail;
  handleSubmit: () => void;
};

const InboxDialogContent = ({ inboxItemDetail, handleSubmit }: Props) => {
  const { subject, sender, sentOn, content } = inboxItemDetail;

  return (
    <InboxDialogContentContainer>
      {/*<Title>{subject}</Title>*/}
      {/*<Info>{`${i18n.t("sentBy")} ${sender} ${sentOn}`}</Info>*/}
      {/*<Content>{content}</Content>*/}

      <SubmitButton fullWidth onClick={handleSubmit}>
        {i18n.t("common.submit")}
      </SubmitButton>
    </InboxDialogContentContainer>
  );
};

export default InboxDialogContent;
