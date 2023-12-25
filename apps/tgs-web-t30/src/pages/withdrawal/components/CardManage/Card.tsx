import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import deleteIcon from "@/assets/t30/images/withdraw/icon-delete.svg";
import deleteDesktopIcon from "@/assets/t30/images/withdraw/icon-delete-desktop.svg";
import { media } from "@/theme/breakpoints";
import Icon from "@/components/project/Icon";

const CardContainer = styled.div`
  width: 100%;
  padding: 16px;
  background: ${({ theme }) => theme.darkBlue};
  border: 1px solid ${({ theme }) => theme.main};
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 4px;

  ${media.md} {
    width: calc((100% - 14px * 1) / 2);
    background: ${({ theme }) => theme.dae3};
  }
`;

const CardTitle = styled.div`
  color: ${({ theme }) => theme.white};
  padding-bottom: 10px;
  font-size: 1.25rem;
  font-weight: 700;

  ${media.md} {
    color: ${({ theme }) => theme.text};
  }
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
  font-weight: 700;
  color: ${({ theme }) => theme.main};

  ${media.md} {
    color: ${({ theme }) => theme.main};
  }
`;
const EndingInValue = styled.div`
  font-size: 1.125rem;

  color: ${({ theme }) => theme.white};
  ${media.md} {
    color: ${({ theme }) => theme.text};
  }
`;

type Props = {
  title: string;
  content: string;
  handleDelete: () => void;
  disable: boolean;
};
const Card = ({ title, content, handleDelete, disable }: Props) => {
  const { isDesktopSize } = useRwd();

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
              iconUrl={isDesktopSize ? deleteDesktopIcon : deleteIcon}
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
