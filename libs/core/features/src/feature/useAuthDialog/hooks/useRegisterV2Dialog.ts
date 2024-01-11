import { useCallback, useState } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { usePageName } from "../../usePageName/index";

export function useRegisterV2Dialog() {
  const { updatePageName } = usePageName();

  // register V2
  const [isRegisterV2InitPhoneDialogOpen, setIsRegisterV2InitPhoneDialogOpen] = useState(false);
  const [isRegisterV2InitEmailDialogOpen, setIsRegisterV2InitEmailDialogOpen] = useState(false);
  const [isRegisterV2SetRealNameDialogOpen, setIsRegisterV2SetRealNameDialogOpen] = useState(false);

  const handleToggleInitPhoneDialog = useCallback(
    (isOpen?: boolean) => {
      if (typeof isOpen === "undefined") {
        setIsRegisterV2InitPhoneDialogOpen((prevState) => !prevState);
      } else {
        setIsRegisterV2InitPhoneDialogOpen(isOpen);

        if (isOpen) {
          updatePageName(i18n.t("web.register.activation"));
        }
      }
    },
    [updatePageName],
  );

  const handleToggleInitEmailDialog = useCallback(
    (isOpen?: boolean) => {
      if (typeof isOpen === "undefined") {
        setIsRegisterV2InitEmailDialogOpen((prevState) => !prevState);
      } else {
        setIsRegisterV2InitEmailDialogOpen(isOpen);

        if (isOpen) {
          updatePageName(i18n.t("profile.emailVerification"));
        }
      }
    },
    [updatePageName],
  );

  const handleToggleSetRealNameDialog = useCallback(
    (isOpen?: boolean) => {
      if (typeof isOpen === "undefined") {
        setIsRegisterV2SetRealNameDialogOpen((prevState) => !prevState);
      } else {
        setIsRegisterV2SetRealNameDialogOpen(isOpen);

        if (isOpen) {
          updatePageName(i18n.t("profile.nameVerify.verifyName"));
        }
      }
    },
    [updatePageName],
  );

  return {
    isRegisterV2InitEmailDialogOpen,
    isRegisterV2InitPhoneDialogOpen,
    isRegisterV2SetRealNameDialogOpen,
    handleToggleInitEmailDialog,
    handleToggleInitPhoneDialog,
    handleToggleSetRealNameDialog,
  };
}
