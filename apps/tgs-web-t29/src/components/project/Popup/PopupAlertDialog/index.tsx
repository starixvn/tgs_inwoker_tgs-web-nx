import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications } from "@tgs-web-nx/core/features";
import DialogPopup from "@/components/UI/Dialog/DialogPopup";
import { DialogContainer, DialogContent, DialogTitle } from "@/components/UI/Dialog/dialogStyles";
import { Button } from "@/components/UI/Button";

type ModalButtonsProps = {
  handleClose: () => void;
  message: string;
  action: string;
};

const ModalButtons = ({ handleClose, message, action }: ModalButtonsProps) => {
  if (message === "无法连接，请检查您的网络") {
    return (
      <Button fullWidth onClick={() => window.location.reload()}>
        <>{i18n.t("common.reload")}</>
      </Button>
    );
  } else {
    return (
      <div>
        <Button fullWidth onClick={handleClose}>
          <>{i18n.t("common.confirm")}</>
        </Button>

        {action && <div onClick={handleClose}>{action}</div>}
      </div>
    );
  }
};

const PopupAlertDialog = () => {
  const { isOpen, title, message, action, closeAlertPopup } = useNotifications();

  return (
    <DialogPopup open={isOpen} onClose={closeAlertPopup}>
      <DialogContainer>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{message}</DialogContent>

        <ModalButtons handleClose={closeAlertPopup} message={message} action={action} />
      </DialogContainer>
    </DialogPopup>
  );
};

export default React.memo(PopupAlertDialog);
