import styled from "styled-components";
import {useSocialMediaList} from './constant';

const SocialMediaContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 5px;
`;

const SocialMediaIcon = styled.a<{ $imageUrl: string }>`
  width: 38px;
  aspect-ratio: 1;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-repeat: no-repeat;
  background-size: contain;
`;

const SocialMedia = () => {
  const socialMediaList = useSocialMediaList();
  return (
    <SocialMediaContainer>
      {socialMediaList.map((row, i) => {
        const hasSocialMedia = row.link !== undefined;
        if(hasSocialMedia) return (
          <SocialMediaIcon key={i} $imageUrl={row.icon} target="_blank" href={row.link} />
        );

        return null;
      })}
    </SocialMediaContainer>
  );
};

export default SocialMedia;
