import { HightLightMatchDto } from "@tgs-web-nx/types";
import { format, isTomorrow } from "date-fns";
import styled from "styled-components";

const MatchCardBg = styled.div`
  display: flex;
  width: 400px;
  height: 200px;
  flex-shrink: 0;
  position: relative;
  cursor: pointer;
  border-radius: 1.2rem;
  background: ${({ theme }) => theme.gameCardBackground};
  backdrop-filter: blur(2px);
  vertical-align: top;
  flex-direction: column;
  padding: 2%;
`;

const LeagueName = styled.div`
    width: 100%;
    display: flex;
    position: relative;
    line-height: 16px;
    font-size: 1.4rem;
    font-weight: 700;
    color: ${({ theme }) => theme.white};
    `;

const KickOffTimeContainer = styled.div`
    width: 100%;
    display: flex;
    position: relative;
    line-height: 16px;
    font-size: 1.4rem;
    font-weight: 700;
    color: ${({ theme }) => theme.white};
    `;

const TeamInfo = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    padding: 1%;
    font-size: 1.4rem;
    img{
        width: 25px;
        height: 25px;
        border-radius: 50%;
    }
    `;

const BetTypeName = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    padding: 1%;
    opacity: 0.5;
    font-size: 12px;
    text-align: left;
    `;

const SelectionContainer = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    padding: 1%;
    font-size: 1.4rem;
    text-align: center;
    `;

const SelectionButton = styled.div`
  display: flex;
  width: 30%;
  height: 40px;
  border-radius: 1.2rem;
  border-color: #3a4142;
  background-color: #3a4142;
  text-align: center;
  align-items: center;
  padding-inline: 5%;
`;

const SelectionOdds = styled.div`
  width: 100%;
  padding: 1%;
  font-size: 1.4rem;
  text-align: right;
`;

const SelectionPoint = styled.div`
  width: 100%;
  padding: 1%;
  font-size: 1.4rem;
  text-align: left;
`;

interface MatchCardProps {
  match: HightLightMatchDto;
}

const MatchCard = ({ match }: MatchCardProps) => {
  const { teamInfo} = match;
  const getTime = () => {
    const givenTime = new Date(match.kickOffTime);

    const formatTime = (time: Date) => format(time, 'HH:mm');

    return isTomorrow(givenTime)
      ? `Tomorrow ${formatTime(givenTime)}`
      : format(givenTime, 'yyyy-MM-dd HH:mm');
  }
  return (
    <MatchCardBg>
        <LeagueName> {match.leagueName}</LeagueName>
        {/* leagueICon match.LeagueIconUrl */}
        <KickOffTimeContainer> {getTime()}</KickOffTimeContainer>
        <TeamInfo>
            <img src={teamInfo.homeIconUrl} alt={teamInfo.homeName} />
            <span>{teamInfo.homeName}</span>
        </TeamInfo>
        <TeamInfo>
            <img src={teamInfo.awayIconUrl} alt={teamInfo.awayName} />
            <span>{teamInfo.awayName}</span>
        </TeamInfo>
        <BetTypeName>{match.markets[0].betTypeName}</BetTypeName>
        <SelectionContainer>
        {(match.markets[0].selections || []).map(s => (
          <SelectionButton key={s.key}>
            <SelectionPoint>{s.key}</SelectionPoint>
            <SelectionOdds>{s.oddsPrice.americanPrice}</SelectionOdds>
          </SelectionButton>
          ))}
          </SelectionContainer>

    </MatchCardBg>
  );
};

export default MatchCard;
