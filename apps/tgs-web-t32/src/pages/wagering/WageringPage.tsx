import { Wagering } from "@tgs-web-nx/core";
import { i18n } from "@tgs-web-nx/utils";
import { GameTypeEnum, useRwd } from "@tgs-web-nx/core/hooks";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconWagering from "@/assets/t32/images/account/navItem/icon-wagering.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";
import live from "@/assets/t32/images/wagering/LiveDealer.svg";
import lottery from "@/assets/t32/images/wagering/Lottery.svg";
import slot from "@/assets/t32/images/wagering/Slot.svg";
import sports from "@/assets/t32/images/wagering/Sportsbook.svg";
import cardgame from "@/assets/t32/images/wagering/CardGame.svg";
import mainBucketIcon from "/src/assets/t32/images/withdraw/icon-card.svg";

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
          cardBG="#D3F3FF"
        />
      </AccountPaper>
    </TransferPageContainer>
  );
};

export default WageringPage;
