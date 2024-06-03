import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import { useHistory } from "react-router";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { WinLossReportDto, WinLossReportItem } from "@tgs-web-nx/types";
import { CardContainer, PlayerNameContainer, PlayNameTitle, PlayName, PlayerInfoContainer, PlayInfo, PlayerInfoTitle, PlayerInfoValue, InfoTextContainer, InfoText, InfoAmount, HintIconWrapper, NoData } from "./styled";
import HintIcon from "@/assets/t29/images/agent/hint.svg";
import LoadingBlock from "@/components/project/LoadingBlock";

type Props = {
  report: {
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<WinLossReportDto, Error>>;
    items: WinLossReportItem[] | undefined;
    hasData: boolean | undefined;
    isFetching: boolean;
  },
  handleOnClickUsername: (username: string, memberType?: string) => void,
  handleGetPlayerDetail: (username: string) => void,
}

const ReportCard = ({
  report,
  handleGetPlayerDetail,
  handleOnClickUsername
}: Props) => {
  const history = useHistory();
  const { isDesktopSize } = useRwd();

  
  if (isDesktopSize) { 
    history.push("/agent");
  }

  if (report.isFetching) {
    return <LoadingBlock size={30}/>
  }

  if (!report.isFetching && !report.hasData) {
    return <NoData>{i18n.t("common.nodata")}</NoData>
  }

  return report.items && report.items.map((player) => {
    const playNameTitle = player.memberType === 'agent' ? i18n.t("usertype.agent") : i18n.t("usertype.player");

    return (
      <CardContainer key={player.id}>
        <PlayerNameContainer>
          <PlayNameTitle>{playNameTitle}</PlayNameTitle>
          <PlayName 
            onClick={() => handleOnClickUsername(player.username, player.memberType)}
            $isActive={player.memberType === 'agent'}
          >
            {player.username}
          </PlayName>
        </PlayerNameContainer>
        <PlayerInfoContainer>
          <PlayInfo>
            <PlayerInfoTitle>{i18n.t("usertype.agent")}</PlayerInfoTitle>
            <PlayerInfoValue>
              <InfoTextContainer>
                <InfoText>{i18n.t("agent.winLoss")}</InfoText>
                <InfoAmount>{player.agentWinLoss}</InfoAmount>
              </InfoTextContainer>
              <InfoTextContainer>
                <InfoText>{i18n.t("agent.special")}</InfoText>
                <InfoAmount>{player.agentSpecial}</InfoAmount>
              </InfoTextContainer>
              <InfoTextContainer>
                <InfoText>{i18n.t("agent.pL")}</InfoText>
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
              <InfoTextContainer 
                $isActive
                onClick={() => {
                  handleGetPlayerDetail(player.username)
              }}
              >
                <HintIconWrapper>
                  <img src={HintIcon} alt="hint" />
                  <InfoText>{i18n.t("agent.special")}</InfoText>
                </HintIconWrapper>
                <InfoAmount>{player.special}</InfoAmount>
              </InfoTextContainer>
              <InfoTextContainer>
                <InfoText>{i18n.t("agent.pL")}</InfoText>
                <InfoAmount>{player.winLoss - player.special}</InfoAmount>
              </InfoTextContainer>
            </PlayerInfoValue>
          </PlayInfo>
        </PlayerInfoContainer>

      </CardContainer>
    );
  });
};

export default ReportCard;
