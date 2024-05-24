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
      userName: "testFE1",
      type: "agent",
      totalOrders: 100,
      validBet: 200,
      aWinLoss: 400,
      aSpecial: 500,
      aProfit: 200,
      pWinLoss: 400,
      pSpecial: 600,
      pProfit: 800,
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
  justify-content: center;
`;

const PlayInfo = styled.div`
  width: 150px;
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
  align-items: center;
  flex-direction: column;
  gap: 3px;
`;

const InfoTextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  line-height: 1.5;
`;

const InfoText = styled.div`
  display: flex;
  justify-content: start;
  min-width: 80px;
`;

const InfoAmount = styled(InfoText)`
  min-width: 30px;
  justify-content: end;
  align-items: end;
`;

const PlayerSpecialTitle = styled(PlayName)`
  margin: 10px 0;
`;

const ReportCard = () => {
  const history = useHistory();
  const { isDesktopSize } = useRwd();

  
  if (isDesktopSize) {
    history.push("/agent");
  }

  return fakeData.items.map((player) => {
    return (
      <CardContainer key={player.id}>
        <PlayerNameContainer>
          {/* Todo:判斷是player還是agent */}
          <PlayNameTitle>{i18n.t("usertype.agent")}</PlayNameTitle>
          <PlayName>{player.userName}</PlayName>
        </PlayerNameContainer>
        <PlayerInfoContainer>
          <PlayInfo>
            <PlayerInfoTitle>{i18n.t("usertype.agent")}</PlayerInfoTitle>
            <PlayerInfoValue>
              <InfoTextContainer>
                <InfoText>{i18n.t("report.winloss")}</InfoText>
                <InfoAmount>41</InfoAmount>
              </InfoTextContainer>
              <InfoTextContainer>
                <InfoText>特別</InfoText>
                <InfoAmount>33</InfoAmount>
              </InfoTextContainer>
              <InfoTextContainer>
                <InfoText>盈虧</InfoText>
                <InfoAmount>16</InfoAmount>
              </InfoTextContainer>
            </PlayerInfoValue>
          </PlayInfo>
          <PlayInfo>
            <PlayerInfoTitle>{i18n.t("usertype.player")}</PlayerInfoTitle>
            <PlayerInfoValue>
              <InfoTextContainer>
                <InfoText>訂單數</InfoText>
                <InfoAmount>312313</InfoAmount>
              </InfoTextContainer>
              <InfoTextContainer>
                <InfoText>{i18n.t("report.rebate.validBet")}</InfoText>
                <InfoAmount>16</InfoAmount>
              </InfoTextContainer>
              <InfoTextContainer>
                <InfoText>{i18n.t("report.winloss")}</InfoText>
                <InfoAmount>3</InfoAmount>
              </InfoTextContainer>
              <InfoTextContainer>
                <InfoText>特別</InfoText>
                <InfoAmount>33</InfoAmount>
              </InfoTextContainer>
              <InfoTextContainer>
                <InfoText>盈虧</InfoText>
                <InfoAmount>16</InfoAmount>
              </InfoTextContainer>
            </PlayerInfoValue>
          </PlayInfo>
        </PlayerInfoContainer>

        <PlayerSpecialTitle>玩家特别</PlayerSpecialTitle>
        <PlayerInfoContainer>
          <PlayInfo>
            <PlayerInfoValue>
              <InfoTextContainer>
                <InfoText>紅利</InfoText>
                <InfoAmount>10</InfoAmount>
              </InfoTextContainer>
              <InfoTextContainer>
                <InfoText>調帳</InfoText>
                <InfoAmount>41</InfoAmount>
              </InfoTextContainer>
              <InfoTextContainer>
                <InfoText>總計</InfoText>
                <InfoAmount>10</InfoAmount>
              </InfoTextContainer>
            </PlayerInfoValue>
          </PlayInfo>
          <PlayInfo>
            <PlayerInfoValue>
              <InfoTextContainer>
                <InfoText>{i18n.t("agent.platformFee")}</InfoText>
                <InfoAmount>123</InfoAmount>
              </InfoTextContainer>
              <InfoTextContainer>
                <InfoText>{i18n.t("agent.productCharges")}</InfoText>
                <InfoAmount>122111313</InfoAmount>
              </InfoTextContainer>
            </PlayerInfoValue>
          </PlayInfo>
        </PlayerInfoContainer>
      </CardContainer>
    );
  });
};

export default ReportCard;
