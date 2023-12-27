import { useGeneralStore } from "@tgs-web-nx/core";

export const useBaner = () => {
  const { general } = useGeneralStore();
  const hasActiveDesktopBanner = () => {
    return general.banner.some((baner) => baner.desktopurl !== null && baner.desktopurl !== "");
  };
  const hasActiveMobileBanner = () => {
    return general.banner.some((baner) => baner.mobileurl !== null && baner.mobileurl !== "");
  };
  return {
    hasActiveDesktopBanner,
    hasActiveMobileBanner,
  };
};

export default useBaner;
