import { Wagering } from "@tgs-web-nx/core";
import { i18n } from "@tgs-web-nx/utils";
import { GameTypeEnum, useRwd } from "@tgs-web-nx/core/hooks";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconWagering from "@/assets/t34/images/account/navItem/icon-report.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";
import live from "@/assets/t34/images/home/gameType/liveCasino.svg";
import lottery from "@/assets/t34/images/home/gameType/lottery.svg";
import slot from "@/assets/t34/images/home/gameType/slot.svg";
import sports from "@/assets/t34/images/home/gameType/sports.svg";
import cardgame from "@/assets/t34/images/home/gameType/cardGame.svg";
import mainBucketIcon from "/src/assets/t34/images/withdraw/icon-card.svg";

const wageringImages = {
  [GameTypeEnum.LiveDealer]: live,
  [GameTypeEnum.Sportsbook]: sports,
  [GameTypeEnum.Slot]: slot,
  [GameTypeEnum.CardGame]: cardgame,
  [GameTypeEnum.Lottery]: lottery,
  [GameTypeEnum.VirtualSports]: sports,
};

const WageringPage = () => {
  const { isDesktopSize } = useRwd();
  return (
    <TransferPageContainer>
      {isDesktopSize && <UserWalletInfo />}
      <AccountPaper pageName={i18n.t("wagering.wageringrequirement")} iconUrl={iconWagering}>
        <Wagering
          wageringImages={wageringImages}
          mainBucketIcon={mainBucketIcon}
          cardBG="#EAEAEA"
        />
      </AccountPaper>
    </TransferPageContainer>
  );
};

export default WageringPage;
