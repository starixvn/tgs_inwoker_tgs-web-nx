import { useCallback, useEffect, useState } from "react";
import { FormikValues } from "formik";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuth } from "../useAuth";
import { useAuthDialog } from "../useAuthDialog/hooks/useAuthDialog";
import { useGenerateRegisterFormik } from "./hooks/useGenerateRegisterFormik";
import { usePromotionCode } from "./hooks/usePromotionCode";
import { useConfirmAdult } from "./hooks/useConfirmAdult";
import { UserTypeEnum } from "./types";

export function useRegisterForm() {
  const { registerState, handleRegister, clearRegisterError } = useAuth();
  const { promotionData } = usePromotionCode();
  const { isConfirmedAdult, handleClickConfirmAdult } = useConfirmAdult();
  const { handleToggleRegisterDialog, handleToggleLoginDialog } = useAuthDialog();
  const { isDesktopSize } = useRwd();

  const [otherError, setOtherError] = useState<Error | null>(null);

  // ===== handle click register =====
  const handleClickRegister = useCallback(
    async (values: FormikValues) => {
      if (!isConfirmedAdult) {
        setOtherError(new Error(i18n.t("common.msgRegisterTermAndCondition")));
        return;
      }

      const username = values.username as string;
      const userType = values.userType as UserTypeEnum;
      try {
        await handleRegister({
          username: values.username as string,
          pwd: values.password as string,
          confirmpwd: values.confirmpwd as string,
          upper: userType === UserTypeEnum.PLAYER ? promotionData.upper || "" : "",
          invitationcode: userType === UserTypeEnum.AGENT ? promotionData.promoId : "",
        });

        handleToggleRegisterDialog(false);
        localStorage.setItem("remember", "true");
        localStorage.setItem("username", username);
        handleToggleLoginDialog(true);

        setOtherError(null);
      } catch (error: any) {
        console.error(error);

        setOtherError(error.message);
      }
    },
    [promotionData.promoId, isConfirmedAdult],
  );

  const { formInputConfigList, formik } = useGenerateRegisterFormik({
    handleClickSubmit: handleClickRegister,
  });

  useEffect(() => {
    return () => {
      clearRegisterError();
    };
  }, []);

  return {
    formInputConfigList,
    formik,
    isLoading: registerState.isLoading,
    registerError: registerState.error || otherError,
    isConfirmedAdult,
    handleClickConfirmAdult,
  };
}
