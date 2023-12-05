import React, { useEffect } from "react";
import styled from "styled-components";
import { useWalletStore } from "@tgs-web-nx/core";
// import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
// import { useNotifications } from "@tgs-web-nx/core/features";
import { useRwd, useWageringPage } from "@tgs-web-nx/core/hooks";
// import { useSnackbar } from "notistack";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconWagering from "@/assets/t29/images/account/navItem/icon-wagering.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";
import iconCard from "@/assets/t29/images/withdraw/icon-card.svg";
import iconPlay from "@/assets/t29/images/wagering/icon-play.svg";

const WageringContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Requirement = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.blue20};
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
  font-size: 15px;
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
  width: 230px;
  height: 62px;
  padding: 12px 20px;
  gap: 10px;
  background-color: ${({ theme }) => theme.blue20};

  &:hover {
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme.blue40};
  }
`;

const WageringPage = () => {
  const { playerBuckets, fetchpPlayerBucket } = useWageringPage();
  console.log(playerBuckets)
  //   const history = useHistory();
  //   const { alert } = useNotifications();
  const { isDesktopSize } = useRwd();

  useEffect(() => {
    fetchpPlayerBucket();
  }, [fetchpPlayerBucket]);
  return (
    <TransferPageContainer>
      {isDesktopSize && <UserWalletInfo />}
      {/* todo: add t18 Wagering Requirement  */}
      <AccountPaper pageName={i18n.t("common.Wagering Requirement")} iconUrl={iconWagering}>
        <WageringContainer>
          <Requirement>
            <img src={iconCard} alt="" />
            <TitleItem> {i18n.t("common.Wagering Requirement")}</TitleItem>
            <TitleAmountText>123456.78</TitleAmountText>
          </Requirement>
          <GameWageringContainer>
            {/* {playerBuckets.map((bucket) => {
              if (bucket.gameType) {
                return (
                  <GameCard key={bucket.gameType}>
                    <div>
                      <img width={25} height={25} src={bucket.iconUrl} />
                    </div>
                    <div>
                      <div>{bucket.gameType}</div>
                      <div>{bucket.amount}</div>
                    </div>
                    <div>
                      <img src={iconPlay} alt="play" />
                    </div>
                  </GameCard>
                );
              }
            })} */}
          </GameWageringContainer>
        </WageringContainer>
      </AccountPaper>
    </TransferPageContainer>
  );
};

export default WageringPage;
