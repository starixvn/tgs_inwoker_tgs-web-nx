import { Wagering } from "@tgs-web-nx/core";
import { i18n } from "@tgs-web-nx/utils";
import { GameTypeEnum, useRwd } from "@tgs-web-nx/core/hooks";
import UserWalletInfo from "@/components/project/UserWalletInfo";
//wagering icon與report icon一樣
import iconWagering from "@/assets/t33/images/menuDrawer/icon-report.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";
import { theme } from "@/theme";
import live from "@/assets/t33/images/home/gameType_home/liveCasino.svg";
import lottery from "@/assets/t33/images/home/gameType_home/lottery.svg";
import slot from "@/assets/t33/images/home/gameType_home/slot.svg";
import sports from "@/assets/t33/images/home/gameType_home/sports.svg";
import cardgame from "@/assets/t33/images/home/gameType_home/cardGame.svg";
import mainBucketIcon from "/src/assets/t33/images/withdraw/icon-card-active.svg";

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
          cardBG={theme.gray30}
          textColor={theme.text}
        />
      </AccountPaper>
    </TransferPageContainer>
  );
};

export default WageringPage;
