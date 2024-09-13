import EmblaCarousel from "@/components/project/embla-carousel";
import { useGetHomeCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { i18n, utility } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";

import GameCardSlider from "./components/GameSlider/GameCardSlider";
import {
  DesktopContainer,
  GameTypeContainer,
  GameTypeTitle,
  Group,
  ProviderItem,
  ViewAll,
} from "./style";

const HomeCategory = () => {
  const history = useHistory();
  const { providerList } = useHomeGameContext();
  const { sportGameList, liveCasinoList, slotGameList, newGameList, hotGameList, tableGameList } =
    useGetHomeCategoryList();

  // const recentBigWins = [
  //   { name: "Itslon1", amount: 666465825, code: "itslon1" },
  //   { name: "Janganmurated", amount: 729129982, code: "janganmurated" },
  //   { name: "PERDITA", amount: 666465825, code: "perdita" },
  // ];

  const navigateTo = (pageName: string) => {
    history.push("/main/" + pageName);
    window.scroll({ top: 0, behavior: "smooth" });
  };

  return (
    <DesktopContainer>
      <GameTypeContainer>
        {/* <RecentBigWins recentBigWins={recentBigWins}></RecentBigWins> */}
        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-sports-group.svg" alt="hot" />
            {i18n.t("web.home.Section1Sport")}
            <ViewAll onClick={() => navigateTo("sports")}>{i18n.t("common.all")}</ViewAll>
          </GameTypeTitle>
          <EmblaCarousel>
            <GameCardSlider data={sportGameList} />
          </EmblaCarousel>
        </Group>

        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-popular-slots.svg" alt="slot" />
            {i18n.t("web.home.Section1Slot")}
            <ViewAll onClick={() => navigateTo("slots")}>{i18n.t("common.all")}</ViewAll>
          </GameTypeTitle>
          <EmblaCarousel extraClassName="two-rows">
            <GameCardSlider data={slotGameList} />
          </EmblaCarousel>
        </Group>

        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-live-casino-group.svg" alt="slot" />
            {i18n.t("web.home.Section1Live")}
            <ViewAll onClick={() => navigateTo("liveCasino")}>{i18n.t("common.all")}</ViewAll>
          </GameTypeTitle>
          <EmblaCarousel>
            <GameCardSlider data={liveCasinoList} />
          </EmblaCarousel>
        </Group>

        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-new-release.svg" alt="hot" />
            {i18n.t("web.home.Section1NewRelease")}
            <ViewAll>{i18n.t("common.all")}</ViewAll>
          </GameTypeTitle>
          <EmblaCarousel>
            <GameCardSlider data={newGameList} />
          </EmblaCarousel>
        </Group>

        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-game-providers.svg" alt="hot" />
            {i18n.t("web.home.Section1GameProviders")}
          </GameTypeTitle>
          <EmblaCarousel extraClassName="providers two-rows">
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
            {i18n.t("common.all")}
          </GameTypeTitle>
          <EmblaCarousel>
            <GameCardSlider data={tableGameList} />
          </EmblaCarousel>
        </Group>

        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-hot-game.svg" alt="hot" />
            {i18n.t("web.home.Section1HotGames")}
            <ViewAll>{i18n.t("common.all")}</ViewAll>
          </GameTypeTitle>
          <EmblaCarousel>
            <GameCardSlider data={hotGameList} />
          </EmblaCarousel>
        </Group>
      </GameTypeContainer>
    </DesktopContainer>
  );
};

export default HomeCategory;
