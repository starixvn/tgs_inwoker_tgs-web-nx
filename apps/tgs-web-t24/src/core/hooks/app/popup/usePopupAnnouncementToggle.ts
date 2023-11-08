import { useEffect, useState } from "react";
import config from "@/config/config";
import { useUiStore } from "@/core/stores/useUiStore";
import { useAudio } from "@/core/hooks/tools/useAudio";

export function usePopupAnnouncementToggle() {
  const {
    ui: { mains: promotionList },
  } = useUiStore();
  const [isOpenAnnouncement, setIsOpenAnnouncement] = useState(false);
  const { handleCloseAudio } = useAudio();

  const isInHomePage = promotionList && promotionList.length > 0;

  useEffect(() => {
    handleOpenAnnouncement();
    // no need dependency: handleOpenAnnouncement
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(promotionList)]);

  const handleOpenAnnouncement = () => {
    if (!config.features.PopupAnnouncement) {
      return;
    }
    if (!isInHomePage) {
      return;
    }

    if (isOpenAnnouncement) return;

    setIsOpenAnnouncement(true);
  };

  const handleCloseAnnouncement = () => {
    setIsOpenAnnouncement(false);
    handleCloseAudio();
  };

  const matchingPath =
    window.location.pathname === "/" || window.location.pathname === "/main/home";

  const needToShowPopupAnnouncement =
    config.features.PopupAnnouncement && promotionList && promotionList.length > 0 && matchingPath;

  return {
    isOpenAnnouncement,
    handleOpenAnnouncement,
    handleCloseAnnouncement,
    needToShowPopupAnnouncement,
  };
}
