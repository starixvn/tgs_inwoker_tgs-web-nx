import { Promotion } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useUpdatePageName } from "@tgs-web-nx/core/features";

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
