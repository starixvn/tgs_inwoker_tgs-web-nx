import EmblaCarousel from "@/components/project/embla-carousel";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useGetHomeCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { EmblaOptionsType } from "embla-carousel";
import { useHistory } from "react-router-dom";

import ProviderList from "../ProviderList";
import GameCardSlider from "./components/GameSlider/GameCardSlider";
import MatchCardSlider from "./components/MatchSlider/MatchCardSlider";
import RecentBigWins from "./components/RecentBigWins";
import { DesktopContainer, GameTypeContainer, GameTypeTitle, Group, ViewAll } from "./style";

const HomeCategory = () => {
  const history = useHistory();
  const { providerList, handleChangeGameType } = useHomeGameContext();
  const {
    sportGameList,
    liveCasinoList,
    slotGameList,
    newGameList,
    hotGameList,
    tableGameList,
    recentBigWins,
    highlightMatches,
  } = useGetHomeCategoryList();

  const navigateTo = (pageName: string, gameType: GameTypeEnum) => {
    handleChangeGameType(gameType);
    history.push(pageName);
    window.scroll({ top: 0, behavior: "smooth" });
  };

  const gameTypeEmblaOptions: EmblaOptionsType = { slidesToScroll: "auto" };

  return (
    <DesktopContainer>
      <GameTypeContainer>
        <RecentBigWins data={recentBigWins} />
        <Group className="game-area">
          <GameTypeTitle>
            <img src="/assets/images/common/icon-sports-group.svg" alt="sports" />
            {i18n.t("web.home.Section1Sport")}
            <ViewAll onClick={() => navigateTo("sports", GameTypeEnum.SPORTS)}>
              {i18n.t("common.all")}
            </ViewAll>
          </GameTypeTitle>
          <EmblaCarousel options={gameTypeEmblaOptions} hasControlButton={true}>
            <GameCardSlider data={sportGameList} />
          </EmblaCarousel>
        </Group>
        <EmblaCarousel options={gameTypeEmblaOptions} hasControlButton={false}>
          <MatchCardSlider matches={highlightMatches}></MatchCardSlider>
        </EmblaCarousel>
        <Group className="game-area">
          <GameTypeTitle>
            <img src="/assets/images/common/icon-popular-slots.svg" alt="slot" />
            {i18n.t("web.home.Section1Slot")}
            <ViewAll onClick={() => navigateTo("/casino/slots", GameTypeEnum.SLOT)}>
              {i18n.t("common.all")}
            </ViewAll>
          </GameTypeTitle>
          <EmblaCarousel
            options={gameTypeEmblaOptions}
            hasControlButton={true}
            extraClassName="two-rows"
          >
            <GameCardSlider data={slotGameList} />
          </EmblaCarousel>
        </Group>

        <Group className="game-area">
          <GameTypeTitle>
            <img src="/assets/images/common/icon-live-casino-group.svg" alt="live-casino" />
            {i18n.t("web.home.Section1Live")}
            <ViewAll onClick={() => navigateTo("/casino/live-casino", GameTypeEnum.LIVE)}>
              {i18n.t("common.all")}
            </ViewAll>
          </GameTypeTitle>
          <EmblaCarousel options={gameTypeEmblaOptions} hasControlButton={true}>
            <GameCardSlider data={liveCasinoList} />
          </EmblaCarousel>
        </Group>

        <Group className="game-area">
          <GameTypeTitle>
            <img src="/assets/images/common/icon-new-release.svg" alt="new-release" />
            {i18n.t("web.home.Section1NewRelease")}
            <ViewAll onClick={() => navigateTo("/tag/new", GameTypeEnum.NEW)}>
              {i18n.t("common.all")}
            </ViewAll>
          </GameTypeTitle>
          <EmblaCarousel options={gameTypeEmblaOptions} hasControlButton={true}>
            <GameCardSlider data={newGameList} />
          </EmblaCarousel>
        </Group>

        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-game-providers.svg" alt="game-providers" />
            {i18n.t("web.home.Section1GameProviders")}
          </GameTypeTitle>
          <EmblaCarousel
            options={gameTypeEmblaOptions}
            hasControlButton={true}
            extraClassName="providers two-rows"
          >
            <ProviderList providerList={providerList} />
          </EmblaCarousel>
        </Group>

        <Group className="game-area">
          <GameTypeTitle>
            <img src="/assets/images/common/icon-table-game-group.svg" alt="table-game" />
            {i18n.t("web.home.Section1Electron")}
            <ViewAll onClick={() => navigateTo("/casino/table-game", GameTypeEnum.TABLEGAME)}>
              {i18n.t("common.all")}
            </ViewAll>
          </GameTypeTitle>
          <EmblaCarousel options={gameTypeEmblaOptions} hasControlButton={true}>
            <GameCardSlider data={tableGameList} />
          </EmblaCarousel>
        </Group>

        <Group className="game-area">
          <GameTypeTitle>
            <img src="/assets/images/common/icon-hot-game.svg" alt="hot" />
            {i18n.t("web.home.Section1HotGames")}
            <ViewAll onClick={() => navigateTo("/tag/hot", GameTypeEnum.HOT)}>
              {i18n.t("common.all")}
            </ViewAll>
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
