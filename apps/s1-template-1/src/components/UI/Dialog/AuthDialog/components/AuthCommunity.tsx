import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.6rem;
  margin-top: 1.2rem;

  .icon {
    background-color: ${({ theme }) => theme.authSocialIconBackground};
    border-radius: 1rem;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  height: 1.6rem;
  margin-top: 1.2rem;

  &:before {
    content: "";
    position: absolute;
    left: 2.4rem;
    right: 2.4rem;
    top: 50%;
    height: 0.1rem;
    background-color: ${({ theme }) => theme.dialogLineBackground};
    z-index: -1;
  }
`;

const OrText = styled.span`
  display: flex;
  padding: 1rem;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.dialogBackground};
  color: ${({ theme }) => theme.authOrTextColor};
`;

const AuthCommunity = () => {
  const socialList = [
    {
      name: "Facebook",
      url: "/assets/images/community/facebook.webp",
    },
    {
      name: "Google",
      url: "/assets/images/community/google.webp",
    },
    {
      name: "Telegram",
      url: "/assets/images/community/telegram.webp",
    },
  ];

  return (
    <>
      <SocialIcons>
        {socialList.map((social, index) => {
          return (
            <img
              className="icon"
              key={index}
              src={social.url}
              width={46}
              height={46}
              alt={social.name}
            />
          );
        })}
      </SocialIcons>
      <Divider>
        <OrText>{i18n.t("common.or")}</OrText>
      </Divider>
    </>
  );
};

export default AuthCommunity;
