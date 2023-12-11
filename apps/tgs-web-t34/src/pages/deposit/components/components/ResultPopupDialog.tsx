import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import DialogPopup from "@/components/UI/Dialog/DialogPopup";
import { DialogContent } from "@/components/UI/Dialog/dialogStyles";
import { Button } from "@/components/UI/Button";

type Props = {
  isDialogOpen: boolean;
  handleClose: () => void;
  handleOpenPopupUrl: () => void;
};

const ResultPopupDialog = ({ isDialogOpen, handleClose, handleOpenPopupUrl }: Props) => {
  return (
    <DialogPopup open={isDialogOpen} onClose={handleClose}>
      <>
        <DialogContent>{i18n.t("deposit.msgDialog")}</DialogContent>

        <Button onClick={handleOpenPopupUrl} style={{ float: "left" }}>
          {i18n.t("common.confirm")}
        </Button>
        <Button onClick={handleClose} style={{ float: "right" }}>
          {i18n.t("common.cancel")}
        </Button>
      </>
    </DialogPopup>
  );
};

export default ResultPopupDialog;
