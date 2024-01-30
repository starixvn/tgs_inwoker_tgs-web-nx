import React from "react";
import styled from "styled-components";
import { useBettingBonus } from "@tgs-web-nx/core/hooks";
import Loading from "@/components/UI/Loading";
import CurrentLevelBanner from "@/components/project/BettingBonus/CurrentLevelBanner";

const AccountLevelInfoContainer = styled.div`
  padding: 15px 0 0;
  display: flex;
  justify-content: center;

  & > * {
    margin-bottom: 8px;
  }
`;

type Props = {};
const MyInfo = (props: Props) => {
  const { isLoading, currentLevel, productRebateByLevel } = useBettingBonus();

  return (
    <AccountLevelInfoContainer>
      <CurrentLevelBanner level={currentLevel} productRebateByLevel={productRebateByLevel} />

      <Loading show={isLoading} />
    </AccountLevelInfoContainer>
  );
};

export default MyInfo;
