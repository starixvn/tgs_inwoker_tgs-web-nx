import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useProvider } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useState } from "react";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import ChatQRcodePopup from "./ChatQRcodePopup";
import SocialMedia from "@/components/project/SocialMedia";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import QRcodeUrl from "@/assets/t29/images/home/QRcode.svg";
import qrcode_skype from "@/assets/t29/images/qrcode/qrcode_skype.png";
import qrcode_whatsapp from "@/assets/t29/images/qrcode/qrcode_whatsapp.png";
import qrcode_telegram from "@/assets/t29/images/qrcode/qrcode_telegram.png";
import qrcode_wechat from "@/assets/t29/images/qrcode/qrcode_wechat.png";

const FooterContainer = styled.footer`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.black};
  width: 100%;
  color: ${({ theme }) => theme.white};
`;

const FooterGroups = styled.div`
  width: 100%;
  display: flex;
  max-width: ${SUB_CONTENT_MAX_WIDTH};
  gap: 20px;
`;

const FooterGroup = styled.div`
  min-width: 28%;
`;

const GroupTitle = styled.h6`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 20px;
`;

const GroupContent = styled.div`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 5px;
`;

const PartnersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 11px;
`;

const ParnterBadge = styled.div`
  padding: 8px 16px;
  border-radius: 50px;
  border: 1px solid white;
  font-size: 0.875rem;

  ${media.md} {
    padding: 10px 20px;
  }
`;

const LogoWrapper = styled.div`
  width: 200px;
  height: 90px;
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: scale-down;
`;

const Link = styled.div`
  width: max-content;
  cursor: pointer;
`;

const Links = styled.div`
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  gap: 17px;
`;


interface QuickLink {
  isVisible: boolean,
  onClick: () => void,
  content: string,
}

const Footer = () => {
  const { general } = useGeneralStore();
  const { providerList } = useProvider();
  const history = useHistory();
  const [isOpenChatQRcode, setIsOpenChatQRcode] = useState(false);

  const partnerList = providerList.map((provider) => {
    return provider.name;
  });

  const brand = config.brand;

  const navigateTo = (pageName: string) => {
    history.push("/" + pageName);
    window.scroll({ top: 0, behavior: "smooth" });
  };

  const chatQRcodeList = [
    {
      name: "Skype",
      url: qrcode_skype,
    },
    {
      name: "WhatsApp",
      url: qrcode_whatsapp,
    },
    {
      name: "Telegram",
      url: qrcode_telegram,
    },
    {
      name: "WeChat",
      url: qrcode_wechat,
    }
  ];

  const quickLinks: QuickLink[] = [
    {
      isVisible: true,
      onClick: () => setIsOpenChatQRcode(true),
      content: i18n.t("T13.quickLink.247"),
    },
    {
      isVisible: true,
      onClick: () => navigateTo("faq"),
      content: i18n.t("T13.quickLink.faq"),
    },
    {
      isVisible: true,
      onClick: () => navigateTo("privacypolicy"),
      content: i18n.t("T13.quickLink.privacy"),
    },
    {
      isVisible: true,
      onClick: () => navigateTo("terms"),
      content: i18n.t("T13.quickLink.tnc"),
    },
    {
      isVisible: true,
      onClick: () => navigateTo("responsiblegaming"),
      content: i18n.t("T13.quickLink.reponsible"),
    },
  ];

  const renderQuickLinks = quickLinks.map((link, i) => {
    if(link.isVisible) {
      return (
        <GroupContent key={i}>
          <Link onClick={link.onClick}>
            {link.content}
          </Link>
        </GroupContent>
      );
    }

    return null;
  });

  return (
    <FooterContainer>
      <FooterGroups>

        {/* Left */}
        <FooterGroup>
          <GroupTitle>Download App</GroupTitle>
          <img src={QRcodeUrl} width={65} alt="QRcode" />
          <GroupTitle style={{marginTop: "10px"}}>Gaming License</GroupTitle>
          <GroupContent>
            <LogoWrapper>
              <LogoImg src={general.brand && general.brand.loadingUrl} alt={`${brand}`} />
            </LogoWrapper>
          </GroupContent>
          <GroupContent>{`${brand} Copyright© 2020 ${brand} Casino `}</GroupContent>
          <GroupContent>Co.Group</GroupContent>
          <GroupContent>All Rights Reserved</GroupContent>
          <GroupContent>V1.1.3795703</GroupContent>
        </FooterGroup>

        {/* Middle */}
        <FooterGroup>

          <GroupTitle>Quick Links</GroupTitle>
          <Links>{renderQuickLinks}</Links>

          <GroupTitle>Follow Us</GroupTitle>
          <SocialMedia />

        </FooterGroup>

        {/* Right */}
        <FooterGroup>
          <GroupTitle>Partners</GroupTitle>
          <PartnersContainer>
            {partnerList.map(partner => <ParnterBadge key={partner}>{partner}</ParnterBadge>)}
          </PartnersContainer>
        </FooterGroup>

      </FooterGroups>

      {isOpenChatQRcode && <ChatQRcodePopup setIsOpenChatQRcode={setIsOpenChatQRcode} chatQRcodeList={chatQRcodeList} />}
    </FooterContainer>
  );
};

export default Footer;
