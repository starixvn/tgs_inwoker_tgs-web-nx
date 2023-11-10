import React, { useCallback, useEffect, useState } from "react";
import config from "@tgs-web-nx/config";
import DepositPopupAnnouncement from "@/pages/deposit/components/components/DepositNotificationDialog/DepositPopupAnnouncement";
import { useUiStore } from "@/core/stores/useUiStore";

const DepositNotificationDialog = () => {
  const { ui } = useUiStore();
  const [isDialogOpen, setIsDialogOpen] = useState(config.features.DepositNotification);

  const hasDepositNotification =
    config.features.DepositNotification && ui.deposits && ui.deposits.length;

  useEffect(() => {
    if (hasDepositNotification) {
      setIsDialogOpen(true);
    }
  }, [JSON.stringify(ui.deposits), hasDepositNotification]);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  if (!hasDepositNotification) {
    return null;
  }

  const row = ui.deposits[0];
  const text =
    row.localization !== null && row.localization.content ? row.localization.content : row.content;
  const header =
    row.localization !== null && row.localization.subject ? row.localization.subject : row.subject;

  return (
    <DepositPopupAnnouncement
      open={isDialogOpen}
      onClose={closeDialog}
      text={text}
      header={header}
    />
  );
};

export default DepositNotificationDialog;
