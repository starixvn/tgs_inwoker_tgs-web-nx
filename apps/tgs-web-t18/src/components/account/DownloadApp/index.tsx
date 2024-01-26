import { i18n } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import logoCompatibleImg from "@/assets/t18/images/download/logo_compatible.svg";
import logoConvenientImg from "@/assets/t18/images/download/logo_convenient.svg";
import logoExtensiveImg from "@/assets/t18/images/download/logo_extensive.svg";
import logoSecureImg from "@/assets/t18/images/download/logo_secure.svg";
import downloadGirlImg from "@/assets/t18/images/download/download-girl.jpg";

import DownloadButtonGroup from "@/pages/download/components/DownloadButtonGroup";
import InfoCard, { InfoCardItem } from "@/pages/download/components/InfoCard";
import {
  DownloadAppContainer,
  GirlImage,
  InfoCardListContainer,
  IntroductionContainer,
  Paper,
} from "@/components/styled-component/Download";

const DownloadApp = () => {
  const infoCardItemList: InfoCardItem[] = [
    {
      title: i18n.t("compatible"),
      content: i18n.t("compatibledesc"),
      logo: logoCompatibleImg,
    },
    {
      title: i18n.t("secure"),
      content: i18n.t("securedesc"),
      logo: logoSecureImg,
    },
    {
      title: i18n.t("extensive"),
      content: i18n.t("extensivedesc"),
      logo: logoExtensiveImg,
    },
    {
      title: i18n.t("convenient"),
      content: i18n.t("convenientdesc"),
      logo: logoConvenientImg,
    },
  ];
  return (
    <DownloadAppContainer>
      <GirlImage>
        <img src={downloadGirlImg} alt={"download"} />
      </GirlImage>

      <Paper>
        <IntroductionContainer>
          <span>{i18n.t("introduction")}</span>
          <p>{i18n.t("introdesc").replace(/{brandName}/g, config.brand)}</p>
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
