import { useState } from "react";
import config from "@/config/config";
import { useUiStore } from "@/core/stores/useUiStore";
import { useGeneralStore } from "@/core/stores/useGeneralStore";
import { useAudio } from "@/core/hooks/tools/useAudio";

export function usePopupPromotionToggle() {
  const {
    ui: { mains },
  } = useUiStore();
  const {
    general: { promotionList },
  } = useGeneralStore();
  const { handleCloseAudio } = useAudio();

  const [isShowPromotion, setIsShowPromotion] = useState(false);

  const isInHomePage = mains && mains.length > 0;

  const handleOpenPromotion = () => {
    if (!config.features.PopupPromotion) {
      return;
    }

    if (!isInHomePage || !promotionList.items.length) {
      return;
    }
    if (isShowPromotion) {
      return;
    }

    setIsShowPromotion(true);
  };

  const handleClosePromotion = () => {
    setIsShowPromotion(false);
    handleCloseAudio();
  };

  const needToShowPopupPromotion = config.features.PopupPromotion && promotionList.items.length > 0;

  return {
    isShowPromotion,
    handleOpenPromotion,
    handleClosePromotion,
    needToShowPopupPromotion,
  };
}
