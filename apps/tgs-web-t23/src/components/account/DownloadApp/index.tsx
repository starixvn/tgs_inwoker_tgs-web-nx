import styled from "styled-components";
import logoCompatibleImg from "@/assets/t18/images/account/download/logo_compatible.svg";
import logoConvenientImg from "@/assets/t18/images/account/download/logo_convenient.svg";
import logoExtensiveImg from "@/assets/t18/images/account/download/logo_extensive.svg";
import logoSecureImg from "@/assets/t18/images/account/download/logo_secure.svg";
import DownloadButtonGroup from "@/pages/download/components/DownloadButtonGroup";
import InfoCard, { InfoCardItem } from "@/pages/download/components/InfoCard";
import { media } from "@/theme/breakpoints";

const DownloadAppContainer = styled.div`
  padding: 0 205px;

  ${media.xs} {
    padding: 0 24px;
  }
`;

const IntroductionContainer = styled.div`
  color: ${({ theme }) => theme.white};
  font-family: Gill Sans MT;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background: #2e3237;
  padding: 40px 20px;
`;

const Text = styled.div`
  padding-top: 10px;
  font-family: Gill Sans MT;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const InfoCardListContainer = styled.div`
  padding-top: 10px;
  width: 100%;
  gap: 12px;
  display: flex;
  flex-wrap: wrap;
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
      <IntroductionContainer>
        <p>Introduction</p>
        <Text>
          The Mobile Casino App transfers all the powers of our site onto your fingertips. We are
          available for lOS and Android that features a multitude of entertaining games.
        </Text>
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
