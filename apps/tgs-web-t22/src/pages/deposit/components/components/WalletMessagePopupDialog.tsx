import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { i18n } from "@tgs-web-nx/utils";
import { useWalletStore, WALLET_HIDEMESSAGE } from "@tgs-web-nx/core";
import DialogPopup from "@/components/UI/Dialog/DialogPopup";
import { DialogContent, DialogTitle } from "@/components/UI/Dialog/dialogStyles";
import { Button } from "@/components/UI/Button";

const WalletMessagePopupDialog = () => {
  const { wallet } = useWalletStore();
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch({
      type: WALLET_HIDEMESSAGE,
    });
  }, []);

  const isOpen = wallet.message !== "";
  return (
    <DialogPopup open={isOpen} onClose={handleClose}>
      <DialogContent>
        <DialogTitle>{i18n.t("common.info")}</DialogTitle>
        <DialogContent>{wallet.message}</DialogContent>

        <Button fullWidth onClick={handleClose}>
          {i18n.t("common.confirm")}
        </Button>
      </DialogContent>
    </DialogPopup>
  );
};

export default React.memo(WalletMessagePopupDialog);
