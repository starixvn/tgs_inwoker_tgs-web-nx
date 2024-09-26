import styled from "styled-components";
import CardIndicator from "./CardIndicator";
import { useRwd } from "@tgs-web-nx/core/hooks";
import React, { useContext } from "react";
import { media } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
import { ConditionType } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import { contextType, RewardContext } from "@tgs-web-nx/core/features";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin: 14px 0;
  ${media.sm} {
    flex-direction: column;
  }
`;

const StateContainer = styled.div<{
  $color: string;
  $isSent: boolean;
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
    opacity: ${({ theme, $isSent }) => ($isSent ? 1 : 0.4)};
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

const RewardCard = React.memo(
  (props: {
    condition: ConditionType;
    index: number;
    totalValidBetAmount: number;
    totalDepositAmount: number;
  }) => {
    const { isDesktopSize, isMobileSize } = useRwd();
    const context = useContext(RewardContext) as contextType;
    const { mainBg, indicatorBg, bonusBg } = context.colors;
    const { depositAmount, validBetAmount, bonus, isSent } = props.condition;

    return (
      <Container>
        <StateContainer $color={indicatorBg} $isSent={isSent}>
          <CardIndicator $color={indicatorBg} $isSent={isSent} />
          {isMobileSize && (
            <LineContainer>
              <Line />
            </LineContainer>
          )}

          {isDesktopSize && (
            <div>
              <span>{(props.index + 1).toString().padStart(2, "0")}</span>
              <span>{isSent ? i18n.t("common.complete") : i18n.t("reward.incomplete")}</span>
            </div>
          )}
        </StateContainer>
        <AccountBetDeposit $bg={mainBg}>
          <div>
            {`${i18n.t("reward.validBet")} ${config.features.currencySymbol}
            ${props.totalValidBetAmount} / ${validBetAmount}`}
          </div>
          <div>
            {`${i18n.t("common.deposit")} ${config.features.currencySymbol}
            ${props.totalDepositAmount} / ${depositAmount}`}
          </div>
          <BonusContainer $bonusBg={bonusBg}>{`${i18n.t("vip.bonus")} ${bonus}`}</BonusContainer>
        </AccountBetDeposit>
      </Container>
    );
  },
);
export default RewardCard;
