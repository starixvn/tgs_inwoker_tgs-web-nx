import { useEffect, useState } from "react";
import config from "@tgs-web-nx/config";
import { useGeneralStore, useUiStore } from "@tgs-web-nx/core";
import { useAudio } from "@tgs-web-nx/core/hooks";

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
  useEffect(() => {
    handleOpenPromotion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(promotionList)]);
  const handleOpenPromotion = () => {
    if (!config.features.PopupPromotion) {
      return;
    }

    if ( !promotionList.items.length) {
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
