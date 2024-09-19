import { useRwd } from "@tgs-web-nx/core/hooks";
import { utility } from "@tgs-web-nx/utils";
import { Img } from "react-image";

import { RecentBigWinItem } from "@tgs-web-nx/types";
import { BigWinsAmount, CardHoverBg, CustomPlayButton, GameContainer, GameIcon, GameName, RecentBigWinsSlide } from "./style";
import { LoadingIcon, NoGameIcon } from "@/pages/home/components/GameCard/icons";

const RecentBigWinsItem: React.FC<{
  item: RecentBigWinItem;
  launchGame: (gameId: number, gameProviderCode: string) => void;
}> = ({ item, launchGame }) => {
  const { isDesktopSize } = useRwd();
  const { gameId, gameProviderCode, gameCode, playerName, winAmount } = item;
  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <RecentBigWinsSlide className="embla__slide">
      <GameContainer
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

        <GameName>{playerName}</GameName>
        <BigWinsAmount>{`${formatter.format(winAmount)}`}</BigWinsAmount>
      </GameContainer>
    </RecentBigWinsSlide>
  );
};

export default RecentBigWinsItem;
