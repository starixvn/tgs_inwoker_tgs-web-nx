import { useEffect } from "react";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router";
import AgentInfo from "./index";
import { PageContainer } from "@/components/styled-component/PageContainer";

const AgentPage = () => {
  useUpdatePageName(i18n.t("agent.agentInfo"));
  const history = useHistory();

  const { isDesktopSize } = useRwd();
  useEffect(() => {
    if (isDesktopSize) {
      history.push("/agent");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer>
      <AgentInfo />
    </PageContainer>
  );
};

export default AgentPage;
