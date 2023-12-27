import config from "@tgs-web-nx/config";
import gc from "@/assets/t32/images/home/gc.png";
import logo from "@/assets/t32/images/home/logo.png";
import SocialMedia from "@/components/project/SocialMedia";
import AppFlag from "@/pages/home/components/AppFlag";

export const footerCategoriesList = [
  {
    title: "",
    imageUrl: logo,
    text: "",
    alignment: "flex-start",
  },
  {
    title: "Follow Us",
    content: <SocialMedia />,
  },
  {
    title: "Licenses",
    imageUrl: gc,
    text: `${config.brand} Copyright© 2024 ${config.brand} Casino Co.Group\nAll Rights Reserved\nVersion 1.35.01`,
    alignment: "flex-start",
  },
  {
    title: "Download APP",
    content: <AppFlag />,
  }
];
