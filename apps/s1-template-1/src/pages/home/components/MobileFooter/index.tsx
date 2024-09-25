import config from "@tgs-web-nx/config";
import { useGeneralStore } from "@tgs-web-nx/core";
import styled from "styled-components";
import { useHistory } from "react-router";
import SocialMedia from "@/components/project/SocialMedia";
import android from "@/assets/t28/images/home/android.svg";
import ios from "@/assets/t28/images/home/ios.svg";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px 0;
`;

const FooterGroup = styled.div`
  min-width: 28%;
`;

const GroupTitle = styled.h6`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 20px;
`;

const GroupContent = styled.div`
  font-size: 0.875rem;
  line-height: 1.025rem;
  font-weight: 400;
  margin-bottom: 10px;
`;

const LogoWrapper = styled.div`
  width: 200px;
  height: 90px;
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: scale-down;
`;

const DownLoadText = styled.div`
  font-size: 20px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0em;
  margin: 20px 0;
  padding: 5px 0;
`;

const AppWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const WinnerCard = () => {
  const history = useHistory();
  const { general } = useGeneralStore();
  const brand = import.meta.env.VITE_BRAND;

  return (
    <Wrapper>
      <SocialMedia />
      <FooterGroup>
        <GroupTitle>Gaming License</GroupTitle>
        <GroupContent>
          <LogoWrapper
            onClick={() => {
              history.push("/");
            }}
          >
            <LogoImg src={general.brand && general.brand.loadingUrl} alt={`${brand}`} />
          </LogoWrapper>
        </GroupContent>
        <DownLoadText>Download App</DownLoadText>
        <AppWrapper>
          <img src={android} alt="android" />
          <img src={ios} alt="ios" />
        </AppWrapper>
      </FooterGroup>
    </Wrapper>
  );
};

export default WinnerCard;
