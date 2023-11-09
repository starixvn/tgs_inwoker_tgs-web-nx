import DesktopPopupPromotion from "@/components/project/Popup/DesktopPopupPromotion";
import MobilePopupPromotion from "@/components/project/Popup/MobilePopupPromotion";
import { useRwd } from "@/core/hooks/tools/useRwd";

const PopupPromotion = () => {
  const { isDesktopSize } = useRwd();
  if (isDesktopSize) return <DesktopPopupPromotion />;
  return <MobilePopupPromotion />;
};

export default PopupPromotion;
