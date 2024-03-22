import { i18n, Common } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import { useContext } from "react";
import { DepositFormContext } from "../components";
import { SubmitButton } from "@/components/styled-component/ProfileForms";

type Props = {
  handleOnSubmit: () => void;
  isManual?: boolean;
}

/**
 * 存款表單送出按鈕
 */
export const DepositSubmitButton = ({
  handleOnSubmit,
  isManual,
}: Props) => {
  const {formData} = useContext(DepositFormContext);
  const isDefaultDisabled = Common.validateDepositAndWithdrawAmount(formData.amount, formData.maxAmount, formData.minAmount);
  const isManualDisabled = config.features.Deposit_UploadRequired ? isDefaultDisabled || formData.files === null : isDefaultDisabled;
  const isDisabled = isManual ? isManualDisabled : isDefaultDisabled;

  return (
    <SubmitButton
      onClick={handleOnSubmit}
      variant="contained"
      color="primary"
      fullWidth
      disabled={isDisabled}
    >
        {i18n.t("common.submit")}
    </SubmitButton>
  )
}
