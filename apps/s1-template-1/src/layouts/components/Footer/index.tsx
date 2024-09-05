import { media } from "@/theme/breakpoints";
import config from "@tgs-web-nx/config";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useProvider } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const FooterContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.footerBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 3rem;

  ${media.sm} {
    flex-direction: row;
  }
`;

const FooterGroup = styled.div`
  min-width: 28%;
`;

const GroupTitle = styled.h6`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 1.4rem;
  color: #d5dde9;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 24px;
  text-transform: uppercase;

  &:after {
    content: "";
    position: absolute;
    bottom: -0.4rem;
    height: 0.2rem;
    width: 4.1rem;
    background-color: #e2fe26;
  }
`;

const GroupContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  font-size: 1.3rem;
  line-height: 2.4rem;
  font-weight: 500;
  margin-bottom: 2.4rem;
  color: ${({ theme }) => theme.footerColor};
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.6rem;
  margin-top: 2.2rem;
  margin-bottom: 2.4rem;
`;

const LinkContent = styled(GroupContent)`
  flex-direction: column;
  gap: 0.8rem;
`;

// const LogoImg = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: scale-down;
// `;

const Link = styled.div`
  width: max-content;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.linkColor};
  }
`;

const Footer = () => {
  const { general } = useGeneralStore();
  const { providerList } = useProvider();
  const history = useHistory();
  const brand = config.brand;

  const navigateTo = (pageName: string) => {
    history.push("/" + pageName);
    window.scroll({ top: 0, behavior: "smooth" });
  };

  const socialList = [
    {
      name: "Facebook",
      url: "/assets/images/community/facebook.png",
    },
    {
      name: "Telegram",
      url: "/assets/images/community/telegram.png",
    },
    {
      name: "Google",
      url: "/assets/images/community/google.png",
    },
    {
      name: "Twitter",
      url: "/assets/images/community/twitter.png",
    },
  ];

  return (
    <FooterContainer>
      <FooterGroup>
        <GroupTitle>COMMUNITY</GroupTitle>
        <SocialIcons>
          {socialList.map((social) => {
            return <img src={social.url} width={36} height={36} alt={social.name} />;
          })}
        </SocialIcons>
        <GroupContent>
          {/* <LogoImg src={general.brand && general.brand.loadingUrl} alt={`${brand}`} /> */}
          <img src="/assets/images/common/logo.svg" width={44} height={29} alt="Twitter" />
          © 2024, S1.com <br /> All Rights Reserved.
        </GroupContent>
      </FooterGroup>

      <FooterGroup>
        <GroupTitle>ABOUT US</GroupTitle>
        <LinkContent>
          <Link onClick={() => navigateTo("faq")}>{i18n.t("T13.quickLink.faq")}</Link>
          <Link onClick={() => navigateTo("terms")}>{i18n.t("T13.quickLink.tnc")}</Link>
          <Link onClick={() => navigateTo("responsiblegaming")}>
            {i18n.t("T13.quickLink.reponsible")}
          </Link>
          <Link onClick={() => navigateTo("privacypolicy")}>{i18n.t("T13.quickLink.privacy")}</Link>
        </LinkContent>
      </FooterGroup>
    </FooterContainer>
  );
};

export default Footer;
