import { useEffect } from "react";
import { PlayerStatus, useAgentPage, useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import { useHistory } from "react-router";
import styled from "styled-components";
import moment from "moment";
import { AgentListInfoDto } from "@tgs-web-nx/types";
import LoadingBlock from "@/components/project/LoadingBlock";

const CardContainer = styled.div`
  padding: 10px;
  border: ${({ theme }) => `1px solid ${theme.blue40}`};
  margin-bottom: 20px;
`;

const PlayerNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
`;

const PlayNameTitle = styled.div`
  background: ${({ theme }) => theme.blue30};
  color: ${({ theme }) => theme.white};
  width: 120px;
  padding: 6px 10px;
  gap: 10px;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.1px;
`;

const PlayName = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
  color: ${({ theme }) => theme.blue30};
`;

const PlayerInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const PlayInfo = styled.div`
  width: 100px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  gap: 18px;
`;

const PlayerInfoTitle = styled.div`
  height: 48px;
  background: ${({ theme }) => theme.blue20};
  font-size: 14px;
  font-weight: 400;
  line-height: 16.1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayerInfoValue = styled.div`
  display: flex;
  justify-content: center;
`;

type PropsType = {
  AgentInfo: AgentListInfoDto | undefined;
  feching: boolean;
};

const AgentInfoCards = (props: PropsType) => {
  const { AgentInfo, feching } = props;

  const history = useHistory();
  const { getStatusTranslation } = useAgentPage();
  const { isDesktopSize } = useRwd();

  useEffect(() => {
    if (isDesktopSize) {
      history.push("/agent");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return feching ? (
    <LoadingBlock size={30} />
  ) : (
    AgentInfo?.data.items
      .filter((player) => player.agentStatus !== PlayerStatus.REGISTERING)
      .map((agent, index) => {
        const registerData = moment(agent.registeredOn).format("YYYY-MM-DD hh:mm a");
        return (
          <CardContainer key={index}>
            <PlayerNameContainer>
              <PlayNameTitle>{i18n.t("usertype.agent")}</PlayNameTitle>
              <PlayName>{agent.agentUsername}</PlayName>
            </PlayerNameContainer>
            <PlayerInfoContainer>
              <PlayInfo>
                <PlayerInfoTitle>{i18n.t("common.realName")}</PlayerInfoTitle>
                <PlayerInfoValue>{agent.realName}</PlayerInfoValue>
              </PlayInfo>
              <PlayInfo>
                <PlayerInfoTitle>{i18n.t("agent.registeredTime")}</PlayerInfoTitle>
                <PlayerInfoValue>{registerData}</PlayerInfoValue>
              </PlayInfo>
              <PlayInfo>
                <PlayerInfoTitle>{i18n.t("agent.profitShareP/T")}</PlayerInfoTitle>
                <PlayerInfoValue>{agent.agentDividendPercentage}</PlayerInfoValue>
              </PlayInfo>
              <PlayInfo>
                <PlayerInfoTitle>{i18n.t("agent.teamSize")}</PlayerInfoTitle>
                <PlayerInfoValue>{agent.directPlayerWithAgentCount}</PlayerInfoValue>
              </PlayInfo>
              <PlayInfo>
                <PlayerInfoTitle>{i18n.t("agent.status")}</PlayerInfoTitle>
                <PlayerInfoValue>{getStatusTranslation(agent.agentStatus)}</PlayerInfoValue>
              </PlayInfo>
            </PlayerInfoContainer>
          </CardContainer>
        );
      })
  );
};

export default AgentInfoCards;
