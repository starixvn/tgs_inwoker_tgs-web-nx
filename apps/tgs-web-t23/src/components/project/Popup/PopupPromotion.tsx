import { useRwd } from "@tgs-web-nx/core/hooks";
import DesktopPopupPromotion from "@/components/project/Popup/DesktopPopupPromotion";
import MobilePopupPromotion from "@/components/project/Popup/MobilePopupPromotion";

const PopupPromotion = () => {
  const { isDesktopSize } = useRwd();
  if (isDesktopSize) return <DesktopPopupPromotion />;
  return <MobilePopupPromotion />;
};

export default PopupPromotion;
