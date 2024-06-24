import { useState } from "react";
import styled from "styled-components";
import { useBettingBonus, useRwd } from "@tgs-web-nx/core/hooks";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { media } from "@/theme/breakpoints";
import Loading from "@/components/UI/Loading";
import { PageContainer } from "@/components/styled-component/PageContainer";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";

const VipBanner = styled.div<{ $imageUrl: string }>`
  width: 100%;
  padding-top: 34.5%;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 6px;

  ${media.sm} {
    padding-top: 27%;
  }
`;

const VipBannerWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.mainBackground};
  margin-bottom: 8px;
`;

const VipContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  gap: 16px;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    padding: 20px;
    gap: 40px;
  }
`;

const VIPIconWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  gap: 20px;
  ${media.sm} {
    justify-content: space-between;
    gap: 0px;
  }
`;

const VIPIcon = styled.div<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${({ theme, $active }) => ($active ? theme.primary : theme.white)};
  flex-shrink: 0;
  max-width: 60px;
  ${media.sm} {
    max-width: unset;
  }
`;

const VIPText = styled.div`
  margin-top: 5px;
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 20px;
  flex-wrap: wrap;
`;

const VIPInfoWrapper = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  gap: 20px;
  ${media.sm} {
    gap: 40px;
  }
`;

const TitleBlock = styled.div<{ $width: string }>`
  width: ${({ $width }) => $width};
  height: 26px;
  margin: 0 auto;
  padding: 20px 0;
  border-radius: 5px;
  background: ${({ theme }) => theme.grey05};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.white};
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
  ${media.sm} {
    height: 63px;
  }
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  & > div {
    padding: 0 20px;
    width: 100%;
    display: flex;
    color: ${({ theme }) => theme.white};
    justify-content: space-between;
    ${media.sm} {
      color: ${({ theme }) => theme.subNavSec};
      width: 380px;
    }
  }
`;

const GameRebateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 780px;
  padding: 0 30px;
  gap: 16px;
  ${media.sm} {
    flex-direction: row;
  }
`;

const GameRebateContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 40px;
  color: ${({ theme }) => theme.white};;
  ${media.sm} {
    flex-direction: column;
    & > div {
      display: flex;
      justify-content: center;
    }
  }
`;

const VIP = () => {
  const { isDesktopSize } = useRwd();
  const { isLoading, productRebateByLevel, vipData } = useBettingBonus();
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  useUpdatePageName("VIP");

  return (
    <PageContainer>
      {isLoading && <Loading show={true} />}
      <VipBannerWrapper>
        <VipBanner $imageUrl={`${import.meta.env.BASE_URL}assets/images/vip/vip-banner.png`} />
      </VipBannerWrapper>
      <VipContentContainer>
        <VIPIconWrapper>
          {vipData
            .sort((a, b) => a.level - b.level)
            .map((vip, index) => {
              return (
                <VIPIcon
                  key={vip.level}
                  $active={vip.level - 1 === selectedLevel}
                  onClick={() => {
                    setSelectedLevel(index);
                  }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/images/vip/level_${vip.level}.png`}
                    alt={`VIP${vip.level}`}
                  />
                  <VIPText>{`VIP${vip.level}`}</VIPText>
                </VIPIcon>
              );
            })}
        </VIPIconWrapper>
        <InfoWrapper>
          <VIPInfoWrapper>
            <TitleBlock $width={"380px"}>{i18n.t("vip.bonus")}</TitleBlock>
            <DataContainer>
              <div>
                <div>{i18n.t("vip.levelUpBonus")}</div>
                <div>{vipData[selectedLevel]?.promotionBenefit}</div>
              </div>
              <div>
                <div>{i18n.t("vip.birthBenefit")}</div>
                <div>{vipData[selectedLevel]?.birthBenefit}</div>
              </div>
              <div>
                <div>{i18n.t("vip.quarterlyBenefit")}</div>
                <div>{vipData[selectedLevel]?.quarterlyBenefit}</div>
              </div>
            </DataContainer>
          </VIPInfoWrapper>
          <VIPInfoWrapper>
            <TitleBlock $width={"380px"}>{i18n.t("vip.levelUp")}</TitleBlock>
            <DataContainer>
              <div>
                <div>{i18n.t("vip.totalDeposit")}</div>
                <div>{vipData[selectedLevel]?.levelUpAccumulateDeposit}</div>
              </div>
              <div>
                <div>{i18n.t("vip.totalVaildBet")}</div>
                <div>{vipData[selectedLevel]?.levelUpAccumulateBetAmount}</div>
              </div>
            </DataContainer>
          </VIPInfoWrapper>
        </InfoWrapper>
        <InfoWrapper>
          <VIPInfoWrapper>
            <TitleBlock $width={isDesktopSize ? "780px" : "380px"}>
              {i18n.t("vip.vipBenefit")}
            </TitleBlock>
            <GameRebateContainer>
              {productRebateByLevel.map((game) => {
                return (
                  <GameRebateContent key={game.name}>
                    <div>{game.label}</div>
                    <div>{`${game.rebate[selectedLevel]} %`}</div>
                  </GameRebateContent>
                );
              })}
            </GameRebateContainer>
          </VIPInfoWrapper>
        </InfoWrapper>
      </VipContentContainer>
    </PageContainer>
  );
};

export default VIP;
