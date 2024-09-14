import EmblaCarousel from "@/components/project/embla-carousel";
import PlayIcon, { PlayButton } from "@/pages/home/components/PlayIcon";
import { media } from "@tgs-web-nx/constants";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { getFormatAmount, i18n, utility } from "@tgs-web-nx/utils";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import styled from "styled-components";

import { GameTypeTitle, Group } from "../../style";

const CardHoverBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 0.8rem;
  background: ${({ theme }) => theme.gameCardBackgroundHover};
  backdrop-filter: blur(0.2rem);
  transition: opacity 0.15s linear;
  opacity: 0;
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.3rem;
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }

  ${media.sm} {
    &:hover {
      .game-icon {
        border: 1px solid #fff;
        transform: scale(1.1);
      }

      ${CardHoverBg} {
        opacity: 1;
      }
    }
  }
`;

const GameIcon = styled.div`
  position: relative;

  .icon {
    width: 7.4rem;
    height: 9.9rem;
    border-radius: 0.8rem !important;
    flex-shrink: 0;
  }
`;

const RecentBigWinsSlide = styled.div`
  --slide-size: 7.4rem;
`;

const GameName = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.white};
`;

const BigWinsAmount = styled.div`
  color: ${({ theme }) => theme.bigWinsAmountColor};
  text-align: right;
`;

const CustomPlayButton = styled(PlayButton)`
  transform: scale(0.5) !important;
`;

type BigWinType = {
  data: any[];
};

const RecentBigWins: React.FC<BigWinType> = (recentBigWins: BigWinType) => {
  const emblaOptions: EmblaOptionsType = { loop: true, skipSnaps: true, align: "start" };
  const emblaPlugins: any = [Autoplay({ playOnInit: true, delay: 3000 })];
  const { isDesktopSize } = useRwd();
  return (
    <Group>
      <GameTypeTitle>
        <img src="/assets/images/common/icon-big-wins.svg" alt="hot" />
        {i18n.t("web.home.Section1RecentBigWins")}
      </GameTypeTitle>
      <EmblaCarousel options={emblaOptions} plugins={emblaPlugins}>
        {recentBigWins.data.length > 0 &&
          recentBigWins.data.map((item, index) => {
            return (
              <RecentBigWinsSlide className="embla__slide" key={index}>
                <GameContainer key={index}>
                  <GameIcon>
                    <img
                      className="icon"
                      src={`${utility.imagePathGenerator(
                        `${item.gameProviderCode.toLowerCase()}/en-US/${item.gameCode}${
                          isDesktopSize ? "@1x" : "@2x"
                        }.webp`,
                      )}`}
                      alt={item.gameCode}
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

                  <GameName>{item.gameName}</GameName>
                  <BigWinsAmount>{`đ${getFormatAmount(item.winAmount)}`}</BigWinsAmount>
                </GameContainer>
              </RecentBigWinsSlide>
            );
          })}
      </EmblaCarousel>
    </Group>
  );
};

export default RecentBigWins;
