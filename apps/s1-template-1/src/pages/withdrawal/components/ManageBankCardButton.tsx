import Icon from "@/components/project/Icon";
import { OrangeGradientButton } from "@/components/UI/Button";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";


type Props = {
  handleManageCardClick: () => void;
};

const ManageBankCardButton = ({ handleManageCardClick }: Props) => {
  const { isDesktopSize } = useRwd();
  return (
    <OrangeGradientButton onClick={handleManageCardClick} style={{height: isDesktopSize ? "4.8rem" : "36px", gap: "1.2rem"}}>     
      {i18n.t("withdrawal.manageBank")}
      <Icon iconUrl="/assets/images/common/icon-plus.svg" width={"18px"} height={"18px"} />
    </OrangeGradientButton>
  );
};

export default ManageBankCardButton;
