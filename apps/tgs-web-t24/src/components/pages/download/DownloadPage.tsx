import React from "react";
import DownloadApp from "@/core/components/DownloadApp";
import i18n from "@/utils/i18n";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

type Props = {};
const AppDownloadPage = (props: Props) => {
  useUpdatePageName(i18n.t("main.account.appDownload"));

  return <DownloadApp />;
};

export default AppDownloadPage;
