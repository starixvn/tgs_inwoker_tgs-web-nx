import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useEffect, useState } from "react";
import fb from "@/assets/t29/images/home/social_media/fb.svg";
import ig from "@/assets/t29/images/home/social_media/ig.svg";
import twitter from "@/assets/t29/images/home/social_media/twitter.svg";

type SocialMediaItem = {
  key: string;
  icon: string;
  link: string
};

export const useSocialMediaIconList = () => {
  const { isCustomizedBrand } = useHomeGameContext();
  const [socialMediaIconList, setSocialMediaIconList] = useState<SocialMediaItem[]>([]);

  useEffect(() => {
    const socialMediaIconList: Array<{ key: string; icon: string; link: string; }> = [];

    if (!isCustomizedBrand) {
      socialMediaIconList.push(
        {
          key: "fb",
          icon: fb,
          link: ""
        },
        {
          key: "ig",
          icon: ig,
          link: ""
        },
        {
          key: "twitter",
          icon: twitter,
          link: ""
        }
      );
    }

    if (isCustomizedBrand) {
      socialMediaIconList.push(
        {
          key: "fb",
          icon: fb,
          link: "https://www.facebook.com/momobetvn/"
        },
        {
          key: "ig",
          icon: ig,
          link: "https://www.instagram.com/momobet.vn/"
        }
      );
    }

    setSocialMediaIconList(socialMediaIconList);
  }, [isCustomizedBrand]);

  return socialMediaIconList;
};

export default useSocialMediaIconList;
