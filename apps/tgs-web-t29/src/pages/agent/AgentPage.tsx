import React, { useEffect, useState } from "react";
import { useAgentPage } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import Loading from "@/components/UI/Loading";
import { PageContainer } from "@/components/styled-component/PageContainer";
import AccountPaper from "@/components/project/AccountPaper";
import iconAgent from "@/assets/t29/images/account/navItem/icon-agent.svg";

const AgentPage = () => {
  const {  loading } = useAgentPage();

  if (loading) return <Loading show={true} />;

  return (
    <PageContainer>
      <AccountPaper pageName={i18n.t("usertype.agent")} iconUrl={iconAgent}>
        <div>test</div>
      </AccountPaper>
    </PageContainer>
  );
};

export default AgentPage;
