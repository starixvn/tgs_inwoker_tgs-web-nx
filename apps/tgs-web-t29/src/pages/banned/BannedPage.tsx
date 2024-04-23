import styled from "styled-components";
import { useAccountStore, useGeneralStore } from "@tgs-web-nx/core";
import { useContactCS } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import { media } from "@/theme/breakpoints";

const BannedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const BannedBg = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(${import.meta.env.BASE_URL}assets/images/banned/banned_bg.webp);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  ${media.sm} {
    width: 100%;
    height: 740px;
    background-image: url(${import.meta.env.BASE_URL}assets/images/banned/banned_desktop_bg.webp);
  }
`;

const TextContainer = styled.div`
  position: absolute;
  top: 10%;
  right: 0;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  color: white;
  padding: 20px;
  ${media.sm} {
    top: 30%;
    right: 10%;
  }
`;

const SupportText = styled.span`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const BannedPage = () => {
  const { account } = useAccountStore();
  const { general } = useGeneralStore();
  const { handleContactCs } = useContactCS();

  const GetSupportUrl = (userid: string, name: string, question: string, email: string) => {
    const newURL = general.livechat
      ? general.livechat.setting.url
          .replace("{name}", name)
          .replace("{lang}", i18n.language)
          .replace("{email}", email || "")
      : "";

    if (newURL.length) {
      handleContactCs();
    } else {
      // Handle the case where newURL is empty
    }
  };

  const handleCSClick = () => {
    if (account.token == null) {
      GetSupportUrl("", "", "", "");
    } else {
      GetSupportUrl("", account.info.member_username, "", account.info.member_email || "");
    }
  };
  return (
    <BannedContainer>
      <BannedBg>
        <TextContainer>
          <span>Your account has been locked, please contact with </span>
          <SupportText onClick={handleCSClick}>customer service.</SupportText>
        </TextContainer>
      </BannedBg>
    </BannedContainer>
  );
};

export default BannedPage;
