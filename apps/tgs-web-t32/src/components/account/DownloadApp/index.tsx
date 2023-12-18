import logoCompatibleImg from "@/assets/t32/images/download/logo_compatible.svg";
import logoConvenientImg from "@/assets/t32/images/download/logo_convenient.svg";
import logoExtensiveImg from "@/assets/t32/images/download/logo_extensive.svg";
import logoSecureImg from "@/assets/t32/images/download/logo_secure.svg";
import downloadGirlImg from "@/assets/t32/images/download/download-girl.png";

import DownloadButtonGroup from "@/pages/download/components/DownloadButtonGroup";
import InfoCard, { InfoCardItem } from "@/pages/download/components/InfoCard";
import {
  DownloadAppContainer,
  GirlImage,
  InfoCardListContainer,
  IntroductionContainer,
  Paper,
} from "@/components/styled-component/Download";

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
