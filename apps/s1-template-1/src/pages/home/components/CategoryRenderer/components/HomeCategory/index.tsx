import EmblaCarousel from "@/components/project/embla-carousel";
import { GameTypeEnum, media } from "@tgs-web-nx/constants";
import { useGetHomeCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { i18n, utility } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import GameCardSlider from "./components/GameSlider/GameCardSlider";
import VendorCardSlider from "./components/GameSlider/VendorCardSlider";

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
  margin-top: 2.4rem;
  margin-bottom: 0.8rem;
  gap: 0.8rem;

  ${media.md} {
    margin-top: 3.2rem;
  }

  &:first-child {
    margin-top: 0;
  }

  & > img {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const ViewAll = styled.div`
  position: absolute;
  right: 0.8rem;
  color: ${({ theme }) => theme.linkColor};
  font-size: 1.3rem;
  cursor: pointer;
`;

const GameTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProvideItem = styled.div`
  background-color: #1c2532;
  width: 113px;
  height: 60px;
  border-radius: 1rem;

  > img {
    max-width: 100%;
  }
`;

const HomeCategory = () => {
  const history = useHistory();
  const { providerList } = useHomeGameContext();
  const { hotSlotGameList, newGameList, hotGameList, hotTableGameList } = useGetHomeCategoryList();
  const liveCasinoList = providerList.filter((provider) => {
    return provider.gametypes.includes(GameTypeEnum.LIVELOBBY);
  });
  const sportList = providerList.filter((provider) => {
    return provider.gametypes.includes(GameTypeEnum.SPORTS);
  });

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
        <GameTypeTitle>
          <img src="/assets/images/common/icon-sports-group.svg" alt="hot" />
          {i18n.t("common.sports")}
          <ViewAll onClick={() => navigateTo("sports")}>View All</ViewAll>
        </GameTypeTitle>

        <EmblaCarousel>
          <VendorCardSlider data={sportList} gameType={"sports"} />
        </EmblaCarousel>
        <GameTypeTitle>
          <img src="/assets/images/common/icon-popular-slots.svg" alt="slot" />
          Slots
          <ViewAll onClick={() => navigateTo("slots")}>View All</ViewAll>
        </GameTypeTitle>
        <EmblaCarousel extraClassName="two-rows">
          <GameCardSlider data={hotSlotGameList} />
        </EmblaCarousel>

        <GameTypeTitle>
          <img src="/assets/images/common/icon-live-casino-group.svg" alt="slot" />
          {i18n.t("common.live")}
          <ViewAll onClick={() => navigateTo("liveCasino")}>View All</ViewAll>
        </GameTypeTitle>
        <EmblaCarousel>
          <VendorCardSlider data={liveCasinoList} gameType={"liveCasino"} />
        </EmblaCarousel>

        <GameTypeTitle>
          <img src="/assets/images/common/icon-new-release.svg" alt="hot" />
          New Release
          <ViewAll>View All</ViewAll>
        </GameTypeTitle>
        <EmblaCarousel>
          <GameCardSlider data={newGameList} />
        </EmblaCarousel>

        <GameTypeTitle>
          <img src="/assets/images/common/icon-game-providers.svg" alt="hot" />
          Game Providers
        </GameTypeTitle>
        <EmblaCarousel extraClassName="providers two-rows">
          {providerList.map((provider, index) => {
            return (
              <div className="embla__slide " key={index}>
                <ProvideItem>
                  <img
                    src={utility.imagePathGenerator(
                      `provider/dark/${provider.code.toLowerCase()}.png`,
                    )}
                    alt="Provider"
                  />
                </ProvideItem>
              </div>
            );
          })}
        </EmblaCarousel>

        <GameTypeTitle>
          <img src="/assets/images/common/icon-table-game-group.svg" alt="hot" />
          Table Games
          <ViewAll>View All</ViewAll>
        </GameTypeTitle>
        <EmblaCarousel>
          <GameCardSlider data={hotTableGameList} />
        </EmblaCarousel>

        <GameTypeTitle>
          <img src="/assets/images/common/icon-hot-game.svg" alt="hot" />
          Hot Games
          <ViewAll>View All</ViewAll>
        </GameTypeTitle>
        <EmblaCarousel>
          <GameCardSlider data={hotGameList} />
        </EmblaCarousel>
      </GameTypeContainer>
    </DesktopContainer>
  );
};

export default HomeCategory;
