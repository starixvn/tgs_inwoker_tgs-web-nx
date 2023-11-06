import favorite from "@/assets/t23/images/home/favorite.svg";
import hot from "@/assets/t23/images/home/hot.svg";
import newIcon from "@/assets/t23/images/home/new.svg";
import recommend from "@/assets/t23/images/home/recommend.svg";

type TagIcon = {
  text: string;
  iconUrl: string;
};

export const gameTagList: TagIcon[] = [
  {
    text: "Favorite",
    iconUrl: favorite,
  },
  {
    text: "Hot",
    iconUrl: hot,
  },
  {
    text: "New",
    iconUrl: newIcon,
  },
  {
    text: "Recommend",
    iconUrl: recommend,
  },
];
