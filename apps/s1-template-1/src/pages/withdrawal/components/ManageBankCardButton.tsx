import Icon from "@/components/project/Icon";
import { OrangeGradientButton } from "@/components/UI/Button";
import { i18n } from "@tgs-web-nx/utils";


type Props = {
  handleManageCardClick: () => void;
};

const ManageBankCardButton = ({ handleManageCardClick }: Props) => {
  return (
    <OrangeGradientButton onClick={handleManageCardClick} style={{height: "36px", gap: "1.2rem"}}>     
      {i18n.t("withdrawal.manageBank")}
      <Icon iconUrl="/assets/images/common/icon-plus.svg" width={"18px"} height={"18px"} />
    </OrangeGradientButton>
  );
};

export default ManageBankCardButton;
