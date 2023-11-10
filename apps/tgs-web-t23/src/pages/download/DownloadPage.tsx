import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import DownloadApp from "@/core/components/DownloadApp";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

const AppDownloadPage = () => {
  useUpdatePageName(i18n.t("main.account.appDownload"));

  return <DownloadApp />;
};

export default AppDownloadPage;
