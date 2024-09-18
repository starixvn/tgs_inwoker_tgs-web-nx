import EmblaCarousel from "@/components/project/embla-carousel";
import { LoadingIcon, NoGameIcon } from "@/pages/home/components/GameCard/icons";
import { useAccountStore } from "@tgs-web-nx/core";
import { useAuth } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { Common, i18n, utility } from "@tgs-web-nx/utils";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { Img } from "react-image";

import { GameTypeTitle, Group } from "../../style";
import { BigWinsAmount, CardHoverBg, CustomPlayButton, GameContainer, GameIcon, GameName, RecentBigWinsSlide } from "./style";

type BigWinType = {
  data: any[];
};

const RecentBigWins: React.FC<BigWinType> = (recentBigWins: BigWinType) => {
  const emblaOptions: EmblaOptionsType = { loop: true, skipSnaps: true, align: "start" };
  const emblaPlugins: any = [Autoplay({ playOnInit: true, delay: 2000 })];
  const { account } = useAccountStore();
  const { isDesktopSize } = useRwd();
  const isLogin = !!account.token;
  const { goToLogin } = useAuth();
  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  const launchGame = (gameId: any, gameProviderCode: any) => {
    if (!isLogin) {
      goToLogin();
    } else {
      Common.closePreviousPopup();
      Common.PopupCenter(`/joingame/${gameId}/${gameProviderCode}`, "gamewindow");
    }
  };
  return (
    <Group>
      <GameTypeTitle>
        <img src="/assets/images/common/icon-big-wins.svg" alt="hot" />
        {i18n.t("web.home.Section1RecentBigWins")}
      </GameTypeTitle>
      <EmblaCarousel options={emblaOptions} plugins={emblaPlugins}>
        {recentBigWins.data.length > 0 &&
          recentBigWins.data.map((item, index) => {
            const { gameId, gameProviderCode, gameCode, name } = item;
            return (
              <RecentBigWinsSlide className="embla__slide" key={index}>
                <GameContainer
                  key={index}
                  onClick={() => {
                    launchGame(gameId, gameProviderCode);
                  }}
                >
                  <GameIcon>
                    <Img
                      className="icon"
                      src={utility.getGameNameUrl(gameProviderCode, gameCode, isDesktopSize)}
                      loader={<LoadingIcon />}
                      unloader={<NoGameIcon />}
                    />
                    <CardHoverBg>
                      <CustomPlayButton>
                        <img
                          src="/assets/images/common/icon-play.svg"
                          width={18}
                          height={24}
                          alt="Icon Play"
                        />
                      </CustomPlayButton>
                    </CardHoverBg>
                  </GameIcon>

                  <GameName>{item.playerName}</GameName>
                  <BigWinsAmount>{`${formatter.format(item.winAmount)}`}</BigWinsAmount>
                </GameContainer>
              </RecentBigWinsSlide>
            );
          })}
      </EmblaCarousel>
    </Group>
  );
};

export default RecentBigWins;
