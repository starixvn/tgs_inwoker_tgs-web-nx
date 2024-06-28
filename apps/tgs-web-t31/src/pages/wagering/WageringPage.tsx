import { Wagering } from "@tgs-web-nx/core";
import { i18n } from "@tgs-web-nx/utils";
import { GameTypeEnum, useRwd } from "@tgs-web-nx/core/hooks";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconWagering from "@/assets/t31/images/account/navItem/icon-report.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";
import live from "@/assets/t31/images/home/gameType/desktop/Live.svg";
import lottery from "@/assets/t31/images/home/gameType/desktop/Lottery.svg";
import slot from "@/assets/t31/images/home/gameType/desktop/Slot.svg";
import sports from "@/assets/t31/images/home/gameType/desktop/Sports.svg";
import cardgame from "@/assets/t31/images/home/gameType/desktop/Card.svg";
import MenuTabs from "@/components/project/MenuTabs";
import { theme } from "@/theme";

const wageringImages = {
  [GameTypeEnum.LiveDealer]: live,
  [GameTypeEnum.Sportsbook]: sports,
  [GameTypeEnum.Slot]: slot,
  [GameTypeEnum.CardGame]: cardgame,
  [GameTypeEnum.Lottery]: lottery,
  [GameTypeEnum.VirtualSports]: sports,
};
const mainBucketIcon = "/src/assets/t31/images/withdraw/icon-card.svg";

const WageringPage = () => {
  const { isDesktopSize } = useRwd();
  return (
    <TransferPageContainer>
      {isDesktopSize && <UserWalletInfo />}
      {isDesktopSize && <MenuTabs />}
      <AccountPaper pageName={i18n.t("wagering.wageringrequirement")} iconUrl={iconWagering}>
        <Wagering
          wageringImages={wageringImages}
          mainBucketIcon={mainBucketIcon}
          cardBG={theme.neutralBlack}
          textColor={theme.text}
        />
      </AccountPaper>
    </TransferPageContainer>
  );
};

export default WageringPage;
