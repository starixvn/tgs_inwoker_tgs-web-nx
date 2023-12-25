import styled from "styled-components";
import { GameTypeItem, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import { useGoToHomePage } from "@tgs-web-nx/core/hooks";
import { media } from "@/theme/breakpoints";
import emphasizedLine from "@/assets/t33/images/home/emphasized-line.svg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0px;
  gap: 6px;
  align-self: stretch;
  padding: 0px 20px;
`;

const Title = styled.div`
  color: ${(props) => props.theme.primary};
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 14px;

  ${media.sm} {
    font-size: 1.5625rem;
  }
`;

const Content = styled.div`
  color: ${(props) => props.theme.white};
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;

  & > ol {
    list-style-position: inside; /* Ensure list items are left-aligned */

    ${media.sm} {
      font-weight: 400;
    }
  }
`;

const LinkSection = styled.div`
  display: flex;
  padding: 20px 0px;
  gap: 20px 0px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  flex-wrap: wrap;

  ${media.sm} {
    justify-content: space-around;
  }
`;

const LinkText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  color: ${(props) => props.theme.primary};
  font-size: 1.25rem;
  font-weight: 400;
  text-decoration-line: underline;

  ${media.sm} {
    width: unset;
    cursor: pointer;
  }
`;

const ArticleSection = styled.div`
  display: flex;
  padding: 20px 20px 0px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  align-self: stretch;
`;

const EmphasizeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  align-self: stretch;

  ${media.sm} {
    padding: 20px 20px 0px 20px;
  }
`;

const EmphasizeTitle = styled.div`
  text-align: center;
  color: ${(props) => props.theme.primary};
  font-size: 1.25rem;
  font-weight: 700;

  ${media.sm} {
    font-size: 1.75rem;
  }
`;

const PromoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 0px;
  gap: 6px;
  align-self: stretch;
`;

const BonusBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  color: ${(props) => props.theme.primary};
  font-size: 1.25rem;
  font-weight: 700;
  border: 1px solid ${(props) => props.theme.primary};
`;

const BonusText = styled.div`
  text-align: center;
  color: ${(props) => props.theme.white};
  font-size: 1.25rem;
  font-weight: 400;
  padding: 20px 0px;

  ${media.sm} {
    font-size: 1.75rem;
    font-weight: 700;
  }
`;

const RegisterBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 40px;
  border-radius: 50px;
  border: 1px solid ${(props) => props.theme.white};
  background: linear-gradient(180deg, #0587f5 0%, #0057a0 100%);
  box-shadow: 0px 0px 10px 0px ${(props) => props.theme.white};
  color: ${(props) => props.theme.white};
  font-size: 1.25rem;

  ${media.sm} {
    font-size: 1.5rem;
  }
`;

const Introduction = () => {
  const { handleChangeGameType } = useHomeGameContext();
  const history = useHistory();
  const goToHomePage = useGoToHomePage();

  const linkTextList = [
    "Soccer",
    "American football",
    "Basketball",
    "Baseball",
    "Hockey",
    "Boxing",
  ];

  const handleClick = () => {
    handleChangeGameType(GameTypeEnum.SPORTS);

    if (history.location.pathname !== "/") {
      goToHomePage();
    }
  };

  return (
    <Wrapper>
      <Title>The #1 Sports Betting Website in Mexico</Title>
      <Content>
        Welcome to the new way of experiencing your favorite sports, our offer is unique in the
        world of online betting, covering the most popular sports in the world:
      </Content>
      <LinkSection>
        {linkTextList.map((linkText) => (
          <LinkText key={linkText} onClick={handleClick}>
            {linkText}
          </LinkText>
        ))}
      </LinkSection>
      <ArticleSection>
        <Title>Guide to sports betting</Title>
        <Content>
          In PG, we offer different options to place bets on a wide variety of sporting events. Here
          are some popular sports betting types:
          <ol>
            <li>1X2</li>
            <li>double chance</li>
            <li>Both teams score</li>
            <li>Final score</li>
            <li>Handicap</li>
            <li>Asian handicap</li>
            <li>First team to score</li>
            <li>1x2 at half-time, 1st half result and rest of the match</li>
            <li>Ups and downs (in total or by parts of the match)</li>
            <li>Combined bets</li>
            <li>Tieless bets</li>
            <li>Exact number of entries</li>
            <li>No annotations14. Scorers15. Among other</li>
          </ol>
        </Content>
      </ArticleSection>
      <ArticleSection>
        <Title>Bet safely with PG and have fun</Title>
        <Content>
          The world of betting is a demanding and careful territory, in which we have to be alert so
          as not to stumble into a bottomless barrel. Here are some strategies you can use to play
          safe and have fun:
          <ol>
            <li>Don't think of gambling as a way to make money.</li>
            <li>Always play within your leisure budget.</li>
            <li>Set budget& time limits.</li>
            <li>Don’t try to win back what you’ve lost.</li>
            <li>
              {" "}
              Make sure you only play when you feel good and clear-headed.6. Play just for fun.
              Balance gaming with other activities.7. Take frequent breaks.8. If you’re no longer
              having fun, stop playing.
            </li>
          </ol>
        </Content>
      </ArticleSection>
      <ArticleSection>
        <Title>The Best Online Casino is in PG</Title>
        <Content>
          PG is the leading destination for all online casino players who are looking for a touch of
          class and elegance in their gaming environment. Our casino provides you with over 400
          online casino games – some traditional with modern twists, and some completely new,
          innovative, and exotic.With irresistible weekly bonus promotions and attractive loyalty
          and VIP programs, we're sure you'll be sticking around for a while to come. All of our
          software is developed and maintained by the industry's foremost online gaming software
          company, Pegasus. Because of this, we are able to offer you the newest cutting-edge games,
          of the highest quality and ultimate security in a sophisticated, yet engaging atmosphere.
        </Content>
      </ArticleSection>
      <EmphasizeSection>
        <img src={emphasizedLine} alt="notice" />
        <EmphasizeTitle>
          GO AHEAD AND DISCOVER ALL THE ADVANTAGES THAT PG OFFERS YOU!
        </EmphasizeTitle>
        <img src={emphasizedLine} alt="notice" />
      </EmphasizeSection>
      <PromoSection>
        <BonusBtn>WELCOME BONUS</BonusBtn>
        <BonusText>JOIN NOW TO CLAIM THE EXCLUSIVE WELCOME BONUS</BonusText>
        <RegisterBtn>Register Now</RegisterBtn>
      </PromoSection>
    </Wrapper>
  );
};

export default Introduction;
