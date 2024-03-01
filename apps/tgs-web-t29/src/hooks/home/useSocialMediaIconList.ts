import { useEffect, useState } from "react";
import config, { mapBrandName, brandConfig} from "@tgs-web-nx/config";
import fb from "@/assets/t29/images/home/social_media/fb.svg";
import ig from "@/assets/t29/images/home/social_media/ig.svg";
import twitter from "@/assets/t29/images/home/social_media/twitter.svg";

type SocialMediaItem = {
  key: string;
  icon: string;
  link: string
};

export const useSocialMediaIconList = () => {
  const [socialMediaIconList, setSocialMediaIconList] = useState<SocialMediaItem[]>([]);
  const socialMediaLink = brandConfig[mapBrandName(config.brand)].socialMediaLink;

  useEffect(() => {
    const socialMediaIconList: SocialMediaItem[] = [
      {
        key: "fb",
        icon: fb,
        link: socialMediaLink["fb"],
      },
      {
        key: "ig",
        icon: ig,
        link: socialMediaLink["ig"],
      },
      {
        key: "twitter",
        icon: twitter,
        link: socialMediaLink["twitter"],
      }
    ];

    setSocialMediaIconList(socialMediaIconList);
  }, []);

  return socialMediaIconList;
};

export default useSocialMediaIconList;
