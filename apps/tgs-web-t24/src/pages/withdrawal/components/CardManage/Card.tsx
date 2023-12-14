import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import deleteIcon from "@/assets/t24/images/withdraw/icon-delete.svg";
import { media } from "@/theme/breakpoints";
import Icon from "@/components/project/Icon";

const CardContainer = styled.div`
  width: 100%;
  padding: 16px;
  background: ${({ theme }) => theme.gray95};
  border: 1px solid ${({ theme }) => theme.primary};
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 4px;

  ${media.md} {
    width: calc((100% - 14px * 1) / 2);
    background: ${({ theme }) => theme.mainBackground};
  }
`;

const CardTitle = styled.div`
  color: ${({ theme }) => theme.text};
  padding-bottom: 10px;
  font-size: 1.25rem;
  font-weight: 700;
`;

const CardContent = styled.div`
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
  font-size: 1.125rem;
  color: ${({ theme }) => theme.gray20};
`;
const EndingInValue = styled.div`
  font-size: 1.125rem;

  color: ${({ theme }) => theme.gray20};
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
