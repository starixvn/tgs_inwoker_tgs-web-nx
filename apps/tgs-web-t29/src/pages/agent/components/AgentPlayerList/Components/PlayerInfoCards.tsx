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
      playerName: "testFE1",
      currentLevel: 1,
      registeredTime: "2024-05-18T11:41:07.715302+00:00",
      latestLogin: "2024-05-18T11:41:07.715302+00:00",
      totalDeposit: 200,
      totalVaildBet: 400,
      status: "qwe",
    },
    {
      id: "018f8b81-7302-0000-0001-07e871937e33",
      playerName: "testFE2",
      currentLevel: 2,
      registeredTime: "2024-05-18T11:41:07.715302+00:00",
      latestLogin: "2024-05-18T11:41:07.715302+00:00",
      totalDeposit: 200,
      totalVaildBet: 400,
      status: "qwe",
    },
    {
      id: "018f8b81-7302-0000-0002-07e871937e34",
      playerName: "playerA",
      currentLevel: 3,
      registeredTime: "2024-05-19T10:35:15.123456+00:00",
      latestLogin: "2024-05-20T14:22:47.654321+00:00",
      totalDeposit: 500,
      totalVaildBet: 1000,
      status: "active",
    },
    {
      id: "018f8b81-7302-0000-0003-07e871937e35",
      playerName: "playerB",
      currentLevel: 1,
      registeredTime: "2024-05-20T09:25:30.987654+00:00",
      latestLogin: "2024-05-21T13:15:12.345678+00:00",
      totalDeposit: 100,
      totalVaildBet: 150,
      status: "inactive",
    },
    {
      id: "018f8b81-7302-0000-0004-07e871937e36",
      playerName: "playerC",
      currentLevel: 4,
      registeredTime: "2024-05-17T08:45:25.234567+00:00",
      latestLogin: "2024-05-22T16:40:58.876543+00:00",
      totalDeposit: 800,
      totalVaildBet: 1200,
      status: "active",
    },
    {
      id: "018f8b81-7302-0000-0005-07e871937e37",
      playerName: "playerD",
      currentLevel: 2,
      registeredTime: "2024-05-21T12:15:45.345678+00:00",
      latestLogin: "2024-05-21T12:15:45.345678+00:00",
      totalDeposit: 300,
      totalVaildBet: 450,
      status: "suspended",
    },
    {
      id: "018f8b81-7302-0000-0006-07e871937e38",
      playerName: "playerE",
      currentLevel: 5,
      registeredTime: "2024-05-16T11:00:00.111111+00:00",
      latestLogin: "2024-05-22T17:30:30.222222+00:00",
      totalDeposit: 1000,
      totalVaildBet: 2000,
      status: "active",
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
  justify-content: center;
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

const PlayerInfoCards = () => {
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
    const latestLoginData = moment(player.latestLogin).format("YYYY-MM-DD hh:mm a");

    return (
      <CardContainer key={player.id}>
        <PlayerNameContainer>
          <PlayNameTitle>玩家用户名</PlayNameTitle>
          <PlayName>{player.playerName}</PlayName>
        </PlayerNameContainer>
        <PlayerInfoContainer>
          <PlayInfo>
            <PlayerInfoTitle>{i18n.t("agent.vipLevel")}</PlayerInfoTitle>
            <PlayerInfoValue>{player.currentLevel}</PlayerInfoValue>
          </PlayInfo>
          <PlayInfo>
            <PlayerInfoTitle>{i18n.t("agent.registeredTime")}</PlayerInfoTitle>
            <PlayerInfoValue>{registerData}</PlayerInfoValue>
          </PlayInfo>
          <PlayInfo>
            <PlayerInfoTitle>{i18n.t("agent.latestLogin")}</PlayerInfoTitle>
            <PlayerInfoValue>{latestLoginData}</PlayerInfoValue>
          </PlayInfo>
          <PlayInfo>
            <PlayerInfoTitle>{i18n.t("vip.totalDeposit")}</PlayerInfoTitle>
            <PlayerInfoValue>{player.totalDeposit}</PlayerInfoValue>
          </PlayInfo>
          <PlayInfo>
            <PlayerInfoTitle>{i18n.t("vip.totalVaildBet")}</PlayerInfoTitle>
            <PlayerInfoValue>{player.totalVaildBet}</PlayerInfoValue>
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

export default PlayerInfoCards;
