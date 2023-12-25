import React from "react";
import styled from "styled-components";
import { GameItem } from "@tgs-web-nx/types";
import Slider from "react-slick";
import config from "@tgs-web-nx/config";
import { Common } from "@tgs-web-nx/utils";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import LoadingBlock from "@/components/project/LoadingBlock";
import GameCard from "@/pages/home/components/GameCard";
import MobileVendorCard from "@/pages/home/components/VendorCard/mobile";
import { useCategorySlider } from "@/pages/home/components/CategoryRenderer/components/HomeCategory/GameTypeCategory/hooks/useCategorySlider";

const CategorySliderContainer = styled.div`
  padding: 8px 0px;
`;

const SlickDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4d8ab9;
`;

const DotsContainer = styled.div`
  li {
    width: 8px;
    height: 8px;
  }
  & .slick-active {
    & div {
      background: white;
    }
  }
`;

const sliderSettings = {
  dots: true,
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "0",
  slidesToShow: 2,
  slidesToScroll: 1,
  speed: 500,
  arrows: false,
  autoplay: true,

  appendDots: (dots: any) => (
    <DotsContainer
      style={{
        display: "none",
      }}
    >
      <ul>{dots}</ul>
    </DotsContainer>
  ),
  customPaging: (i: number) => {
    return <SlickDot key={i} />;
  },
};

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

  if (isLobbyCategory) {
    return (
      <CategorySliderContainer>
        {!filteredGameList.length && <LoadingBlock size={16} />}
        {!hasMappingData && <div>No data</div>}

        <Slider {...sliderSettings}>
          {hasMappingData &&
            lobbyCategoryList.map((provider) => {
              const { code: gpCode, status, name } = provider;

              if (gpCode === "BC") return null;
              return (
                <MobileVendorCard
                  key={gpCode}
                  bgUrl={`/assets/images/home/mobile/${gameTypeKey}/mbg.png`}
                  imageUrl={`/assets/images/home/mobile/${gameTypeKey}/${gpCode}.png`}
                  venderLogoUrl={`/assets/images/home/provider_logo/${gameTypeKey}/${gpCode}.png`}
                  launchGame={() => launchLobbyGame(gpCode)}
                  status={status}
                  venderName={name}
                  style={{
                    width: "100%",
                  }}
                />
              );
            })}
        </Slider>
      </CategorySliderContainer>
    );
  }

  return (
    <CategorySliderContainer>
      {!filteredGameList.length && <LoadingBlock size={16} />}
      <Slider {...sliderSettings}>
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
                width: "100%",
              }}
            />
          );
        })}
      </Slider>
    </CategorySliderContainer>
  );
};

export default React.memo(CategorySlider);
