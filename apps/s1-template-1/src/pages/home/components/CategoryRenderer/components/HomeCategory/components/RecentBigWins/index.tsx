import EmblaCarousel from "@/components/project/embla-carousel";
import { useAccountStore } from "@tgs-web-nx/core";
import { useAuth } from "@tgs-web-nx/core/features";
import { RecentBigWinItem } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { EmblaOptionsType } from "embla-carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import React, { useState } from "react";

import { GameTypeTitle, Group } from "../../style";
import BetSlipDialog from "./BetSlipDialog";
import RecentBigWinsItem from "./RecentBigWinsItem";
import RecentBigWinSKeleton from "./RecentBigWinSKeleton";

type BigWinType = {
  data: RecentBigWinItem[];
};

const RecentBigWins: React.FC<BigWinType> = (recentBigWins: BigWinType) => {
  const emblaOptions: EmblaOptionsType = { loop: true, skipSnaps: true, align: "start" };
  const emblaPlugins: any = [
    AutoScroll({ playOnInit: true, stopOnInteraction: false, stopOnMouseEnter: true, speed: 0.5 }),
  ];
  const { account } = useAccountStore();
  const isLogin = !!account.token;
  const { goToLogin } = useAuth();
  const hasData = recentBigWins.data.length > 0;

  const launchGame = (gameId: any, gameProviderCode: any) => {
    if (!isLogin) {
      goToLogin();
    } else {
      window.open(`/joingame/${gameId}/${gameProviderCode}`, "gamewindow");
    }
  };

  const createSkeletonGames = () => {
    const skeletonGameNumber = 19;
    const gameListTmp = Array.from(Array(skeletonGameNumber).keys());
    return gameListTmp.map((index) => {
      return <RecentBigWinSKeleton key={index} />;
    });
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [itemDetail, setItemDetail] = useState<RecentBigWinItem>();

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleOpenDialog = (data: RecentBigWinItem) => {
    setIsOpen(true);
    setItemDetail(data);
  };

  return (
    <Group className="main-container">
      <GameTypeTitle>
        <img src="/assets/images/common/icon-big-wins.svg" alt="hot" />
        {i18n.t("web.home.Section1RecentBigWins")}
      </GameTypeTitle>
      <EmblaCarousel options={emblaOptions} plugins={emblaPlugins}>
        {!hasData && createSkeletonGames()}
        {hasData &&
          recentBigWins.data.map((item, index) => {
            return (
              <RecentBigWinsItem
                key={index}
                handleOpenDialog={handleOpenDialog}
                item={item}
                launchGame={launchGame}
              />
            );
          })}
      </EmblaCarousel>
      <BetSlipDialog
        launchGame={launchGame}
        data={itemDetail}
        open={isOpen}
        onClose={handleCloseDialog}
      />
    </Group>
  );
};

export default RecentBigWins;
