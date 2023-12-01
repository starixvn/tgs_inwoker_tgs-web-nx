import styled from "styled-components";
import logoCompatibleImg from "@/assets/t18/images/account/download/logo_compatible.svg";
import logoConvenientImg from "@/assets/t18/images/account/download/logo_convenient.svg";
import logoExtensiveImg from "@/assets/t18/images/account/download/logo_extensive.svg";
import logoSecureImg from "@/assets/t18/images/account/download/logo_secure.svg";
import downloadGirlImg from "@/assets/t29/images/account/download-girl.png";

import DownloadButtonGroup from "@/pages/download/components/DownloadButtonGroup";
import InfoCard, { InfoCardItem } from "@/pages/download/components/InfoCard";
import { media } from "@/theme/breakpoints";

const DownloadAppContainer = styled.div``;

const GirlImage = styled.div`
  width: 100%;
  margin-bottom: 10px;

  img {
    width: 100%;
  }
`;

const Paper = styled.div`
  padding: 0;
  background: ${({ theme }) => theme.mainBackground};

  ${media.sm} {
    padding: 10px;
  }
`;

const IntroductionContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
  font-family: Arial;
  font-size: 18px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
  gap: 12px;
  margin-bottom: 34px;
  & span {
    font-family: Arial;
    font-size: 18px;
    font-weight: 700;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
  }
`;

const InfoCardListContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;

  ${media.sm} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const infoCardItemList: InfoCardItem[] = [
  {
    title: "COMPATIBLE",
    content: "App supports any ios and android devices.",
    logo: logoCompatibleImg,
  },
  {
    title: "SECURE",
    content: "Android and ios replicates teh same safety standards.",
    logo: logoSecureImg,
  },
  {
    title: "EXTENSIVE",
    content: "Access to more than 1000+ games including sports betting and more.",
    logo: logoExtensiveImg,
  },
  {
    title: "CONVENIENT",
    content: "User friendly interface simple, clear, and extremely engaging.",
    logo: logoConvenientImg,
  },
];

const DownloadApp = () => {
  return (
    <DownloadAppContainer>
      <GirlImage>
        <img src={downloadGirlImg} alt={"download"} />
      </GirlImage>

      <Paper>
        <IntroductionContainer>
          <span>Introduction</span>
          <p>
            The Mobile Casino App transfers all the powers of our site onto your fingertips. We are
            available for IOS and Android that features a multitude of entertaining games.
          </p>
        </IntroductionContainer>

        <InfoCardListContainer>
          {infoCardItemList.map((infoCardItem) => {
            return <InfoCard key={infoCardItem.title} infoCardItem={infoCardItem} />;
          })}
        </InfoCardListContainer>

        <DownloadButtonGroup />
      </Paper>
    </DownloadAppContainer>
  );
};

export default DownloadApp;
