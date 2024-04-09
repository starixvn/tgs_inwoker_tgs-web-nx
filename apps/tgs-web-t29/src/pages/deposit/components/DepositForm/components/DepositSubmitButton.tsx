import { i18n } from "@tgs-web-nx/utils";
import { SubmitButton } from "@/components/styled-component/ProfileForms";

type Props = {
  handleOnSubmit: () => void;
  isDisabled: boolean;
}

/**
 * 存款表單送出按鈕
 */
export const DepositSubmitButton = ({
  handleOnSubmit,
  isDisabled
}: Props) => {

  return (
    <SubmitButton
      data-cy="deposit_submit_button"
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
