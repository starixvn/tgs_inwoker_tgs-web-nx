import React, { useEffect } from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd, useWageringPage } from "@tgs-web-nx/core/hooks";
import { LiveDealer, Sport, Slot, CardGame, Lottery } from "./components/GameTypeIconSVG";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconWagering from "@/assets/t36/images/badge/icon-wagering.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";
import TransferSvg from "@/pages/account/components/AccountSvgIcon/Transfer";
import { media } from "@/theme/breakpoints";

const WageringContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Requirement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d0dae3;
  width: 720px;
  height: 39px;
  padding: 10px 20px;
  gap: 10px;

  & > img {
    width: 19.17px;
    height: 21.56px;
    align-self: center;
  }
`;

const TitleItem = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  color: #1a5684;
`;

const TitleAmountText = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0em;
  color: #1a5684;
`;

const GameWageringContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  gap: 16px;
`;

const GameCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 62px;
  padding: 12px 20px;
  gap: 10px;
  background-color: #d0dae3;
  color: #1a5684;
  ${media.sm} {
    width: 230px;
  }

  &:hover {
    color: ${({ theme }) => theme.white};
    background-color: #1a5684;
  }
`;
const CardContent = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
`;
const CaradText = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
`;

const CardAmount = styled.div`
  font-size: 15px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
`;

const WageringPage = () => {
  const { wageringRequirement, playerBuckets, fetchpPlayerBucket, activeType, setActiveType } =
    useWageringPage();
  const { isDesktopSize } = useRwd();

  const gett18Translation = (type: string) => {
    switch (type) {
      case "LiveDealer":
        return i18n.t("common.live");
      case "Sportsbook":
        return i18n.t("common.sports");
      //後端API buckettype為slot,但畫面需要顯示table game
      case "Slot":
        return i18n.t("common.table");
      case "CardGame":
        return i18n.t("common.chess");
      case "Lottery":
        return i18n.t("common.lottery");
      case "VirtualSports":
        return i18n.t("common.virtualsports");
    }
  };

  const getImgSVG = (isActive: boolean, key: string) => {
    switch (key) {
      case "LiveDealer":
        return <LiveDealer $color={isActive ? "#fff" : "#1A5684"} />;
      case "Sportsbook":
        return <Sport $color={isActive ? "#fff" : "#1A5684"} />;
      case "Slot":
        return <Slot $color={isActive ? "#fff" : "#1A5684"} />;
      case "CardGame":
        return <CardGame $color={isActive ? "#fff" : "#1A5684"} />;
      case "Lottery":
        return <Lottery $color={isActive ? "#fff" : "#1A5684"} />;
      case "VirtualSports":
        return <Sport $color={isActive ? "#fff" : "#1A5684"} />;
    }
  };
  useEffect(() => {
    fetchpPlayerBucket();
  }, [fetchpPlayerBucket]);

  return (
    <TransferPageContainer>
      {isDesktopSize && <UserWalletInfo />}
      <AccountPaper pageName={i18n.t("t29.wageringrequirement")} iconUrl={iconWagering}>
        <WageringContainer>
          <Requirement>
            <TransferSvg $color={"#1A5684"} />
            <TitleItem>{i18n.t("t29.main")} </TitleItem>
            <TitleAmountText>{wageringRequirement}</TitleAmountText>
          </Requirement>
          <GameWageringContainer>
            {playerBuckets.map((bucket) => {
              if (bucket.key) {
                return (
                  <GameCard
                    key={bucket.key}
                    onMouseEnter={() => {
                      setActiveType(bucket.key);
                    }}
                    onMouseLeave={() => {
                      setActiveType("");
                    }}
                  >
                    <CardContent>
                      {getImgSVG(activeType === bucket.key, bucket.key)}
                      <div style={{ flexShrink: 0 }}>
                        <CaradText>{gett18Translation(bucket.key)}</CaradText>
                        <CardAmount>{bucket.amount}</CardAmount>
                      </div>
                    </CardContent>
                  </GameCard>
                );
              }
            })}
          </GameWageringContainer>
        </WageringContainer>
      </AccountPaper>
    </TransferPageContainer>
  );
};

export default WageringPage;
