import { useAccountStore } from "@tgs-web-nx/core";
import { useAuth } from "@tgs-web-nx/core/features";
import { HightLightMatchDto } from "@tgs-web-nx/types";
import { format, isToday, isTomorrow } from "date-fns";
import { Img } from "react-image";

import { CardHoverBg } from "../GameCard/style";
import PlayIcon from "../PlayIcon";
import { KickOffTimeContainer, LeagueName, LiveIcon, LogoContainer, MatchCardBg, Score, SelectionButton, SelectionContainer, SelectionOdds, SelectionPoint, TeamInfo, TeamName } from "./style";

interface MatchCardProps {
  match: HightLightMatchDto;
}

const MatchCard = ({ match }: MatchCardProps) => {
  const { teamInfo } = match;
  const { account } = useAccountStore();
  const { goToLogin } = useAuth();
  const isLogin = !!account.token;
  const getTime = () => {
    const givenTime = new Date(match.kickOffTime);

    const formatTime = (time: Date) => format(time, "HH:mm");

    return isTomorrow(givenTime)
      ? `Tomorrow ${formatTime(givenTime)}`
      : isToday(givenTime)
      ? `Today ${formatTime(givenTime)}`
      : format(givenTime, "yyyy-MM-dd HH:mm");
  };

  const launchGame = () => {
    if (!isLogin) {
      goToLogin();
    } else {
      window.open(`/joingame/${import.meta.env.VITE_SABA_GAME_PATH}`, import.meta.env.VITE_SABA_GAME_PATH);
    }
  };

  return (
    <MatchCardBg onClick={launchGame}>
      <LeagueName> {match.leagueName}</LeagueName>
      <KickOffTimeContainer>
        {match.isLive ? `${Math.floor(match.gameInfo.seconds / 60)}' ` : getTime()}
        {match.isLive && (
          <>
            {match.gameInfo.isHt ? "1st half" : "2nd half"}
            {/* <LiveIcon>
              <img
                src="/assets/images/highlight-matches/icon-live.gif"
                width={24}
                height={24}
                alt="live"
              />
            </LiveIcon> */}
          </>
        )}
      </KickOffTimeContainer>
      <TeamInfo>
        <LogoContainer>
          <Img
            className="logo"
            src={teamInfo.homeIconUrl}
            alt={teamInfo.homeName}
            unloader={<DefaultLogo isSoccer={true} />}
          />
        </LogoContainer>
        <TeamName>{teamInfo.homeName}</TeamName>
        {match.isLive && <Score>{match.gameInfo.liveHomeScore}</Score>}
      </TeamInfo>

      <TeamInfo>
        <LogoContainer>
          <Img
            className="logo"
            src={teamInfo.awayIconUrl}
            alt={teamInfo.awayName}
            unloader={<DefaultLogo isSoccer={true} />}
          />
        </LogoContainer>
        <TeamName>{teamInfo.awayName}</TeamName>
        {match.isLive && <Score>{match.gameInfo.liveAwayScore}</Score>}
      </TeamInfo>
      <SelectionContainer>
        {(match.markets[0].selections || []).map((s) => {
          const key = s.key;
          return (
            <SelectionButton key={key}>
              <SelectionPoint>{key === "x" ? "Draw" : key}</SelectionPoint>
              <SelectionOdds>{s.oddsPrice.americanPrice}</SelectionOdds>
            </SelectionButton>
          );
        })}
      </SelectionContainer>
      <CardHoverBg>
        <PlayIcon />
      </CardHoverBg>
    </MatchCardBg>
  );
};

const DefaultLogo: React.FC<{ isSoccer: boolean }> = ({ isSoccer }) => {
  return (
    <img
      width={26}
      height={26}
      src={`/assets/images/highlight-matches/${isSoccer ? "soccer-logo" : "basket-ball-logo"}.webp`}
      alt="Logo"
    />
  );
};

export default MatchCard;
