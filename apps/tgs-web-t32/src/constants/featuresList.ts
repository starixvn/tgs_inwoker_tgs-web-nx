import feature1 from "@/assets/t32/images/home/feature1.png";
import feature2 from "@/assets/t32/images/home/feature2.png";
import feature3 from "@/assets/t32/images/home/feature3.png";
import feature4 from "@/assets/t32/images/home/feature4.png";

export type feature = {
  mainTitle: string;
  subTitle: string;
  content: string;
  imgUrl: string;
};

export const featuresList: feature[] = [
  {
    mainTitle: "Prestigious Brand",
    subTitle: "Reputable Brand",
    content: "Ranked by game fairness, site security, and licensing.",
    imgUrl: feature1,
  },
  {
    mainTitle: "Product Diversity",
    subTitle: "More game types",
    content: "Sportsbook, Live Dealer, Slot, Lottery, variety of products you can choose from.",
    imgUrl: feature2,
  },
  {
    mainTitle: "Security and Privacy",
    subTitle: "Payment Method",
    content: "Variety of popular and secured payment method. High limit for deposit and withdrawal.",
    imgUrl: feature3,
  },
  {
    mainTitle: "Fast Transactions",
    subTitle: "Transaction Speed",
    content: "Instant deposit time and withdrawal time within 100seconds.",
    imgUrl: feature4,
  },
]