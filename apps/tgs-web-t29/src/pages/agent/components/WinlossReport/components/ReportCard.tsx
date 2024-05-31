import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import { useHistory } from "react-router";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { WinLossReportDto, WinLossReportItem } from "@tgs-web-nx/types";
import { CardContainer, PlayerNameContainer, PlayNameTitle, PlayName, PlayerInfoContainer, PlayInfo, PlayerInfoTitle, PlayerInfoValue, InfoTextContainer, InfoText, InfoAmount, PlayerSpecialTitle } from "./styled";



type Props = {
  report: {
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<WinLossReportDto, Error>>;
    items: WinLossReportItem[] | undefined;
    hasData: boolean | undefined;
    isFetching: boolean;
  },
  handleOnClickUsername: (username: string, memberType?: string) => void
}

const ReportCard = ({
  report,
  handleOnClickUsername
}: Props) => {
  const history = useHistory();
  const { isDesktopSize } = useRwd();

  
  if (isDesktopSize) { 
    history.push("/agent");
  }

  return report.items && report.items.map((player) => {
    return (
      <CardContainer key={player.id}>
        <PlayerNameContainer>
          {/* Todo:判斷是player還是agent */}
          <PlayNameTitle>{i18n.t("usertype.agent")}</PlayNameTitle>
          <PlayName onClick={() => handleOnClickUsername(player.username, player.memberType)}>{player.username}</PlayName>
        </PlayerNameContainer>
        <PlayerInfoContainer>
          <PlayInfo>
            <PlayerInfoTitle>{i18n.t("usertype.agent")}</PlayerInfoTitle>
            <PlayerInfoValue>
              <InfoTextContainer>
                <InfoText>{i18n.t("agent.agentWinLoss")}</InfoText>
                <InfoAmount>{player.agentWinLoss}</InfoAmount>
              </InfoTextContainer>
              <InfoTextContainer>
                <InfoText>{i18n.t("agent.agentSpecial")}</InfoText>
                <InfoAmount>{player.agentSpecial}</InfoAmount>
              </InfoTextContainer>
              <InfoTextContainer>
                <InfoText>{i18n.t("agent.agentPL")}</InfoText>
                <InfoAmount>{player.agentTotal}</InfoAmount>
              </InfoTextContainer>
            </PlayerInfoValue>
          </PlayInfo>
          <PlayInfo>
            <PlayerInfoTitle>{i18n.t("usertype.player")}</PlayerInfoTitle>
            <PlayerInfoValue>
              <InfoTextContainer>
                <InfoText>{i18n.t("agent.totalOrders")}</InfoText>
                <InfoAmount>{player.roundCount}</InfoAmount>
              </InfoTextContainer>
              <InfoTextContainer>
                <InfoText>{i18n.t("agent.validBet")}</InfoText>
                <InfoAmount>{player.turnover}</InfoAmount>
              </InfoTextContainer>
              <InfoTextContainer>
                <InfoText>{i18n.t("agent.winLoss")}</InfoText>
                <InfoAmount>{player.winLoss}</InfoAmount>
              </InfoTextContainer>
              <InfoTextContainer>
                <InfoText>{i18n.t("agent.special")}</InfoText>
                <InfoAmount>{player.special}</InfoAmount>
              </InfoTextContainer>
              <InfoTextContainer>
                <InfoText>{i18n.t("agent.pL")}</InfoText>
                <InfoAmount>{player.winLoss - player.special}</InfoAmount>
              </InfoTextContainer>
            </PlayerInfoValue>
          </PlayInfo>
        </PlayerInfoContainer>

        <PlayerSpecialTitle>{i18n.t("agent.playerSpecial")}</PlayerSpecialTitle>
        <PlayerInfoContainer>
          <PlayInfo>
            <PlayerInfoValue>
              <InfoTextContainer>
                <InfoText>{i18n.t("agent.bonus")}</InfoText>
                <InfoAmount>10</InfoAmount>
              </InfoTextContainer>
              <InfoTextContainer>
                <InfoText>{i18n.t("agent.adjust")}</InfoText>
                <InfoAmount>41</InfoAmount>
              </InfoTextContainer>
              <InfoTextContainer>
                <InfoText>{i18n.t("agent.total")}</InfoText>
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
