import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import deleteIcon from "@/assets/t21/images/card/delete.svg";
import { media } from "@/theme/breakpoints";
import Icon from "@/components/project/Icon";

const CardContainer = styled.div`
  width: 100%;
  padding: 13px 20px;
  background: ${({ theme }) => theme.gray5};
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 4px;

  ${media.md} {
    width: calc((100% - 14px * 1) / 2);
  }
`;

const CardTitle = styled.div`
  color: ${({ theme }) => theme.black};
  padding-bottom: 10px;
  font-family: Arial;
  font-size: 21px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
`;

const CardContent = styled.div`
  color: ${({ theme }) => theme.gray50};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContentRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const EndingInLabel = styled.div`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.gray50};
`;
const EndingInValue = styled.div`
  font-size: 1.25rem;

  color: ${({ theme }) => theme.gray50};
`;

type Props = {
  title: string;
  content: string;
  handleDelete: () => void;
  disable: boolean;
};
const Card = ({ title, content, handleDelete, disable }: Props) => {
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <CardContent>
        <ContentRow>
          <EndingInLabel>{i18n.t("card.tail")}</EndingInLabel>
          <EndingInValue>{content}</EndingInValue>
        </ContentRow>
        <ContentRow>
          {!disable && (
            <Icon
              onClick={handleDelete}
              iconUrl={deleteIcon}
              width={"40px"}
              height={"40px"}
              style={{
                marginLeft: "auto",
                cursor: "pointer",
              }}
            />
          )}
        </ContentRow>
      </CardContent>
    </CardContainer>
  );
};

export default Card;
