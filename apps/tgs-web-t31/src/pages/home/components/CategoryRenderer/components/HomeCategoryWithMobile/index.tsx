import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { Common, i18n } from "@tgs-web-nx/utils";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import {
  useGetLobbyCategoryList,
  useGetNonLobbyCategoryList,
  useHomeGameContext,
} from "@tgs-web-nx/core/features";
import { useEffect } from "react";
import config from "@tgs-web-nx/config";
import GameCard from "../../../GameCard";
import MobileVendorCard from "@/pages/home/components/VendorCard/mobile";
import arrowImg from "@/assets/t31/images/home/arrow.svg";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 6px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 6px;
  margin: 12px 0;
`;

const CategoryContentWrapper = styled.div`
  overflow-y: auto;
  height: 100%;
  width: calc(100% - 78px);
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.mainBackground};
`;

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  width: 100%;
  row-gap: 13px;
  column-gap: 9px;
  align-self: stretch;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 510;
  line-height: 31px;
  letter-spacing: 0em;
  text-align: left;
`;

const Arrow = styled.div``;

const HomeCategoryWithMobile = () => {
  const { activeGameType } = useHomeGameContext();
  const { account } = useAccountStore();
  const history = useHistory();
  const { sportCategoryList, liveCategoryList } = useGetLobbyCategoryList();
  const { fetchSlotList, fetchTableList, slotList, tableList } = useGetNonLobbyCategoryList();

  useEffect(() => {
    fetchSlotList();
    fetchTableList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const launchLobbyGame = (gpcode: string) => {
    if (!account.token) {
      history.push("/login");
      return;
    }

    if (activeGameType === GameTypeEnum.COCKFIGHT) {
      // 以後SM01不會開,多新增AWC_COCKFIGHT(缺對應api)
      if (gpcode === "SM01") {
        const gameWindow = window.open("", "Cockfight");
        if (gameWindow) {
          GameService.GetCockfight()
            .then((res) => {
              gameWindow.document.write(res?.data);
              gameWindow.document.close();
              gameWindow.focus();
            })
            .catch(() => {
              gameWindow.close();
            });
        }
      } else {
        Common.closePreviousPopup();
        Common.PopupCenter(`/joinlobbygame/${GameTypeEnum.SPORTS}/${gpcode}`, "gamewindow");
      }
    } else {
      const audioElement = document.getElementById("audio") as HTMLAudioElement | null;
      if (audioElement) {
        audioElement.volume = 0;
      }
      Common.closePreviousPopup();
      Common.PopupCenter(`/joinlobbygame/${activeGameType}/${gpcode}`, "gamewindow");
    }
  };

  const hasMappingData = !!sportCategoryList.length;
  const hasMappingDataWithLive = !!liveCategoryList.length;
  const hasMappingDataWithSlot = !!slotList.length;
  const hasMappingDataWithTable = !!tableList.length;

  return (
    <MainWrapper>
      <Wrapper>
        <CategoryContentWrapper>
          <TitleWrapper>
            <Title> {i18n.t("common.sports")}</Title>
            <Arrow>
              <img src={arrowImg} alt="arrow" />
            </Arrow>
          </TitleWrapper>
          <CategoryContent>
            {hasMappingData &&
              sportCategoryList.map((provider) => {
                const { code, status, name } = provider;

                if (code === "BC") return null;
                return (
                  <MobileVendorCard
                    key={code}
                    bgUrl={`/assets/images/home/mobile/sports/bg.png`}
                    imageUrl={`/assets/images/home/mobile/sports/${code}.png`}
                    venderLogoUrl={`/assets/images/home/provider_logo/sports/${code}.png`}
                    launchGame={() => launchLobbyGame(code)}
                    status={status}
                    venderName={name}
                  />
                );
              })}
            {!hasMappingData && <div>No data</div>}
          </CategoryContent>
        </CategoryContentWrapper>
      </Wrapper>
      <Wrapper>
        <CategoryContentWrapper>
          <TitleWrapper>
            <Title> {i18n.t("common.live")}</Title>
            <Arrow>
              <img src={arrowImg} alt="arrow" />
            </Arrow>
          </TitleWrapper>
          <CategoryContent>
            {hasMappingDataWithLive &&
              liveCategoryList.map((provider) => {
                const { code, status, name } = provider;
                if (code === "BC") return null;
                return (
                  <MobileVendorCard
                    key={code}
                    bgUrl={`/assets/images/home/mobile/liveCasino/bg.png`}
                    imageUrl={`/assets/images/home/mobile/liveCasino/${code}.png`}
                    venderLogoUrl={`/assets/images/home/provider_logo/liveCasino/${code}.png`}
                    launchGame={() => launchLobbyGame(code)}
                    status={status}
                    venderName={name}
                  />
                );
              })}
            {!hasMappingDataWithLive && <div>No data</div>}
          </CategoryContent>
        </CategoryContentWrapper>
      </Wrapper>
      <Wrapper>
        <CategoryContentWrapper>
          <TitleWrapper>
            <Title> {i18n.t("common.slot")}</Title>
            <Arrow>
              <img src={arrowImg} alt="arrow" />
            </Arrow>
          </TitleWrapper>
          <CategoryContent>
            {hasMappingDataWithSlot &&
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              slotList.map((gameItem: any) => (
                <GameCard
                  key={gameItem.id}
                  gameItem={gameItem}
                  isActive={gameItem.isactive}
                  imageUrl={`${
                    config.sourceUrl
                  }${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                    gameItem.code
                  }.jpg`}
                />
              ))}
            {!hasMappingDataWithSlot && <div>No data</div>}
          </CategoryContent>
        </CategoryContentWrapper>
      </Wrapper>
      <Wrapper>
        <CategoryContentWrapper>
          <TitleWrapper>
            <Title> {i18n.t("common.egame")}</Title>
            <Arrow>
              <img src={arrowImg} alt="arrow" />
            </Arrow>
          </TitleWrapper>
          <CategoryContent>
            {hasMappingDataWithTable &&
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              tableList.map((gameItem: any) => (
                <GameCard
                  key={gameItem.id}
                  gameItem={gameItem}
                  isActive={gameItem.isactive}
                  imageUrl={`${
                    config.sourceUrl
                  }${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                    gameItem.code
                  }.jpg`}
                />
              ))}
            {!hasMappingDataWithTable && <div>No data</div>}
          </CategoryContent>
        </CategoryContentWrapper>
      </Wrapper>
    </MainWrapper>
  );
};

export default HomeCategoryWithMobile;
