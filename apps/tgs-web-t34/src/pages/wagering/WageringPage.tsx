import { Wagering } from "@tgs-web-nx/core";
import { i18n } from "@tgs-web-nx/utils";
import { GameTypeEnum, useRwd } from "@tgs-web-nx/core/hooks";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconWagering from "@/assets/t29/images/account/navItem/icon-wagering.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";

//傳入的image path只能是絕對路徑
const wageringImages = {
  [GameTypeEnum.LiveDealer]: "/src/assets/t34/images/home/gameType/liveCasino.svg",
  [GameTypeEnum.Sportsbook]: "/src/assets/t34/images/home/gameType/sports.svg",
  [GameTypeEnum.Slot]: "/src/assets/t34/images/home/gameType/slot.svg",
  [GameTypeEnum.CardGame]: "/src/assets/t34/images/home/gameType/cardGame.svg",
  [GameTypeEnum.Lottery]: "/src/assets/t34/images/home/gameType/lottery.svg",
  [GameTypeEnum.VirtualSports]: "/src/assets/t34/images/home/gameType/sports.svg",
};
const mainBucketIcon = "/src/assets/t34/images/withdraw/icon-card.svg";

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
