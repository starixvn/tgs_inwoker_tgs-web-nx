import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { VipData } from "@tgs-web-nx/types";
import { useBettingBonus, useRwd, useVipBonusListV2 } from "@tgs-web-nx/core/hooks";
import config, { mapBrandName, brandConfig } from "@tgs-web-nx/config";

import { i18n } from "@tgs-web-nx/utils";
import { media } from "@/theme/breakpoints";
import rightArrow from "@/assets/t29/images/vip/VIP_right_arrow.png";
import leftArrow from "@/assets/t29/images/vip/VIP_left_arrow.png";

const ScrollableContainer = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  ${media.sm} {
    width: 100%;
    scroll-snap-type: unset;

    &::-webkit-scrollbar {
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
      background: ${(props) => props.theme.gray10};
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: #53535375;
    }

    &::-webkit-scrollbar-track-piece {
      background: transparent;
    }
  }
`;

const LevelIcon = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

const VIPTable = styled.table`
  table-layout: fixed;
  width: 100%;
  background: ${(props) => props.theme.mainBackground};
  padding: 10px;
  border-collapse: collapse;
`;

const RowItem = styled.td`
  color: ${(props) => props.theme.black};
  word-wrap: break-word;
  white-space: pre-wrap;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 400;
  width: 100%;
  padding: 0px 20px;
  color: #276aa5;
  ${media.sm} {
    padding: 20px;
    font-size: 1rem;
  }
`;

const HeaderRowItem = styled(RowItem)<{ $width: string }>`
  width: ${({ $width }) => $width};
  font-weight: 700;
  padding: 20px;
`;

const BorderRowItem = styled(RowItem)`
  ${media.sm} {
    border-top: ${({ theme }) => `1px solid ${theme.gray10}`};
    border-bottom: ${({ theme }) => `1px solid ${theme.gray10}`};
  }
`;

const FixRowItem = styled(RowItem)`
  width: 120px;
  position: sticky;
  left: 0;
  background: ${(props) => props.theme.mainBackground};
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0em;
`;
const BorderFixRowItem = styled(FixRowItem)`
  ${media.sm} {
    border-top: ${({ theme }) => `1px solid ${theme.gray10}`};
    border-bottom: ${({ theme }) => `1px solid ${theme.gray10}`};
  }
`;

const TopHeader = styled.tr`
  & *:nth-child(2) {
    background: ${({ theme }) => theme.blue20};
  }
`;

const BottomHeader = styled.tr<{ $index: number }>`
  & *:nth-child(${(props) => props.$index}) {
    background: ${({ theme }) => theme.blue20};
  }
  & *:nth-child(${(props) => props.$index + 1}) {
    background: ${({ theme }) => theme.blue20};
  }
`;

const Body = styled(BottomHeader)``;

const Arrow = styled.div<{ scrollLeft: number; scrollToMax: boolean }>`
  position: absolute;
  top: 50%;
  right: ${({ scrollLeft }) => `${0 - scrollLeft}px`};
  z-index: 100;
  visibility: ${({ scrollToMax }) => (scrollToMax ? "hidden" : "visible")};
  & img {
    cursor: pointer;
    width: 50px;
    height: 50px;
  }
`;

const LeftArrow = styled.div<{ scrollLeft: number; scrollToMax: boolean }>`
  position: absolute;
  top: 50%;
  left: ${({ scrollLeft }) => `${scrollLeft}px`};
  z-index: 100;
  visibility: ${({ scrollToMax }) => (scrollToMax ? "hidden" : "visible")};
  & img {
    cursor: pointer;
    width: 50px;
    height: 50px;
  }
`;

type Props = {
  vipSortingData: VipData[];
};

const BonusTable = ({ vipSortingData }: Props) => {
  const { vipBonusList } = useVipBonusListV2();
  const { isDesktopSize } = useRwd();
  const { productRebateByLevel } = useBettingBonus();
  const hideBirthdayBonus = brandConfig[mapBrandName(config.brand)].isHideVIPBirthdayBonus;
  const hideQuarterlyBonus = brandConfig[mapBrandName(config.brand)].isHideVIPQuarterlyBonus;
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollToRight, setScrollToRight] = useState(false);
  const [scrollToLeft, setScrollToLeft] = useState(false);

  const titleList = [...vipBonusList];
  const offset = 120;
  productRebateByLevel.map((gametype) => {
    titleList.push({
      key: gametype.name,
      label: gametype.label,
    });
  });

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const isScrollToRight = scrollLeft + clientWidth >= scrollWidth;
        const isScrollToLeft = scrollLeft === 0;
        setScrollLeft(scrollLeft);
        setScrollToRight(isScrollToRight);
        setScrollToLeft(isScrollToLeft);
      }
    };

    scrollRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      scrollRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTableToRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollLeft + offset;
    }
  };

  const handleScrollTableToLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollLeft - offset;
    }
  };

  return (
    <ScrollableContainer ref={scrollRef}>
      <Arrow scrollLeft={scrollLeft} scrollToMax={scrollToRight}>
        <img
          src={rightArrow}
          alt="right"
          onClick={() => {
            handleScrollTableToRight();
          }}
        />
      </Arrow>
      <LeftArrow scrollLeft={scrollLeft} scrollToMax={scrollToLeft}>
        <img
          src={leftArrow}
          alt="left"
          onClick={() => {
            handleScrollTableToLeft();
          }}
        />
      </LeftArrow>
      <VIPTable>
        <thead>
          <TopHeader>
            <HeaderRowItem
              $width={isDesktopSize ? "473px" : "390px"}
              colSpan={!hideBirthdayBonus && !hideQuarterlyBonus ? 4 : 2}
            >
              {i18n.t("vip.bonus")}
            </HeaderRowItem>
            <HeaderRowItem $width={isDesktopSize ? "252px" : "230px"} colSpan={2}>
              {i18n.t("vip.levelUp")}
            </HeaderRowItem>
            <HeaderRowItem $width={isDesktopSize ? "756px" : "630px"} colSpan={6}>
              {i18n.t("vip.vipBenefit")}
            </HeaderRowItem>
          </TopHeader>
          <BottomHeader $index={!hideBirthdayBonus && !hideQuarterlyBonus ? 5 : 3}>
            {titleList.map((bonus) =>
              bonus.key === "VIP" ? (
                <BorderFixRowItem key={bonus.key}>{bonus.label}</BorderFixRowItem>
              ) : (
                <BorderRowItem key={bonus.key}>{bonus.label}</BorderRowItem>
              ),
            )}
          </BottomHeader>
        </thead>
        <tbody>
          {vipSortingData.map((vipData) => {
            return (
              <Body key={vipData.level} $index={!hideBirthdayBonus && !hideQuarterlyBonus ? 5 : 3}>
                <FixRowItem>
                  <LevelIcon>
                    <img
                      width={"50px"}
                      height={"50px"}
                      src={`${import.meta.env.BASE_URL}assets/images/vip/level_${
                        vipData.level
                      }.webp`}
                      alt={`level_${vipData.level}`}
                    />
                    <span>VIP{vipData.level}</span>
                  </LevelIcon>
                </FixRowItem>
                <RowItem>{vipData.promotionBenefit}</RowItem>
                {!hideBirthdayBonus && <RowItem>{vipData.birthBenefit}</RowItem>}
                {!hideQuarterlyBonus && <RowItem>{vipData.quarterlyBenefit}</RowItem>}
                <RowItem>{vipData.levelUpAccumulateDeposit}</RowItem>
                <RowItem>{vipData.levelUpAccumulateBetAmount}</RowItem>
                <RowItem>{`${vipData.liveDealerRebate}%`}</RowItem>
                <RowItem>{`${vipData.slotRebate}%`}</RowItem>
                <RowItem>{`${vipData.cardGameRebate}%`}</RowItem>
                <RowItem>{`${vipData.sportsRebate}%`}</RowItem>
                <RowItem>{`${vipData.virtualSportsRebate}%`}</RowItem>
                <RowItem>{`${vipData.lotteryRebate}%`}</RowItem>
              </Body>
            );
          })}
        </tbody>
      </VIPTable>
    </ScrollableContainer>
  );
};

export default BonusTable;
