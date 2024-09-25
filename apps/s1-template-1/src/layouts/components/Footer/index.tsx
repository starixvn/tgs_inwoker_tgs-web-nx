import { i18n } from "@tgs-web-nx/utils";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { FooterBottom, FooterContainer, FooterGroup, FooterWrapper, GroupContent, GroupTitle, Link, LinkContent, PaymentMethod, SocialIcons } from "./style";

const Footer = () => {
  const history = useHistory();

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

  const paymentMethod = [
    {
      name: "Dire Pay",
      url: "/assets/images/footer/dire-pay.png",
    },
    {
      name: "True Money",
      url: "/assets/images/footer/true-money.png",
    },
    {
      name: "Game Wallet",
      url: "/assets/images/footer/game-wallet.png",
    },
    {
      name: "Speed Pay",
      url: "/assets/images/footer/speed-pay.png",
    },
    {
      name: "Prompt Pay",
      url: "/assets/images/footer/prompt-pay.png",
    },
    {
      name: "Logo",
      url: "/assets/images/footer/logo.png",
    },
  ];

  return (
    <FooterContainer>
      <FooterWrapper className="main-container">
        <FooterGroup>
          <GroupTitle>{i18n.t("web.footer.paymentMethod")}</GroupTitle>
          <GroupContent className="payment-method-container">
            {paymentMethod.map((social, index) => {
              return (
                <PaymentMethod key={index}>
                  <img src={social.url} width="90" alt={social.name} />
                </PaymentMethod>
              );
            })}
          </GroupContent>
        </FooterGroup>

        <FooterGroup>
          <GroupTitle>{i18n.t("web.footer.support")}</GroupTitle>
          <LinkContent>
            <Link>{i18n.t("web.footer.rulesAndRegulation")}</Link>
            <Link>{i18n.t("web.footer.accountTerms")}</Link>
            <Link onClick={() => navigateTo("faq")}>{i18n.t("web.footer.faq")}</Link>
            <Link>{i18n.t("web.footer.contactUs")}</Link>
          </LinkContent>
        </FooterGroup>
        <FooterGroup>
          <GroupTitle>{i18n.t("web.footer.policies")}</GroupTitle>
          <LinkContent>
            <Link onClick={() => navigateTo("responsiblegaming")}>
              {i18n.t("web.footer.responsibleGaming")}
            </Link>

            <Link onClick={() => navigateTo("terms")}>
              {i18n.t("web.footer.termAndConditions")}
            </Link>
            <Link onClick={() => navigateTo("privacypolicy")}>
              {i18n.t("web.footer.privacyPolicy")}
            </Link>
            <Link>{i18n.t("web.footer.cookiePolicy")}</Link>
          </LinkContent>
        </FooterGroup>
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
      </FooterWrapper>
      <FooterBottom>{i18n.t("web.footer.allrightsreserverd")}</FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
