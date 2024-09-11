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

const ProvideItem = styled.div`
  background-color: #1c2532;
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
    background: #2e353e;

    &:disabled .icon {
      color: #6e7e92;
    }
  }
`;

const HomeCategory = () => {
  const history = useHistory();
  const { providerList } = useHomeGameContext();
  const { sportGameList, liveCasinoList, slotGameList, newGameList, hotGameList, tableGameList } = useGetHomeCategoryList();

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
            {i18n.t("common.sports")}
            <ViewAll onClick={() => navigateTo("sports")}>
              <span className="text">All</span>
            </ViewAll>
          </GameTypeTitle>
          <EmblaCarousel>
            <VendorCardSlider data={sportGameList} gameType={"sports"} />
          </EmblaCarousel>
        </Group>

        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-popular-slots.svg" alt="slot" />
            Slots
            <ViewAll onClick={() => navigateTo("slots")}>
              <span className="text">All</span>
            </ViewAll>
          </GameTypeTitle>
          <EmblaCarousel extraClassName="two-rows">
            <GameCardSlider data={slotGameList} />
          </EmblaCarousel>
        </Group>

        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-live-casino-group.svg" alt="slot" />
            {i18n.t("common.live")}
            <ViewAll onClick={() => navigateTo("liveCasino")}>
              <span className="text">All</span>
            </ViewAll>
          </GameTypeTitle>
          <EmblaCarousel>
            <VendorCardSlider data={liveCasinoList} gameType={"liveCasino"} />
          </EmblaCarousel>
        </Group>

        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-new-release.svg" alt="hot" />
            New Release
            <ViewAll>
              <span className="text">All</span>
            </ViewAll>
          </GameTypeTitle>
          <EmblaCarousel>
            <GameCardSlider data={newGameList} />
          </EmblaCarousel>
        </Group>

        <Group>
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
        </Group>

        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-table-game-group.svg" alt="hot" />
            Table Games
            <ViewAll>All</ViewAll>
          </GameTypeTitle>
          <EmblaCarousel>
            <GameCardSlider data={tableGameList} />
          </EmblaCarousel>
        </Group>

        <Group>
          <GameTypeTitle>
            <img src="/assets/images/common/icon-hot-game.svg" alt="hot" />
            Hot Games
            <ViewAll>
              <span className="text">All</span>
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
