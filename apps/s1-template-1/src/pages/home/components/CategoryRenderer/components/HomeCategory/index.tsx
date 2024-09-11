import EmblaCarousel from "@/components/project/embla-carousel";
import { media } from "@tgs-web-nx/constants";
import { useGetHomeCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { i18n, utility } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import GameCardSlider from "./components/GameSlider/GameCardSlider";

const DesktopContainer = styled.div`
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  padding: 1.8rem 0;

  ${media.md} {
    padding: 2.4rem 0;
  }
`;

export const GameContainer = styled.div`
  width: 100%;
  overflow: auto;
  display: flex;
  gap: 0.8rem;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const GameTypeTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.5;
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
  gap: 0.8rem;

  & > img {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const ViewAll = styled.div`
  position: absolute;
  right: 7.6rem;
  display: flex;
  align-items: center;
  height: 3.2rem;
  line-height: 3.2rem;
  padding: 0 0.8rem;
  border-radius: 0.8rem;
  background: #2e353e;
  color: ${({ theme }) => theme.white};
  font-size: 1.3rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.slideNextButtonBackground};
  }

  .text {
    position: relative;
    top: 1px;
  }

  &:after {
    content: "";
    width: 0.9rem;
    height: 1.4rem;
    margin-left: 1.2rem;
    background: url("/assets/images/common/icon-view-all.svg") center;
  }
`;

const GameTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  ${media.md} {
    gap: 3.2rem;
  }
`;

const ProviderItem = styled.div`
  background-color: ${({ theme }) => theme.providerItemBackground};
  width: 11.3rem;
  height: 6rem;
  border-radius: 1rem;

  > img {
    max-width: 100%;
  }
`;

const Group = styled.div`
  position: relative;

  .embla__controls {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: 0;
    gap: 0;
  }

  .embla__buttons {
    gap: 0.4rem;
  }

  .embla__button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 3.2rem;
    height: 3.2rem;
    padding: 0.8rem;
    border-radius: 0.8rem;
    background-color: ${({ theme }) => theme.slideNextButtonBackground};
    color: ${({ theme }) => theme.slideNextButtonColor};

    &[disabled] {
      background-color: ${({ theme }) => theme.disabledSlideNextButtonBackground};
      .icon {
        color: ${({ theme }) => theme.disabledSlideNextButtonColor};
      }
    }

    &:hover:not([disabled]) {
      background-color: ${({ theme }) => theme.slideNextButtonBackgroundHover};
    }
  }
`;

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

  console.log("----------useGetHomeCategoryList()", useGetHomeCategoryList());

  return (
    <DesktopContainer>
      <GameTypeContainer>
        {/* <RecentBigWins recentBigWins={recentBigWins}></RecentBigWins> */}
        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-sports-group.svg" alt="hot" />
            {i18n.t("web.home.Section1Sport")}
            <ViewAll onClick={() => navigateTo("sports")}>
              <span className="text">{i18n.t("common.all")}</span>
            </ViewAll>
          </GameTypeTitle>
          <EmblaCarousel>
            <GameCardSlider data={sportGameList} />
          </EmblaCarousel>
        </Group>

        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-popular-slots.svg" alt="slot" />
            {i18n.t("web.home.Section1Slot")}
            <ViewAll onClick={() => navigateTo("slots")}>
              <span className="text">{i18n.t("common.all")}</span>
            </ViewAll>
          </GameTypeTitle>
          <EmblaCarousel extraClassName="two-rows">
            <GameCardSlider data={slotGameList} />
          </EmblaCarousel>
        </Group>

        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-live-casino-group.svg" alt="slot" />
            {i18n.t("web.home.Section1Live")}
            <ViewAll onClick={() => navigateTo("liveCasino")}>
              <span className="text">{i18n.t("common.all")}</span>
            </ViewAll>
          </GameTypeTitle>
          <EmblaCarousel>
            <GameCardSlider data={liveCasinoList} />
          </EmblaCarousel>
        </Group>

        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-new-release.svg" alt="hot" />
            {i18n.t("web.home.Section1NewRelease")}
            <ViewAll>
              <span className="text">{i18n.t("common.all")}</span>
            </ViewAll>
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
                      src={utility.imagePathGenerator(`provider/dark/${providerName}.png`)}
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
          <EmblaCarousel>
            <GameCardSlider data={tableGameList} />
          </EmblaCarousel>
        </Group>

        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-hot-game.svg" alt="hot" />
            {i18n.t("web.home.Section1HotGames")}
            <ViewAll>
              <span className="text">{i18n.t("common.all")}</span>
            </ViewAll>
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
