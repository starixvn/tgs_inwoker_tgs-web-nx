import FavoriteIcon from "@/pages/home/components/TagIcon/FavoriteIcon";
import HotIcon from "@/pages/home/components/TagIcon/HotIcon";
import NewIcon from "@/pages/home/components/TagIcon/NewIcon";
import RecommendIcon from "@/pages/home/components/TagIcon/RecommendIcon";

export type TagIcon = {
  text: string;
  iconComponent: React.FC<{ $color: string }>
};

export const gameTagList: TagIcon[] = [
  {
    text: "Favorite",
    iconComponent: FavoriteIcon,
  },
  {
    text: "Hot",
    iconComponent: HotIcon,
  },
  {
    text: "New",
    iconComponent: NewIcon,
  },
  {
    text: "Recommend",
    iconComponent: RecommendIcon,
  },
];
