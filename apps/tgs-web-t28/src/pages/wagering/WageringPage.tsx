import { Wagering } from "@tgs-web-nx/core";
import { i18n } from "@tgs-web-nx/utils";
import { GameTypeEnum, useRwd } from "@tgs-web-nx/core/hooks";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconWagering from "@/assets/t28/images/account/navItem/icon-wagering.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";

import LiveDealerIcon from "@/assets/t28/images/wagering/LiveDealer.svg";
import SportsbookIcon from "@/assets/t28/images/wagering/Sportsbook.svg";
import SlotIcon from "@/assets/t28/images/wagering/Slot.svg";
import CardGameIcon from "@/assets/t28/images/wagering/CardGame.svg";
import LotteryIcon from "@/assets/t28/images/wagering/Lottery.svg";
import mainBucketIcon from "/src/assets/t29/images/withdraw/icon-card.svg";

// import VirtualSportsIcon from "@/assets/t28/images/wagering/VirtualSports.svg";
import { theme } from "@/theme";

const wageringImages = {
  [GameTypeEnum.LiveDealer]: LiveDealerIcon,
  [GameTypeEnum.Sportsbook]: SportsbookIcon,
  [GameTypeEnum.Slot]: SlotIcon,
  [GameTypeEnum.CardGame]: CardGameIcon,
  [GameTypeEnum.Lottery]: LotteryIcon,
  [GameTypeEnum.VirtualSports]: SportsbookIcon,
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
          cardBG={isDesktopSize ? theme.mainBackground : theme.NavBGC}
          textColor={theme.text}
        />
      </AccountPaper>
    </TransferPageContainer>
  );
};

export default WageringPage;
