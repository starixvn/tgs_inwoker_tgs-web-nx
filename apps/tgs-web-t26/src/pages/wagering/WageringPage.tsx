import { Wagering } from "@tgs-web-nx/core";
import { i18n } from "@tgs-web-nx/utils";
import { GameTypeEnum, useRwd } from "@tgs-web-nx/core/hooks";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconWagering from "@/assets/t26/images/account/navItemWhite/icon-report.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";
import LiveDealerIcon from "@/assets/t26/images/wagering/LiveDealerActive.svg";
import SportsbookIcon from "@/assets/t26/images/wagering/SportsbookActive.svg";
import SlotIcon from "@/assets/t26/images/wagering/SlotActive.svg";
import CardGameIcon from "@/assets/t26/images/wagering/CardGameActive.svg";
import LotteryIcon from "@/assets/t26/images/wagering/LotteryActive.svg";
import mainBucketIcon from "/src/assets/t26/images/withdraw/icon-card.svg";
import VirtualSportsIcon from "@/assets/t26/images/wagering/SportsbookActive.svg";
import { theme } from "@/theme";
import PageBadge from "@/components/project/AccountPaper/components/PageBadge";

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
      {isDesktopSize && <PageBadge iconUrl={iconWagering} text={i18n.t("common.wagering")} />}
      <AccountPaper>
        <Wagering
          wageringImages={wageringImages}
          mainBucketIcon={mainBucketIcon}
          cardBG={isDesktopSize ? theme.mainBackground : theme.darkGray}
          textColor={theme.text}
        />
      </AccountPaper>
    </TransferPageContainer>
  );
};

export default WageringPage;
