import { Wagering } from "@tgs-web-nx/core";
import { i18n } from "@tgs-web-nx/utils";
import { GameTypeEnum, useRwd } from "@tgs-web-nx/core/hooks";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconWagering from "@/assets/t24/images/badge/icon-report.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";
import LiveDealerIcon from "@/assets/t24/images/wagering/LiveDealerActive.svg";
import SportsbookIcon from "@/assets/t24/images/wagering/SportsbookActive.svg";
import SlotIcon from "@/assets/t24/images/wagering/SlotActive.svg";
import CardGameIcon from "@/assets/t24/images/wagering/CardGameActive.svg";
import LotteryIcon from "@/assets/t24/images/wagering/LotteryActive.svg";
import mainBucketIcon from "@/assets/t24/images/withdraw/icon-card-active.svg";

import VirtualSportsIcon from "@/assets/t24/images/wagering/SportsbookActive.svg";
import { theme } from "@/theme";

const wageringImages = {
  [GameTypeEnum.LiveDealer]: LiveDealerIcon,
  [GameTypeEnum.Sportsbook]: SportsbookIcon,
  [GameTypeEnum.Slot]: SlotIcon,
  [GameTypeEnum.CardGame]: CardGameIcon,
  [GameTypeEnum.Lottery]: LotteryIcon,
  [GameTypeEnum.VirtualSports]: VirtualSportsIcon,
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
          cardBG={theme.gray85}
          textColor={theme.text}
        />
      </AccountPaper>
    </TransferPageContainer>
  );
};

export default WageringPage;
