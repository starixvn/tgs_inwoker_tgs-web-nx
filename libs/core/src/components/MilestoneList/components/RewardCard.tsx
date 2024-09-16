import styled from "styled-components";
import CardIndicator from "./CardIndicator";
import { contextType, RewardContext, useRwd } from "@tgs-web-nx/core/hooks";
import React, { useContext } from "react";
import { media } from "@tgs-web-nx/constants";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  ${media.sm} {
    flex-direction: column;
  }
`;

const StateContainer = styled.div<{
  $color: string;
  $complete: boolean;
}>`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  color: ${({ theme, $color }) => $color};

  ${media.sm} {
    flex-direction: row;
    align-items: center;
  }

  & > div {
    font-size: 15px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 10px;
    opacity: ${({ theme, $complete }) => ($complete ? 1 : 0.4)};
  }
`;

const AccountBetDeposit = styled.div<{ $bg: string }>`
  width: 100%;
  background: ${({ theme, $bg }) => $bg};
  padding: 11px 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BonusContainer = styled.div<{ $bonusBg: string }>`
  min-height: 32px;
  padding: 0 10px;
  background: ${({ theme, $bonusBg }) => $bonusBg};
  color: white;
  border-radius: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const LineContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-grow: 1;
  opacity: 1 !important;
`;

const Line = styled.div`
  width: 2px;
  height: 100%;
  display: flex;
  justify-content: center;
  background: #e7f1fb;
`;

const RewardCard = React.memo((props: any) => {
  const { isDesktopSize, isMobileSize } = useRwd();
  const context = useContext(RewardContext) as contextType;
  const { mainBg, indicatorBg, bonusBg } = context.colors;

  return (
    <Container>
      <StateContainer $color={indicatorBg} $complete={props.finish}>
        <CardIndicator $color={indicatorBg} $complete={props.finish} />
        {isMobileSize && (
          <LineContainer>
            <Line />
          </LineContainer>
        )}

        {isDesktopSize && (
          <div>
            <span>{(props.index + 1).toString().padStart(2, "0")}</span>
            <span>{props.finish ? "已完成" : "未完成"}</span>
          </div>
        )}
      </StateContainer>
      <AccountBetDeposit $bg={mainBg}>
        <div>{`Valid bet $${props.currentBet} / $${props.targetBet}`}</div>
        <div>{`Deposit  $${props.currentDeposit} / $${props.targetDeposit}`}</div>
        <BonusContainer $bonusBg={bonusBg}>Bonus: ₱5.00</BonusContainer>
      </AccountBetDeposit>
    </Container>
  );
});
export default RewardCard;
