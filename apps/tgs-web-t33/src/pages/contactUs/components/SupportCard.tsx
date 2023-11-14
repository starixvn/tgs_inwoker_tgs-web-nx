import React, { useCallback } from "react";
import styled from "styled-components";
import { BrandsSupport } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import Icon from "@/components/project/Icon";
import { media } from "@/theme/breakpoints";
import { Button } from "@/components/UI/Button";
import { theme } from "@/theme";

const SupportCardContainer = styled.div`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 20px;
  background: ${({ theme }) => theme.gray40};
  color: ${({ theme }) => theme.white};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.098rem;

  & > * {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  width: calc((100% - 16px * (2 - 1)) / 2);

  // ${media.sm} {
  //   width: calc((100% - 16px * (2 - 1)) / 3);
  // }
  ${media.md} {
    width: calc((100% - 16px * (3 - 1)) / 4);
  }
`;

const iconSwitcher = (icon: string) => {
  switch (icon) {
    case "WeChat":
      return "support-wechat.svg";
    case "Line":
      return "support-line.svg";
    case "Telegram":
      return "support-telegram.svg";
    case "Skype":
      return "support-skype.svg";
    case "KakaoTalk":
      return "support-kakaotalk.svg";
    case "Viber":
      return "support-viber.svg";
    case "WhatsApp":
      return "support-whatsapp.svg";
    case "Zalo":
      return "support-zalo.svg";
    case "copy":
      return "copy.png";
    default:
      return "support-call.svg";
  }
};

const IconContainer = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 28px;
  background: ${({ theme }) => theme.white};
  border: 11px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  brandsSupport: BrandsSupport;
  handleClick: (brandsSupport: BrandsSupport) => void;
};
const SupportCard = ({ brandsSupport, handleClick }: Props) => {
  const { type } = brandsSupport;

  const handleClickCard = useCallback(() => {
    handleClick(brandsSupport);
  }, []);

  return (
    <SupportCardContainer onClick={handleClickCard}>
      <Icon
        iconUrl={`${import.meta.env.BASE_URL}assets/images/support/${iconSwitcher(
          brandsSupport.type,
        )}`}
        width={"55px"}
        height={"55px"}
      />

      <span>{type}</span>

      <Button
        fullWidth
        sx={{
          color: theme.white,
          background: theme.secondary,
          padding: "6px",
        }}
      >
        {i18n.t("common.contact")}
      </Button>
    </SupportCardContainer>
  );
};

export default SupportCard;
