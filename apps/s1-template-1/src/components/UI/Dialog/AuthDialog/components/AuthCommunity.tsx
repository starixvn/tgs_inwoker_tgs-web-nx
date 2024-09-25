import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.6rem;
  margin-top: 1.2rem;
`;

const Devider = styled.div`
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
  color: ${({ theme }) => theme.authTabColor};
`;

const AuthCommunity = () => {
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
    <>
      <SocialIcons>
        {socialList.map((social) => {
          return <img src={social.url} width={46} height={46} alt={social.name} />;
        })}
      </SocialIcons>
      <Devider>
        <OrText>{i18n.t("common.or")}</OrText>
      </Devider>
    </>
  );
};

export default AuthCommunity;
