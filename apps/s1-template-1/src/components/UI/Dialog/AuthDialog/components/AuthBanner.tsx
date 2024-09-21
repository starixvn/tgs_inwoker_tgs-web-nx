import { media } from "@tgs-web-nx/constants";
import styled from "styled-components";

const BannerContainer = styled.div`
  display: none;

  ${media.sm} {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const AuthBanner = () => {
  return (
    <BannerContainer>
      <img src="/assets/images/auth/login-banner.png" alt="Login Banner" width={325} height={548} />
    </BannerContainer>
  );
};
export default AuthBanner;
