import config, {brandConfig, mapBrandName} from '@tgs-web-nx/config';
import fb from "@/assets/t36/images/home/social_media/fb.svg";
import ig from "@/assets/t36/images/home/social_media/ig.svg";
import twitter from "@/assets/t36/images/home/social_media/twitter.svg";
import mail from "@/assets/t36/images/home/social_media/mail.svg";
import talk from "@/assets/t36/images/home/social_media/talk.svg";
import telegram from "@/assets/t36/images/home/social_media/telegram.svg";
import wechat from "@/assets/t36/images/home/social_media/wechat.svg";
import whatsapp from "@/assets/t36/images/home/social_media/whatapp.svg";


const socialMediaLink = brandConfig[mapBrandName(config.brand)].socialMediaLink;
export const socialMediaList = [
  {
    icon: fb,
    link: socialMediaLink && socialMediaLink['fb']
  },
  {
    icon: ig,
    link: socialMediaLink && socialMediaLink['ig'],
  },
  {
    icon: twitter,
    link: socialMediaLink && socialMediaLink['twitter'],
  },
  {
    icon: wechat,
    link: socialMediaLink && socialMediaLink['wechat'],
  },
  {
    icon: whatsapp,
    link: socialMediaLink && socialMediaLink['whatsapp'],
  },
  {
    icon: talk,
    link: socialMediaLink && socialMediaLink['whatsapp'],
  },
  {
    icon: mail,
    link: socialMediaLink && socialMediaLink['whatsapp'],
  },
  {
    icon: telegram,
    link: socialMediaLink && socialMediaLink['telegram'],
  }
]

