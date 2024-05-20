import { useEffect } from "react";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router";
import styled from "styled-components";
import moment from "moment";

const fakeData = {
  items: [
    {
      id: "018f8b81-7302-0000-0001-07e871937e08",
      agentName: "testFE1",
      realName: "test real name",
      registeredTime: "2024-05-18T11:41:07.715302+00:00",
      pt: 10,
      teamSize: 2,
      status: "qwe",
    },
    {
      id: "018f8b81-7302-0000-0001-07e871937333",
      agentName: "testFE2",
      realName: "test real name1",
      registeredTime: "2024-05-18T11:41:07.715302+00:00",
      pt: 10,
      teamSize: 2,
      status: "qwe",
    },
  ],
  totalcount: 21,
};

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

const AgentInfoCard = () => {
  useUpdatePageName(i18n.t("agent.playerList"));
  const history = useHistory();

  const { isDesktopSize } = useRwd();
  useEffect(() => {
    if (isDesktopSize) {
      history.push("/agent");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return fakeData.items.map((player) => {
    const registerData = moment(player.registeredTime).format("YYYY-MM-DD hh:mm a");

    return (
      <CardContainer key={player.id}>
        <PlayerNameContainer>
          <PlayNameTitle>{i18n.t("agent.agentName")}</PlayNameTitle>
          <PlayName>{player.agentName}</PlayName>
        </PlayerNameContainer>
        <PlayerInfoContainer>
          <PlayInfo>
            <PlayerInfoTitle>{i18n.t("common.realName")}</PlayerInfoTitle>
            <PlayerInfoValue>{player.realName}</PlayerInfoValue>
          </PlayInfo>
          <PlayInfo>
            <PlayerInfoTitle>{i18n.t("agent.registeredTime")}</PlayerInfoTitle>
            <PlayerInfoValue>{registerData}</PlayerInfoValue>
          </PlayInfo>
          <PlayInfo>
            <PlayerInfoTitle>{i18n.t("common.P/T")}</PlayerInfoTitle>
            <PlayerInfoValue>{player.pt}</PlayerInfoValue>
          </PlayInfo>
          <PlayInfo>
            <PlayerInfoTitle>{i18n.t("agent.teamSize")}</PlayerInfoTitle>
            <PlayerInfoValue>{player.teamSize}</PlayerInfoValue>
          </PlayInfo>
          <PlayInfo>
            <PlayerInfoTitle>{i18n.t("agent.status")}</PlayerInfoTitle>
            <PlayerInfoValue>{player.status}</PlayerInfoValue>
          </PlayInfo>
        </PlayerInfoContainer>
      </CardContainer>
    );
  });
};

export default AgentInfoCard;
