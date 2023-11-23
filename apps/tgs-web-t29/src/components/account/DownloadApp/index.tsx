import styled from "styled-components";
import logoCompatibleImg from "@/assets/t18/images/account/download/logo_compatible.svg";
import logoConvenientImg from "@/assets/t18/images/account/download/logo_convenient.svg";
import logoExtensiveImg from "@/assets/t18/images/account/download/logo_extensive.svg";
import logoSecureImg from "@/assets/t18/images/account/download/logo_secure.svg";
import downloadGirlImg from "@/assets/t18/images/account/girl/download.png";
import DownloadButtonGroup from "@/components/account/DownloadApp/DownloadButtonGroup";
import InfoCard, { InfoCardItem } from "@/components/account/DownloadApp/InfoCard";

const DownloadAppContainer = styled.div``;

const GirlImage = styled.div`
  width: 100%;
  margin-bottom: 10px;

  img {
    width: 100%;
  }
`;

const IntroductionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 34px 24px 16px;
  color: ${({ theme }) => theme.gray50};
  font-family: Arial;
  font-size: 18px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
  gap: 12px;
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
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  padding: 0 16px;
`;

const infoCardItemList: InfoCardItem[] = [
  {
    title: "COMPATIBLE",
    content: "app supports any ios and android devices.",
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
    </DownloadAppContainer>
  );
};

export default DownloadApp;
