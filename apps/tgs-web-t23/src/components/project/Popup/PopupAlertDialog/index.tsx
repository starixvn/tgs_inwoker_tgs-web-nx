import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications } from "@/core/feature/useNotifications";
import DialogPopup from "@/components/UI/Dialog/DialogPopup";
import { ButtonConfirm, DialogContent, DialogTitle } from "@/components/UI/Dialog/dialogStyles";
import { Button } from "@/components/UI/Button";

const AlertContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

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
      <AlertContainer>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{message}</DialogContent>

        <ModalButtons handleClose={closeAlertPopup} message={message} action={action} />
      </AlertContainer>
    </DialogPopup>
  );
};

export default React.memo(PopupAlertDialog);
