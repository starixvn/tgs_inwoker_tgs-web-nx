import EmblaCarousel from "@/components/project/embla-carousel";
import PlayIcon, { PlayButton } from "@/pages/home/components/PlayIcon";
import { media } from "@tgs-web-nx/constants";
import { getFormatAmount, i18n } from "@tgs-web-nx/utils";
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
    border-radius: 0.8rem !important;
  }

  ${media.sm} {
    flex-shrink: 0;
  }
`;

const RecentBigWinsSlide = styled.div`
  --slide-size: 7.4rem;
`;

const GameName = styled.div`
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
  name: string;
  amount: number;
  code: string;
};

const RecentBigWins = () => {
  const recentBigWins: BigWinType[] = [
    { name: "Itslon1", amount: 666465825, code: "itslon1" },
    { name: "Janganmurated", amount: 729129982, code: "janganmurated" },
    { name: "PERDITA", amount: 666465825, code: "perdita" },
    { name: "Itslon2", amount: 666465825, code: "itslon1" },
    { name: "Janganmurated2", amount: 729129982, code: "janganmurated" },
    { name: "PERDITA2", amount: 666465825, code: "perdita" },
    { name: "Itslon3", amount: 666465825, code: "itslon1" },
    { name: "Janganmurated4", amount: 729129982, code: "janganmurated" },
    { name: "PERDITA5", amount: 666465825, code: "perdita" },
    { name: "Itslon4", amount: 666465825, code: "itslon1" },
    { name: "Janganmurated5", amount: 729129982, code: "janganmurated" },
    { name: "PERDITA6", amount: 666465825, code: "perdita" },
  ];

  const emblaOptions: EmblaOptionsType = { loop: true, skipSnaps: true, align: "start" };
  const emblaPlugins: any = [Autoplay({ playOnInit: true, delay: 3000 })];

  return (
    <Group>
      <GameTypeTitle>
        <img src="/assets/images/common/icon-big-wins.svg" alt="hot" />
        {i18n.t("web.home.Section1RecentBigWins")}
      </GameTypeTitle>
      <EmblaCarousel options={emblaOptions} plugins={emblaPlugins}>
        {recentBigWins &&
          recentBigWins.map((item, index) => {
            return (
              <RecentBigWinsSlide className="embla__slide" key={index}>
                <GameContainer key={index}>
                  <GameIcon>
                    <img
                      className="icon"
                      src={`/assets/images/big-wins/desktop/${item.code}.png`}
                      alt={item.name}
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

                  <GameName>{item.name}</GameName>
                  <BigWinsAmount>{`đ${getFormatAmount(item.amount)}`}</BigWinsAmount>
                </GameContainer>
              </RecentBigWinsSlide>
            );
          })}
      </EmblaCarousel>
    </Group>
  );
};

export default RecentBigWins;
