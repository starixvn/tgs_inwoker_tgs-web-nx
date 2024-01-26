import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import deleteIcon from "@/assets/t18/images/card/delete.svg";
import Icon from "@/components/project/Icon";

const CardContainer = styled.div`
  padding: 13px 20px;
  background: ${({ theme }) => theme.primaryLight};
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 5px;
`;

const CardTitle = styled.div`
  color: ${({ theme }) => theme.tertiaryLight};
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
  padding-bottom: 10px;
  font-size: 1.312rem;
`;

const CardContent = styled.div`
  color: ${({ theme }) => theme.white};
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
  color: ${({ theme }) => theme.white};
`;
const EndingInValue = styled.div`
  font-size: 1.25rem;

  color: ${({ theme }) => theme.white};
`;

type Props = {
  title: string;
  content: string;
  handleDelete: () => void;
  disable: boolean;
  isCustomizedBrand: boolean;
};
const Card = ({ title, content, handleDelete, disable, isCustomizedBrand }: Props) => {
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <CardContent>
        <ContentRow>
          <EndingInLabel>{i18n.t("card.tail")}</EndingInLabel>
          <EndingInValue>{content}</EndingInValue>
        </ContentRow>
        <ContentRow>
          {!disable && !isCustomizedBrand && (
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
