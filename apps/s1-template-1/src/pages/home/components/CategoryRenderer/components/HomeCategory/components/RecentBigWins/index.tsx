import EmblaCarousel from "@/components/project/embla-carousel";
import { useAccountStore } from "@tgs-web-nx/core";
import { useAuth } from "@tgs-web-nx/core/features";
import { RecentBigWinItem } from "@tgs-web-nx/types";
import { Common, i18n } from "@tgs-web-nx/utils";
import { EmblaOptionsType } from "embla-carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import React from "react";

import { GameTypeTitle, Group } from "../../style";
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
      Common.closePreviousPopup();
      Common.PopupCenter(`/joingame/${gameId}/${gameProviderCode}`, "gamewindow");
    }
  };

  const createSkeletonGames = () => {
    const skeletonGameNumber = 19;
    const gameListTmp = Array.from(Array(skeletonGameNumber).keys());
    return gameListTmp.map((index) => {
      return <RecentBigWinSKeleton key={index} />;
    });
  };

  return (
    <Group>
      <GameTypeTitle>
        <img src="/assets/images/common/icon-big-wins.svg" alt="hot" />
        {i18n.t("web.home.Section1RecentBigWins")}
      </GameTypeTitle>
      <EmblaCarousel options={emblaOptions} plugins={emblaPlugins}>
        {!hasData && createSkeletonGames()}
        {hasData &&
          recentBigWins.data.map((item, index) => {
            return <RecentBigWinsItem key={index} item={item} launchGame={launchGame} />;
          })}
      </EmblaCarousel>
    </Group>
  );
};

export default RecentBigWins;
