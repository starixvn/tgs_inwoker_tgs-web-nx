import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import DownloadApp from "@/components/account/DownloadApp";
import { DownloadPageContainer } from "@/components/styled-component/PageContainer";
import UserWalletInfo from "@/components/project/UserWalletInfo";

const AppDownloadPage = () => {
  useUpdatePageName(i18n.t("download.title"));
  const { isDesktopSize } = useRwd();
  return (
    <DownloadPageContainer>
      {isDesktopSize && <UserWalletInfo />}
      <DownloadApp />
    </DownloadPageContainer>
  );
};

export default AppDownloadPage;
