import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAccountStore } from "@tgs-web-nx/core";
import Marquee from "./components/Marquee";
import AnonymousHeaderContent from "./components/AnonymousHeaderContent";
import AccountHeaderContent from "./components/AccountHeaderContent";
import OnlineUser from "./components/OnlineUser";
import { theme } from "@/theme";
import BrandLogo from "@/components/project/BrandLogo";

const HeaderRoot = styled.nav`
  border-radius: 6px;
  overflow: hidden;
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
  const {isMobileSize} = useRwd();
  const { account } = useAccountStore();
  const isAuth = account.token === account.info.token;
  

  if(isMobileSize){
    return (
      <HeaderRoot>
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

      </HeaderRoot>
    )
  }

  return null;
};

export default HeaderCard;