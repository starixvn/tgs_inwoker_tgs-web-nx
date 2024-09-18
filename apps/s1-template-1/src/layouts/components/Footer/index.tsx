import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import config from "@tgs-web-nx/config";
import { useGeneralStore } from "@tgs-web-nx/core";
import { i18n } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const FooterContainer = styled.div`
  background: ${({ theme }) => theme.footerBackground};
`;

const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  padding: 2rem 0.8rem;

  ${media.md} {
    padding-top: 6rem;
    padding-bottom: 6rem;
    flex-direction: row;
  }

  ${media.lg} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    padding-left: 0;
    padding-right: 0;
    margin: 0 auto;
  }
`;

const FooterBottom = styled.div`
  background-color: ${({ theme }) => theme.footerBottomBg};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.md} {
    align-items: flex-start;
    width: 25%;
  }
`;

const GroupTitle = styled.h6`
  position: relative;
  display: flex;
  margin-bottom: 1rem;
  color: #d5dde9;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 24px;

  &:after {
    content: "";
    position: absolute;
    bottom: -0.4rem;
    height: 0.2rem;
    width: 4.1rem;
    background-color: #e2fe26;
    left: 50%;
    transform: translateX(-50%);
    ${media.md} {
      left: unset;
      transform: none;
    }
  }
`;

const GroupContent = styled.div`
  gap: 1.2rem;
  font-size: 1.3rem;
  line-height: 2.4rem;
  font-weight: 500;
  margin: 1.2rem 0 0.8rem;
  color: ${({ theme }) => theme.footerColor};
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-top: 0.4rem;
`;

const LinkContent = styled(GroupContent)`
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2.4rem;
`;

const FooterLogo = styled.div`
  margin-bottom: 0.8rem;
  display: flex;
  justify-content: center;
`;

const GamCareTitle = styled.div`
  display: flex;
  margin-bottom: 2.4rem;
  gap: 1.6rem;
  ${media.md} {
    margin-bottom: 0;
  }
`;

const GameCareText = styled.div`
  text-align: left;
  font-size: 1.3rem;
  color: #97a2b0;
  padding-right: 2rem;
  margin-top: 1rem;
  line-height: 2.4rem;
  display: none;

  ${media.md} {
    display: block;
  }
`;

// const LogoImg = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: scale-down;
// `;

const Link = styled.div`
  width: 100%;
  cursor: pointer;
  margin-bottom: 0.8rem;
  text-align: center;
  ${media.md} {
    text-align: left;
  }

  &:hover {
    color: ${({ theme }) => theme.linkColor};
  }
`;

const Footer = () => {
  const { general } = useGeneralStore();
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
      <FooterWrapper>
        <FooterGroup>
          <GroupTitle>{i18n.t("web.footer.community")}</GroupTitle>
          <GroupContent>
            <SocialIcons>
              {socialList.map((social, index) => {
                return (
                  <img key={index} src={social.url} width={36} height={36} alt={social.name} />
                );
              })}
            </SocialIcons>
          </GroupContent>
        </FooterGroup>
        <FooterGroup>
          <GroupTitle>{i18n.t("web.footer.support")}</GroupTitle>
          <LinkContent>
            <Link onClick={() => navigateTo("faq")}>{i18n.t("T13.quickLink.faq")}</Link>
            <Link onClick={() => navigateTo("terms")}>{i18n.t("web.footer.aboutus")}</Link>
            <Link onClick={() => navigateTo("responsiblegaming")}>
              {i18n.t("web.footer.livesupport")}
            </Link>
          </LinkContent>
        </FooterGroup>
        <FooterGroup>
          <GroupTitle>{i18n.t("web.footer.policies")}</GroupTitle>
          <LinkContent>
            <Link onClick={() => navigateTo("privacypolicy")}>
              {i18n.t("T13.quickLink.privacy")}
            </Link>
            <Link onClick={() => navigateTo("terms")}>{i18n.t("T13.quickLink.tnc")}</Link>
            <Link onClick={() => navigateTo("responsiblegaming")}>
              {i18n.t("T13.quickLink.reponsible")}
            </Link>
          </LinkContent>
        </FooterGroup>
        <FooterGroup>
          <GamCareTitle>
            <img
              src="/assets/images/footer/icon-18plus.svg"
              alt="18plus"
              width={32}
              height={32}
            ></img>
            <img
              src="/assets/images/footer/icon-gamcare.svg"
              alt="gamcare"
              width={125}
              height={31}
            ></img>
          </GamCareTitle>
          <GameCareText>{i18n.t("web.footer.websitedescription")}</GameCareText>
        </FooterGroup>
      </FooterWrapper>
      <FooterBottom>
        <GroupContent>
          {/* <LogoImg src={general.brand && general.brand.loadingUrl} alt={`${brand}`} /> */}
          <FooterLogo>
            <img src="/assets/images/common/logo.svg" width={82} height={22} alt="Twitter" />
          </FooterLogo>
          © 2024, S1.com | {i18n.t("web.footer.allrightsreserverd")}
        </GroupContent>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
