import styled from "styled-components";
import { useGoToHomePage } from "@tgs-web-nx/core/hooks";
import useSocialMediaIconList from "@/hooks/home/useSocialMediaIconList";

const SocialMediaContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
`;

const SocialMediaIcon = styled.div<{ $imageUrl: string }>`
  width: 38px;
  height: 38px;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-repeat: no-repeat;
  background-size: contain;
  margin-right: 5px;
`;

const SocialMedia = () => {
  const goToHomePage = useGoToHomePage();
  const socialMediaIconList = useSocialMediaIconList();

  return (
    <SocialMediaContainer onClick={goToHomePage}>
      {socialMediaIconList.map((item: string) => (
        <SocialMediaIcon key={item} $imageUrl={item} />
      ))}
    </SocialMediaContainer>
  );
};

export default SocialMedia;
