import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import DownloadApp from "@/components/account/DownloadApp";
import { DownloadPageContainer } from "@/components/styled-component/PageContainer";
import AccountPaper from "@/components/project/AccountPaper";
import iconDownload from "@/assets/t19/images/account/navItemWhite/icon-download.svg";

const AppDownloadPage = () => {
  useUpdatePageName(i18n.t("download.title"));

  return (
    <DownloadPageContainer>
      <AccountPaper pageName={i18n.t("common.download")} iconUrl={iconDownload}>
        <DownloadApp />
      </AccountPaper>
    </DownloadPageContainer>
  );
};

export default AppDownloadPage;
