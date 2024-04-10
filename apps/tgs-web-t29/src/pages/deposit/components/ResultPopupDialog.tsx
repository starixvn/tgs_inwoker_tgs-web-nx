import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import DialogPopup from "@/components/UI/Dialog/DialogPopup";
import {
  DialogContainer,
  DialogContent,
  TwoButtonWrapper,
} from "@/components/UI/Dialog/dialogStyles";
import { Button } from "@/components/UI/Button";

type Props = {
  isDialogOpen: boolean;
  handleClose: () => void;
  handleOpenPopupUrl: () => void;
};

const ResultPopupDialog = ({ isDialogOpen, handleClose, handleOpenPopupUrl }: Props) => {
  return (
    <DialogPopup open={isDialogOpen} onClose={handleClose}>
      <DialogContainer>
        <DialogContent>{i18n.t("deposit.msgDialog")}</DialogContent>

        <TwoButtonWrapper>
          <Button onClick={handleOpenPopupUrl} style={{ float: "left" }} data-cy="confirm_button">
            {i18n.t("common.confirm")}
          </Button>
          <Button onClick={handleClose} style={{ float: "right" }} data-cy="cancel">
            {i18n.t("common.cancel")}
          </Button>
        </TwoButtonWrapper>
      </DialogContainer>
    </DialogPopup>
  );
};

export default ResultPopupDialog;
