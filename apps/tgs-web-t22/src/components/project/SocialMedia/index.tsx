import styled from "styled-components";
import { useGoToHomePage } from "@tgs-web-nx/core/hooks";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import useSocialMediaIconList from "@/hooks/home/useSocialMediaIconList";

const SocialMediaContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
`;

const SocialMediaIcon = styled.div<{ $imageUrl: string }>`
  width: 70px;
  height: 70px;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-repeat: no-repeat;
  background-size: contain;
  margin-right: 5px;
`;

const SocialMedia = () => {
  const goToHomePage = useGoToHomePage();
  const socialMediaIconList = useSocialMediaIconList();
  const { isCustomizedBrand } = useHomeGameContext();

  return (
    <SocialMediaContainer>
      {socialMediaIconList.map((item) => (
        <SocialMediaIcon
          key={item.icon}
          $imageUrl={item.icon}
          onClick={isCustomizedBrand ? () => { window.open(item.link, "_blank") } : goToHomePage}
        />
      ))}
    </SocialMediaContainer>
  );
};

export default SocialMedia;
