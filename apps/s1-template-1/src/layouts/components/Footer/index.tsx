import { SocialIconList } from "@/constants/socialMedia";
import { i18n } from "@tgs-web-nx/utils";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  FooterBottom,
  FooterContainer,
  FooterGroup,
  FooterWrapper,
  GroupContent,
  GroupTitle,
  Link,
  LinkContent,
  PaymentMethod,
  SocialIcons,
} from "./style";

const Footer = () => {
  const history = useHistory();

  const navigateTo = (pageName: string) => {
    history.push("/" + pageName);
    window.scroll({ top: 0, behavior: "smooth" });
  };

  const paymentMethod = [
    {
      name: "Dire Pay",
      url: "/assets/images/footer/dire-pay.webp",
    },
    {
      name: "True Money",
      url: "/assets/images/footer/true-money.webp",
    },
    {
      name: "Game Wallet",
      url: "/assets/images/footer/game-wallet.webp",
    },
    {
      name: "Speed Pay",
      url: "/assets/images/footer/speed-pay.webp",
    },
    {
      name: "Prompt Pay",
      url: "/assets/images/footer/prompt-pay.webp",
    },
    {
      name: "Logo",
      url: "/assets/images/footer/logo.webp",
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
              {SocialIconList.map((social, index) => {
                return (
                  <img
                    className="icon"
                    key={index}
                    src={social.url}
                    width={36}
                    height={36}
                    alt={social.name}
                  />
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
