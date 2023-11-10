import { Promotion } from "@tgs-web-nx/types";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import i18n from "@/utils/i18n";
import { useGeneralStore } from "@/core/stores/useGeneralStore";
import { NOT_SHOW_JOIN_BUTTON_KEY_LIST } from "@/constants/promotion";

export interface PromotionDetail {
  promotionData: Promotion | undefined;
  contentToDisplay: string;
  termsToDisplay: string;
  showJoinButton: boolean;
}

export function usePromotionDetailPage(): PromotionDetail {
  useUpdatePageName(i18n.t("common.promotion"));
  const {
    general: {
      promotionList: { items = [] as Promotion[] },
    },
  } = useGeneralStore();

  const targetPromotionId = window.location.pathname.split("/")[2] || ""; // 确保有默认值

  const promotionData = items.find((item) => item.id === targetPromotionId);

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
    promotionData,
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
// } = usePromotionDetailPage();
