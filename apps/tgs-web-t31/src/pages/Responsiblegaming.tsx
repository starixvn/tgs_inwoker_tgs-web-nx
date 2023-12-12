import config from '@tgs-web-nx/config';
import styled from "styled-components";
import { media } from '@/theme/breakpoints';
import { SUB_CONTENT_MAX_WIDTH } from '@/theme/constants';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: transparent;
  color: ${({ theme }) => theme.gray60};
  padding: 20px;
  gap: 6px;
  flex-shrink: 0;
  flex: 1;

  & h1 {
    font-size: 3rem;
    font-weight: 500;
  }

  & h2 {
    font-size: 1.75rem;
    font-weight: 400;
    margin: 10px 0;
  }
  
  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    padding: 30px;

    & h1 {
      font-size: 3.125rem;
    }
  }
`;

const Responsiblegaming = () => {

  const getBrand = () => {
    switch (config.brand) {
      case "TEP":
        return "TEP";
      case "PGG":
        return "Pega Gaming";
      default:
        return config.brand;
    }
  }

  return (
    <Container>
      <h1>Responsible Gaming</h1>
      <p>
        {getBrand()} is committed to being the very best online entertainment
        group in the world. This means doing everything possible to give our
        players an enjoyable, responsible and safe gaming experience.
        <br />
        <br />
        {getBrand()} fully supports responsible gaming and to ensure that you
        continue to enjoy safe and manageable play, please bear the following in
        mind:
        <br />
        1. Gambling should be seen as entertainment and not as a means to make
        money;
        <br />
        2. Keep track of the time and money you spend while gambling.
        <br />
        <br />
        We have also implemented the following strict rules to ensure a
        responsible gaming environment:
      </p>

      <h2>Underage Gaming</h2>

      <p>
        Playing with us is restricted to persons over the age of 18, or the
        legal age of majority in their jurisdiction, whichever is greater.
      </p>

      <h2>Player Self-Exclusion</h2>
      <p>
        If you are concerned about your gambling behavior, you may choose to
        lock your gaming account. During this time, we will also take all
        reasonable steps to ensure you do not receive any promotional material.
        <br />
        <br />
        If you are concerned about your gambling behavior, please consider one
        of the following options:
        <br />
        a. A minimum of 24 hours “Take a break” period
        <br />
        b. A minimum six (6) month self-exclusion period
      </p>
      <h2>Deposit Limits</h2>
      <p>
        Players also have the option of adjusting their maximum deposit limits
        at any time.
        <br />
        Limits can be set for the following periods:
        <br />
        a. Daily
        <br />
        b. Weekly
        <br />
        c. Monthly
        <br />
        To change your deposit limits or to request exclusion, please contact
        our 24/7 Support Team.
        <br />
        <br />
        If you are worried about your gaming behavior, please visit the
        following links for professionals to assist you.
        <br />
        Gambling Therapy:{" "}
        <a href="www.gamblingtherapy.org">www.gamblingtherapy.org</a>
        <br />
        Responsible Gambling Council:{" "}
        <a href="www.responsiblegambling.org">www.responsiblegambling.org</a>
      </p>
      <h2>
        Please enjoy gaming responsibly.
        <br />
        <br />
        Responsible Gaming, Stay in control.
      </h2>
    </Container>
  );
};

export default Responsiblegaming;
