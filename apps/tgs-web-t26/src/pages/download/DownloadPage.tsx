import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import DownloadApp from "@/components/account/DownloadApp";
import { DownloadPageContainer } from "@/components/styled-component/PageContainer";
import iconDownload from "@/assets/t26/images/account/navItemWhite/icon-download.svg";
import PageBadge from "@/components/project/AccountPaper/components/PageBadge";

const AppDownloadPage = () => {
  useUpdatePageName(i18n.t("download.title"));
  const { isDesktopSize } = useRwd();

  return (
    <DownloadPageContainer>
      {isDesktopSize && <PageBadge iconUrl={iconDownload} text={i18n.t("common.download")} />}
      <DownloadApp />
    </DownloadPageContainer>
  );
};

export default AppDownloadPage;
