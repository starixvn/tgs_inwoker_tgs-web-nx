import { useGeneralStore } from "@tgs-web-nx/core";

export function usePromotion() {
  const { general } = useGeneralStore();

  const {
    promotionList: { items: promotionData },
  } = general;

  const displayPromotionList = promotionData.sort((a, b) => a.order - b.order);

  return {
    displayPromotionList,
  };
}
