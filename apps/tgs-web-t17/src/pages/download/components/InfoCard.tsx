import React from "react";
import styled from "styled-components";
import { media } from "@/theme/breakpoints";

const IntroCardContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.mainBackground};
  border-radius: 10px;
  padding: 40px 24px;
  display: flex;
  align-items: center;

  ${media.sm} {
    width: calc((100% - 10px * 1) / 2);
  }

  & .logo {
    width: 48px;
    flex-shrink: 0;
    margin-right: 12px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  & .title {
    font-family: Arial;
    font-size: 16px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    color: ${({ theme }) => theme.white};
  }

  & .content {
    font-family: Arial;
    font-size: 15px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: ${({ theme }) => theme.white};
  }
`;

export interface InfoCardItem {
  title: string;
  content: string;
  logo: string;
}

type IntroCardProps = { infoCardItem: InfoCardItem };

const InfoCard = ({ infoCardItem }: IntroCardProps) => {
  const { title, content, logo } = infoCardItem;

  return (
    <IntroCardContainer>
      <div className={"logo"}>
        <img src={logo} alt={title} />
      </div>

      <div className={"wording"}>
        <div className={"title"}>{title}</div>
        <div className={"content"}>{content}</div>
      </div>
    </IntroCardContainer>
  );
};

export default InfoCard;
