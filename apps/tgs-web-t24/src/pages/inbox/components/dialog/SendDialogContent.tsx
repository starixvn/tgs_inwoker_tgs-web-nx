import React from "react";
import { SendItemDetail } from "@tgs-web-nx/types";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useDialogContent } from "@tgs-web-nx/core/features";
import { useAccountStore } from "@tgs-web-nx/core";

const SendDialogContentContainer = styled.div``;
const Title = styled.div`
  font-size: 1.563rem;
  line-height: 1.967rem;
  color: ${({ theme }) => theme.white};
  margin-bottom: 5px;
`;
const Info = styled.div`
  font-size: 0.812rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 18px;
`;
const Content = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 18px;
`;

type Props = {
  sendItemDetail: SendItemDetail;
};

const SendDialogContent = ({ sendItemDetail }: Props) => {
  const { subject, date, agoTime, content, username } = useDialogContent(sendItemDetail);

  return (
    <SendDialogContentContainer>
      <Title>{subject}</Title>
      <Info>{`${i18n.t("sentBy")} ${username} ${date} - ${agoTime} ${i18n.t("daysago")}`}</Info>
      <Content>{content}</Content>
    </SendDialogContentContainer>
  );
};

export default React.memo(SendDialogContent);
