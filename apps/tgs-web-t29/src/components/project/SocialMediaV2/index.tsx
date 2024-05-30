import styled from "styled-components";
import { useEffect, useState } from "react";
import { UiService } from "@tgs-web-nx/core";
import { SocialMediaInfo } from "@tgs-web-nx/types";
import { useSocialMedia } from "@tgs-web-nx/core/hooks";
import LoadingBlock from "../LoadingBlock";

const SocialMediaContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  padding: 10px;
  justify-content: center;
`;

interface Props {
  style?: React.CSSProperties;
}

const SocialMediaV2 = ({ style }: Props) => {
  const [socialMediaList, setSocialMediaList] = useState<SocialMediaInfo[]>([]);
  const { GetSocialMediaList } = UiService;
  const { getSocialMediaIcon } = useSocialMedia();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchSocialMediaList = async () => {
      const result = await GetSocialMediaList();
      setLoading(false);
      if (result.IsSuccess) {
        setSocialMediaList(result.data);
      }
    };

    fetchSocialMediaList();
  }, [GetSocialMediaList]);

  return loading ? (
    <LoadingBlock size={30} />
  ) : (
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
