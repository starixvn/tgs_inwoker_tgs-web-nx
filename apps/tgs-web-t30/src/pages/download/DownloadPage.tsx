import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import DownloadApp from "@/components/account/DownloadApp";
import { PageContainer } from "@/components/styled-component/PageContainer";

const AppDownloadPage = () => {
  useUpdatePageName(i18n.t("download.title"));

  return (
    <PageContainer>
      <DownloadApp />;
    </PageContainer>
  );
};

export default AppDownloadPage;
