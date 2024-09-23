import AppearSensor from "@/components/project/AppearSensor";
import { LoadingIcon, NoGameIcon } from "@/pages/home/components/GameCard/icons";
import { RecentBigWinItem } from "@tgs-web-nx/types";
import { utility } from "@tgs-web-nx/utils";
import { Img } from "react-image";

import { BigWinsAmount, CardHoverBg, CustomPlayButton, GameContainer, GameIcon, GameName, RecentBigWinsSlide } from "./style";

const RecentBigWinsItem: React.FC<{
  item: RecentBigWinItem;
  launchGame: (gameId: number, gameProviderCode: string) => void;
}> = ({ item, launchGame }) => {
  const { gameId, gameProviderCode, gameCode, playerName, winAmount } = item;
  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <AppearSensor>
      {
        // @ts-ignore
        ({ hasBeenVisible }) => (
          <RecentBigWinsSlide className="embla__slide">
            <GameContainer>
              <GameIcon
                onClick={() => {
                  launchGame(gameId, gameProviderCode);
                }}
              >
                {hasBeenVisible && (
                  <Img
                    className="icon"
                    src={utility.getGameUrl(gameProviderCode, gameCode, true)}
                    loader={<LoadingIcon />}
                    unloader={<NoGameIcon />}
                  />
                )}

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

              <GameName>{playerName}</GameName>
              <BigWinsAmount>{`${formatter.format(winAmount)}`}</BigWinsAmount>
            </GameContainer>
          </RecentBigWinsSlide>
        )
      }
    </AppearSensor>
  );
};

export default RecentBigWinsItem;
