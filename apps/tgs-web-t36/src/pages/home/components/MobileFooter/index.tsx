import config from "@tgs-web-nx/config";
import { useGeneralStore } from "@tgs-web-nx/core";
import styled from "styled-components";
import { useHistory } from "react-router";
import android from "@/assets/t36/images/home/android.svg";
import ios from "@/assets/t36/images/home/ios.svg";
import SocialMediaV2 from "@/components/project/SocialMediaV2";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 15px;
  background: #26304c;
`;

const FooterGroup = styled.div`
  min-width: 28%;
`;

const GroupTitle = styled.h6`
  font-size: 18px;
  font-weight: 700;
  line-height: 14px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.white};
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

const AppWrapper = styled.div`
  display: flex;
  gap: 12px;
  & > img {
    width: 130px;
    height: 65px;
  }
`;

const WinnerCard = () => {
  const history = useHistory();
  const { general } = useGeneralStore();
  const brand = config.brand;

  return (
    <Wrapper>
      <GroupTitle>Follow Us</GroupTitle>
      <SocialMediaV2 style={{ padding: "0px", justifyContent: "start" }} />
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
        <GroupTitle>Download App</GroupTitle>
        <AppWrapper>
          <img src={android} alt="android" />
          <img src={ios} alt="ios" />
        </AppWrapper>
      </FooterGroup>
    </Wrapper>
  );
};

export default WinnerCard;
