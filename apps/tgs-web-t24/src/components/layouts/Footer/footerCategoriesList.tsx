
import gc from "@/assets/t23/images/home/gc.png";
import logo from "@/assets/t23/images/home/logo.png";
import PartnerTags from "@/components/pages/home/components/PartnerTags";
import SocialMedia from "@/components/project/SocialMedia";

export const footerCategoriesList = [
  {
    title: "Pega Gaming: A Winning Casino",
    size: "big",
    imageUrl: logo,
    text: "Pega Gaming is the leading destination for all online casino players who are looking for a touch of class and elegance in their gaming environment. Our casino provides you with over 400 online casino games – some traditional with modern twists, and some completely new, innovative, and exotic. With irresistible weekly bonus promotions and attractive loyalty and VIP programs, we're sure you'll be sticking around for a while to come. All of our software is developed and maintained by the industry's foremost online gaming software company, Pegasus. Because of this, we are able to offer you the newest cutting-edge games, of the highest quality and ultimate security in a sophisticated, yet engaging atmosphere.",
    alignment: "center",
  },
  {
    title: "Gaming License",
    size: null,
    imageUrl: gc,
    text: "PGG Copyright© 2020 PGG Casino Co.Group\nAll Rights Reserved\nVersion 1.35.01",
    alignment: "flex-start",
  },
  {
    title: "Follow Us",
    size: null,
    content: <SocialMedia />,
  },
  {
    title: "Partners",
    size: null,
    content: <PartnerTags />,
  },
]