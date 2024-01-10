import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useEffect, useState } from "react";
import fb from "@/assets/t29/images/home/social_media/fb.svg";
import ig from "@/assets/t29/images/home/social_media/ig.svg";
import twitter from "@/assets/t29/images/home/social_media/twitter.svg";

export const useSocialMediaIconList = () => {
  const { isCustomizedBrand } = useHomeGameContext();
  const [socialMediaIconList, setSocialMediaIconList] = useState<string[]>([fb, ig]);


  useEffect(() => {
    const socialMediaIconList: string[] = [fb, ig];

    if (!isCustomizedBrand) {
      socialMediaIconList.push(twitter);
    }

    setSocialMediaIconList(socialMediaIconList);
  }, []);

  return socialMediaIconList;
};

export default useSocialMediaIconList;
