import { SocialMediaEnum } from "@tgs-web-nx/types";
import fb from "@/assets/t29/images/home/social_media/fb.svg";
import ig from "@/assets/t29/images/home/social_media/ig.svg";
import x from "@/assets/t29/images/home/social_media/x.svg";
import threads from "@/assets/t29/images/home/social_media/threads.svg";
import tiktok from "@/assets/t29/images/home/social_media/tiktok.svg";
import telegram from "@/assets/t29/images/home/social_media/telegram.svg";

export const useSocialMedia = () => {
  const getSocialMediaIcon = (type: SocialMediaEnum) => {
    switch (type) {
      case SocialMediaEnum.Facebook:
        return fb;
      case SocialMediaEnum.X:
        return x;
      case SocialMediaEnum.Instagram:
        return ig;
      case SocialMediaEnum.Threads:
        return threads;
      case SocialMediaEnum.Tiktok:
        return tiktok;
      case SocialMediaEnum.Telegram:
        return telegram;
      default:
        break;
    }
  };
  return { getSocialMediaIcon };
};
