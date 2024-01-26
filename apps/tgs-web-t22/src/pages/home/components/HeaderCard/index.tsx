import styled from "styled-components";
import { useAccountStore } from "@tgs-web-nx/core";
import Marquee from "./components/Marquee";
import AnonymousHeaderContent from "./components/AnonymousHeaderContent";
import AccountHeaderContent from "./components/AccountHeaderContent";
import OnlineUser from "./components/OnlineUser";
import { theme } from "@/theme";
import BrandLogo from "@/components/project/BrandLogo";

const Root = styled.div`
  border-radius: 6px;
  background: ${({ theme }) => theme.navMenuBackground};
`;

const Wrapper = styled.div`
  padding: 4px 0;
  display: flex;
  background: ${({ theme }) => theme.headerBg} center no-repeat;
  background-size: cover;
`;

const AuthWrapper = styled.div`
  padding: 12px;
  display: flex;
`;



const HeaderCard = () => {
  const { account } = useAccountStore();
  const isAuth = account.token === account.info.token;

  return (
    <Root>
      <Wrapper>
        <OnlineUser color={theme.white} />
        <Marquee />
      </Wrapper>

      <AuthWrapper>
        <BrandLogo
            style={{ maxWidth: "105px", margin: "0 auto 0 0" }}
        />
        {isAuth ? <AccountHeaderContent/> : <AnonymousHeaderContent />}
      </AuthWrapper>

    </Root>
  )
};

export default HeaderCard;
