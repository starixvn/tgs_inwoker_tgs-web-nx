import React, { useCallback } from "react";
import styled from "styled-components";
import { BrandsSupport } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import Icon from "@/components/project/Icon";
import { media } from "@/theme/breakpoints";
import { Button } from "@/components/UI/Button";
import { theme } from "@/theme";

const SupportCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px;
  background: ${({ theme }) => theme.g5};
  color: ${({ theme }) => theme.white};
  font-size: 1rem;
  font-weight: 400;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.green};

  & > * {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  width: calc((100% - 14px * (2 - 1)) / 2);
  max-width: 190px;

  ${media.md} {
    width: calc((100% - 16px * (4 - 1)) / 4);
    max-width: 260px;
    border-radius: 10px;
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
        width={"79px"}
        height={"79px"}
      />

      <span>{type}</span>

      <Button
        fullWidth
        sx={{
          color: theme.white,
          background: theme.secondaryGradient,
          borderRadius: "3px",
          padding: "10px",
          "&:hover": {
            background: "conic-gradient(from 0deg at 50% 50%, #bfa1ff 0deg, #966bee 360deg)",
          },
        }}
      >
        {i18n.t("common.contact")}
      </Button>
    </SupportCardContainer>
  );
};

export default SupportCard;
