import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { WalletService } from "@tgs-web-nx/core";
import { useCallback, useState } from "react";
import { i18n } from "@tgs-web-nx/utils";

export function useRewardPage() {
  useUpdatePageName(i18n.t("common.Milestone"));

  return {};
}
