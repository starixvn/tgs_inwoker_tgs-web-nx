import React, { useMemo } from "react";
import styled from "styled-components";
import { GameItem } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import { Common } from "@tgs-web-nx/utils";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useRwd } from "@tgs-web-nx/core/hooks";
import LoadingBlock from "@/components/project/LoadingBlock";
import GameCard from "@/pages/home/components/GameCard";
import MobileVendorCard from "@/pages/home/components/VendorCard/mobile";
import { useCategorySlider } from "@/pages/home/components/CategoryRenderer/components/HomeCategory/GameTypeCategory/hooks/useCategorySlider";

const CategorySliderContainer = styled.div`
  padding: 8px 0;
  display: flex;
  gap: 14px;
  overflow-x: auto;
`;

type Props = {
  gameType: GameTypeEnum;
  gameList: GameItem[];
};

const CategorySlider = ({ gameType, gameList = [] }: Props) => {
  const {
    filteredGameList,
    lobbyCategoryList,
    launchLobbyGame,
    isLobbyCategory,
    hasMappingData,
    gameTypeKey,
  } = useCategorySlider(gameType, gameList);

  const { isLargeDesktopSize, isDesktopSize } = useRwd();

  const cardWidth = useMemo(() => {
    if (isLargeDesktopSize) return "calc((100% - 14px * 5)/6)";

    if (isDesktopSize) return "calc((100% - 14px * 3)/4)";

    return "calc((100% - 14px * 1)/2)";
  }, [isLargeDesktopSize, isDesktopSize]);

  if (isLobbyCategory) {
    return (
      <CategorySliderContainer>
        {!filteredGameList.length && <LoadingBlock size={16} />}
        {!hasMappingData && <div>No data</div>}

        {hasMappingData &&
          lobbyCategoryList.map((provider) => {
            const { code: gpCode, status, name } = provider;

            if (gpCode === "BC") return null;
            return (
              <MobileVendorCard
                key={gpCode}
                imageUrl={`/assets/images/home/${gameTypeKey}/${gpCode}.png`}
                venderLogoUrl={`/assets/images/home/provider_logo/${gameTypeKey}/${gpCode}.png`}
                launchGame={() => launchLobbyGame(gpCode)}
                status={status}
                venderName={name}
                style={{
                  width: cardWidth,
                  flexShrink: 0,
                }}
              />
            );
          })}
      </CategorySliderContainer>
    );
  }

  return (
    <CategorySliderContainer>
      {!filteredGameList.length && <LoadingBlock size={16} />}
      {filteredGameList.map((gameItem) => {
        return (
          <GameCard
            key={gameItem.id}
            gameItem={gameItem}
            isActive={gameItem.isactive}
            imageUrl={`${
              config.sourceUrl
            }${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
              gameItem.code
            }.jpg`}
            style={{
              width: cardWidth,
              flexShrink: 0,
            }}
          />
        );
      })}
    </CategorySliderContainer>
  );
};

export default React.memo(CategorySlider);
