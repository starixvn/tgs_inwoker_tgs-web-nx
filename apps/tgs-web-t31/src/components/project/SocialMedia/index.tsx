import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { socialMediaIconList } from "@/constants/socialMedia";

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
  margin: 3px;
`;

const SocialMedia = () => {
  const history = useHistory();
  const { handleChangeGameType } = useHomeGameContext();

  const navigateToHomePage = () => {
    handleChangeGameType(GameTypeEnum.NONE);
    history.push("/");
  };

  return (
    <SocialMediaContainer onClick={navigateToHomePage}>
      {socialMediaIconList.map((item: string) => (
        <SocialMediaIcon key={item} $imageUrl={item} />
      ))}
    </SocialMediaContainer>
  );
};

export default SocialMedia;
