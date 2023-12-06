import React, { createContext } from "react";
import { usePopupAnnouncementToggle, usePopupPromotionToggle } from "../hooks";

const initialState: {
  needToShowPopupAnnouncement: boolean;
  needToShowPopupPromotion: boolean;
  isOpenAnnouncement: boolean;
  isShowPromotion: boolean;
  handleCloseAnnouncement: () => void;
  handleClosePromotion: () => void;
  handleOpenAnnouncement: () => void;
  handleOpenPromotion: () => void;
} = {
  needToShowPopupAnnouncement: false,
  needToShowPopupPromotion: false,
  isOpenAnnouncement: false,
  isShowPromotion: false,
  handleCloseAnnouncement: () => {},
  handleClosePromotion: () => {},
  handleOpenAnnouncement: () => {},
  handleOpenPromotion: () => {},
};

export const PopupContext = createContext({
  ...initialState,
});

type ProviderProps = {
  children: React.ReactNode;
};

export const PopupContextProvider = ({ children }: ProviderProps) => {
  const {
    needToShowPopupAnnouncement,
    isOpenAnnouncement,
    handleOpenAnnouncement,
    handleCloseAnnouncement,
  } = usePopupAnnouncementToggle();
  const { needToShowPopupPromotion, isShowPromotion, handleOpenPromotion, handleClosePromotion } =
    usePopupPromotionToggle();

  return (
    <PopupContext.Provider
      value={{
        needToShowPopupAnnouncement,
        needToShowPopupPromotion,
        isOpenAnnouncement,
        isShowPromotion,
        handleCloseAnnouncement,
        handleClosePromotion,
        handleOpenAnnouncement,
        handleOpenPromotion,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};
