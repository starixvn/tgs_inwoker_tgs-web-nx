import styled from "styled-components";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useSocialMedia } from "./hooks/useSocialMedia";

const SocialMediaContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  padding: 10px;
  justify-content: center;
  flex-wrap: wrap;
`;

interface Props {
  style?: React.CSSProperties;
}

const SocialMediaV2 = ({ style }: Props) => {
  const { getSocialMediaIcon } = useSocialMedia();
  const {
    general: { socialMediaList },
  } = useGeneralStore();
  return (
    <SocialMediaContainer style={style}>
      {socialMediaList.map((socialMedia) => {
        return (
          <img
            width={38}
            height={38}
            src={getSocialMediaIcon(socialMedia.type)}
            key={socialMedia.id}
            alt={socialMedia.name}
            onClick={() => {
              window.open(socialMedia.url);
            }}
          />
        );
      })}
    </SocialMediaContainer>
  );
};

export default SocialMediaV2;
