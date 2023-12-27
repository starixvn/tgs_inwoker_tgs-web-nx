import styled from "styled-components";
import { useGoToHomePage, useRwd } from "@tgs-web-nx/core/hooks";
import { mobileSocialMediaIconList, desktopSocialMediaIconList } from "@/constants/socialMedia";

const SocialMediaContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  gap: 12px;
`;

const SocialMediaIcon = styled.div<{ $imageUrl: string, $width: string, $height: string }>`
 width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-repeat: no-repeat;
  background-size: contain;
`;

const SocialMedia = () => {
  const goToHomePage = useGoToHomePage();
  const { isMobileSize, isDesktopSize } = useRwd();

  return (
    <SocialMediaContainer onClick={goToHomePage}>
      {isMobileSize && mobileSocialMediaIconList.map((item: string) => (
        <SocialMediaIcon key={item} $imageUrl={item} $width="30px" $height="30px" />
      ))}
      {isDesktopSize && desktopSocialMediaIconList.map((item: string) => (
        <SocialMediaIcon key={item} $imageUrl={item} $width="60px" $height="60px" />
      ))}
    </SocialMediaContainer>
  );
};

export default SocialMedia;
