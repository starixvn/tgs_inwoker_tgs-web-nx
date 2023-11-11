import { Promotion } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import { NOT_SHOW_JOIN_BUTTON_KEY_LIST } from "@/constants/promotion";

export interface PromotionDetail {
  contentToDisplay: string;
  termsToDisplay: string;
  showJoinButton: boolean;
}

export function usePromotionData(promotionData: Promotion): PromotionDetail {
  useUpdatePageName(i18n.t("common.promotion"));

  const isLocalizationHasData =
    promotionData?.localization && Object.keys(promotionData?.localization).length > 0;

  const contentToDisplay =
    (isLocalizationHasData && promotionData?.localization?.[i18n.language]?.content) ||
    promotionData?.content ||
    "";

  const termsToDisplay =
    (isLocalizationHasData && promotionData?.localization?.[i18n.language]?.terms) ||
    promotionData?.terms ||
    "";

  const targetPromotionType = promotionData?.promotionType?.toUpperCase?.() || "";
  const showJoinButton = !NOT_SHOW_JOIN_BUTTON_KEY_LIST.includes(targetPromotionType);

  return {
    contentToDisplay,
    termsToDisplay,
    showJoinButton,
  };
}

// 使用示例
// const {
//   promotionData,
//   contentToDisplay,
//   termsToDisplay,
//   showJoinButton,
// } = usePromotionData();
