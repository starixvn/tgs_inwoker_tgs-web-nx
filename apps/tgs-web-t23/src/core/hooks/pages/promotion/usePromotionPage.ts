import { Promotion } from "@tgs-web-nx/types";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import i18n from "@/core/utils/i18n";
import { useGeneralStore } from "@/core/stores/useGeneralStore";

export function usePromotionPage() {
  useUpdatePageName(i18n.t("common.promotion"));

  const {
    general: {
      promotionList: { items = [] as Promotion[] },
    },
  } = useGeneralStore();

  const isEmpty = items.length === 0;

  return {
    promotionList: items,
    isEmpty,
  };
}
