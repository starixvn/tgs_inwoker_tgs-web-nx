import { useEffect, useState } from "react";
import fb from "@/assets/t18/images/home/social_media/fb.svg";
import ig from "@/assets/t18/images/home/social_media/ig.svg";
import twitter from "@/assets/t18/images/home/social_media/twitter.svg";

type SocialMediaItem = {
  key: string;
  icon: string;
  link: string;
};

export const useSocialMediaIconList = () => {
  const [socialMediaIconList, setSocialMediaIconList] = useState<SocialMediaItem[]>([]);

  useEffect(() => {
    const socialMediaIconList: { key: string; icon: string; link: string }[] = [];

    socialMediaIconList.push(
      {
        key: "fb",
        icon: fb,
        link: "",
      },
      {
        key: "ig",
        icon: ig,
        link: "",
      },
      {
        key: "twitter",
        icon: twitter,
        link: "",
      },
    );

    setSocialMediaIconList(socialMediaIconList);
  }, []);

  return socialMediaIconList;
};

export default useSocialMediaIconList;
