import { useGetHomeCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { i18n, utility } from "@tgs-web-nx/utils";
import { EmblaOptionsType } from "embla-carousel";
import { useHistory } from "react-router-dom";

import GameCardSlider from "./components/GameSlider/GameCardSlider";
import RecentBigWins from "./components/RecentBigWins";
import {
  DesktopContainer,
  GameTypeContainer,
  GameTypeTitle,
  Group,
  ProviderItem,
  ViewAll,
} from "./style";
import EmblaCarousel from "@/components/project/embla-carousel";

const HomeCategory = () => {
  const history = useHistory();
  const { providerList } = useHomeGameContext();
  const { sportGameList, liveCasinoList, slotGameList, newGameList, hotGameList, tableGameList, recentBigWins } =
    useGetHomeCategoryList();

  const navigateTo = (pageName: string) => {
    history.push("/main/" + pageName);
    window.scroll({ top: 0, behavior: "smooth" });
  };

  const gameTypeEmblaOptions: EmblaOptionsType = { slidesToScroll: "auto" };

  return (
    <DesktopContainer>
      <GameTypeContainer>
        <RecentBigWins data={recentBigWins}/>
        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-sports-group.svg" alt="hot" />
            {i18n.t("web.home.Section1Sport")}
            <ViewAll onClick={() => navigateTo("sports")}>{i18n.t("common.all")}</ViewAll>
          </GameTypeTitle>
          <EmblaCarousel options={gameTypeEmblaOptions} hasControlButton={true}>
            <GameCardSlider data={sportGameList} />
          </EmblaCarousel>
        </Group>

        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-popular-slots.svg" alt="slot" />
            {i18n.t("web.home.Section1Slot")}
            <ViewAll onClick={() => navigateTo("slots")}>{i18n.t("common.all")}</ViewAll>
          </GameTypeTitle>
          <EmblaCarousel
            options={gameTypeEmblaOptions}
            hasControlButton={true}
            extraClassName="two-rows"
          >
            <GameCardSlider data={slotGameList} />
          </EmblaCarousel>
        </Group>

        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-live-casino-group.svg" alt="slot" />
            {i18n.t("web.home.Section1Live")}
            <ViewAll onClick={() => navigateTo("liveCasino")}>{i18n.t("common.all")}</ViewAll>
          </GameTypeTitle>
          <EmblaCarousel options={gameTypeEmblaOptions} hasControlButton={true}>
            <GameCardSlider data={liveCasinoList} />
          </EmblaCarousel>
        </Group>

        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-new-release.svg" alt="hot" />
            {i18n.t("web.home.Section1NewRelease")}
            <ViewAll>{i18n.t("common.all")}</ViewAll>
          </GameTypeTitle>
          <EmblaCarousel options={gameTypeEmblaOptions} hasControlButton={true}>
            <GameCardSlider data={newGameList} />
          </EmblaCarousel>
        </Group>

        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-game-providers.svg" alt="hot" />
            {i18n.t("web.home.Section1GameProviders")}
          </GameTypeTitle>
          <EmblaCarousel
            options={gameTypeEmblaOptions}
            hasControlButton={true}
            extraClassName="providers two-rows"
          >
            {providerList.map((provider, index) => {
              const providerName = provider.code.toLowerCase();
              return (
                <div className="embla__slide " key={index}>
                  <ProviderItem>
                    <img
                      src={utility.imagePathGenerator(`provider/dark/${providerName}.webp`)}
                      alt={providerName}
                      title={providerName}
                    />
                  </ProviderItem>
                </div>
              );
            })}
          </EmblaCarousel>
        </Group>

        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-table-game-group.svg" alt="hot" />
            {i18n.t("web.home.Section1Electron")}
            <ViewAll>{i18n.t("common.all")}</ViewAll>
          </GameTypeTitle>
          <EmblaCarousel options={gameTypeEmblaOptions} hasControlButton={true}>
            <GameCardSlider data={tableGameList} />
          </EmblaCarousel>
        </Group>

        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-hot-game.svg" alt="hot" />
            {i18n.t("web.home.Section1HotGames")}
            <ViewAll>{i18n.t("common.all")}</ViewAll>
          </GameTypeTitle>
          <EmblaCarousel options={gameTypeEmblaOptions} hasControlButton={true}>
            <GameCardSlider data={hotGameList} />
          </EmblaCarousel>
        </Group>
      </GameTypeContainer>
    </DesktopContainer>
  );
};

export default HomeCategory;
