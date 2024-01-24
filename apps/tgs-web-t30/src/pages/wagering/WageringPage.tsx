import React, { useEffect } from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd, useWageringPage } from "@tgs-web-nx/core/hooks";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconWagering from "@/assets/t30/images/account/navItem/icon-wagering.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";
import iconCard from "@/assets/t30/images/withdraw/icon-card.svg";
import LiveDealerIcon from "@/assets/t30/images/wagering/LiveDealer.svg";
import LiveDealerIconActive from "@/assets/t30/images/wagering/LiveDealerActive.svg";
import SportsbookIcon from "@/assets/t30/images/wagering/Sportsbook.svg";
import SportsbookIconActive from "@/assets/t30/images/wagering/SportsbookActive.svg";
import SlotIcon from "@/assets/t30/images/wagering/Slot.svg";
import SlotIconActive from "@/assets/t30/images/wagering/SlotActive.svg";
import CardGameIcon from "@/assets/t30/images/wagering/CardGame.svg";
import CardGameIconActive from "@/assets/t30/images/wagering/CardGameActive.svg";
import LotteryIcon from "@/assets/t30/images/wagering/Lottery.svg";
import LotteryIconActive from "@/assets/t30/images/wagering/LotteryActive.svg";
import VirtualSportsIcon from "@/assets/t30/images/wagering/VirtualSports.svg";
import VirtualSportsIconActive from "@/assets/t30/images/wagering/VirtualSportsActive.svg";
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
  background-color: ${({ theme }) => theme.mainBackground};
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
`;

const TitleAmountText = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0em;
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
  background-color: ${({ theme }) => theme.mainBackground};

  ${media.sm} {
    width: 230px;
  }

  &:hover {
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme.mainBackground};
  }
`;
const CardContent = styled.div`
  display: flex;
  gap: 40px;
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
      case "Slot":
        return i18n.t("common.slot");
      case "CardGame":
        return i18n.t("common.chess");
      case "Lottery":
        return i18n.t("common.lottery");
      case "VirtualSports":
        return i18n.t("common.virtualsports");
    }
  };

  const getImgUrl = (isActive: boolean, key: string) => {
    switch (key) {
      case "LiveDealer":
        return isActive ? LiveDealerIconActive : LiveDealerIcon;
      case "Sportsbook":
        return isActive ? SportsbookIconActive : SportsbookIcon;
      case "Slot":
        return isActive ? SlotIconActive : SlotIcon;
      case "CardGame":
        return isActive ? CardGameIconActive : CardGameIcon;
      case "Lottery":
        return isActive ? LotteryIconActive : LotteryIcon;
      case "VirtualSports":
        return isActive ? VirtualSportsIconActive : VirtualSportsIcon;
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
            <img src={iconCard} alt="" />
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
                      <div>
                        <img
                          width={25}
                          height={25}
                          src={
                            getImgUrl(activeType === bucket.key, bucket.key)
                            // activeType === bucket.key ? bucket.activeIconUrl : bucket.iconUrl
                          }
                          alt={bucket.key}
                        />
                      </div>
                      <div style={{ flexShrink: 0 }}>
                        <CaradText>{gett18Translation(bucket.key)}</CaradText>
                        <CardAmount>{bucket.amount}</CardAmount>
                      </div>
                    </CardContent>
                    {/* <div>
                      <img src={activeType === bucket.key ? iconPlayActive : iconPlay} alt="play" />
                    </div> */}
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
