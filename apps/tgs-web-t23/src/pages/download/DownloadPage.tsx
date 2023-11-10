import React from "react";
import DownloadApp from "@/core/components/DownloadApp";
import i18n from "@/core/utils/i18n";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

const AppDownloadPage = () => {
  useUpdatePageName(i18n.t("main.account.appDownload"));

  return <DownloadApp />;
};

export default AppDownloadPage;
