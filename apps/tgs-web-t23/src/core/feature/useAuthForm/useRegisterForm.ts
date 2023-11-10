import { useCallback, useState } from "react";
import { FormikValues } from "formik";
import { useGenerateRegisterFormik } from "@/core/feature/useAuthForm/hooks/useGenerateRegisterFormik";
import { usePromotionCode } from "@/core/feature/useAuthForm/hooks/usePromotionCode";
import i18n from "@/core/utils/i18n";
import { useConfirmAdult } from "@/core/feature/useAuthForm/hooks/useConfirmAdult";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { useAuth } from "@/core/feature/useAuth";
import { useAuthDialog } from "@/core/feature/useAuthDialog";

export enum UserTypeEnum {
  AGENT = "a",
  PLAYER = "p",
}
export function useRegisterForm() {
  const { registerState, handleRegister } = useAuth();
  const { promotionData } = usePromotionCode();
  const { isConfirmedAdult, handleClickConfirmAdult } = useConfirmAdult();
  const { handleToggleRegisterDialog } = useAuthDialog();
  const { isDesktopSize } = useRwd();

  const [otherError, setOtherError] = useState<Error | null>(null);

  // ===== handle click register =====
  const handleClickRegister = useCallback(
    async (values: FormikValues) => {
      if (!isConfirmedAdult) {
        setOtherError(new Error(i18n.t("common.msgRegisterTermAndCondition")));
        return;
      }

      const userType = values.userType as UserTypeEnum;
      try {
        await handleRegister({
          username: values.username as string,
          pwd: values.password as string,
          confirmpwd: values.confirmpwd as string,
          upper: userType === UserTypeEnum.PLAYER ? promotionData.upper || "" : "",
          invitationcode: userType === UserTypeEnum.AGENT ? promotionData.promoId : "",
        });

        if (isDesktopSize) {
          handleToggleRegisterDialog(false);
        }
        setOtherError(null);
      } catch (error: any) {
        console.error(error);

        setOtherError(error.message);
      }
    },
    [promotionData.promoId, isConfirmedAdult]
  );

  const { formInputConfigList, formik } = useGenerateRegisterFormik({
    handleClickSubmit: handleClickRegister,
  });

  return {
    formInputConfigList,
    formik,
    isLoading: registerState.isLoading,
    registerError: registerState.error || otherError,
    isConfirmedAdult,
    handleClickConfirmAdult,
  };
}
