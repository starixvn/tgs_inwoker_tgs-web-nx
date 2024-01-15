import { i18n } from "@tgs-web-nx/utils";

export const vipBonusList = [
  {
    key: "Promotion Conditions",
    text: i18n.t("vip.level"),
  },
  {
    key: "Quarterly Bet to Maintain",
    text: i18n.t("vip.levelKeepAccumulateBetAmount"),
  },
  {
    key: "Daily Bet to Level UP",
    text: i18n.t("vip.levelUpAccumulateBetAmount"),
  },
  {
    key: "Daily Deposit to Level UP",
    text: i18n.t("vip.levelUpAccumulateDeposit"),
  },
  {
    key: "Birthday Bonus",
    text: i18n.t("vip.birthBenefit"),
  },
  {
    key: "Level UP Bonus",
    text: i18n.t("vip.promotionBenefit"),
  },
  {
    key: "Quarterly Bonus",
    text: i18n.t("vip.quarterlyBenefit"),
  },
];
// to-do: 之後改寫useVipBonusList做翻譯
