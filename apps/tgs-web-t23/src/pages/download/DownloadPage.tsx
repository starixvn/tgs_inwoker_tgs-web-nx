import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import DownloadApp from "@/core/components/DownloadApp";

const AppDownloadPage = () => {
  useUpdatePageName(i18n.t("main.account.appDownload"));

  return <DownloadApp />;
};

export default AppDownloadPage;
