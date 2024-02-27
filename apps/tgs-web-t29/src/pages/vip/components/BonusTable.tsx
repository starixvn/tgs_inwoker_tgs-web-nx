import styled from "styled-components";
import { VipData } from "@tgs-web-nx/types";
import { useBettingBonus, useVipBonusListV2 } from "@tgs-web-nx/core/hooks";

import { i18n } from "@tgs-web-nx/utils";
import { media } from "@/theme/breakpoints";

const ScrollableContainer = styled.div`
  width: 800px;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  ${media.sm} {
    //overflow-x: hidden; // this will cause tablet display issue
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
  width: 200px;

  ${media.sm} {
    width: 100%;
    width: 130px;
    padding: 20px;
    font-size: 1rem;
    color: #23507d;
  }
`;

const HeaderRowItem = styled(RowItem)<{ $width: string }>`
  width: ${({ $width }) => $width};
  font-weight: 700;
`;

const BorderRowItem = styled(RowItem)`
  border-top: ${({ theme }) => `1px solid ${theme.gray10}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.gray10}`};
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
  border-top: ${({ theme }) => `1px solid ${theme.gray10}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.gray10}`};
`;

const TopHeader = styled.tr`
  & *:nth-child(2) {
    background: ${({ theme }) => theme.blue20};
  }
`;

const BottomHeader = styled.tr`
  & *:nth-child(n + 4):nth-child(-n + 6) {
    background: ${({ theme }) => theme.blue20};
  }
`;

const Body = styled(BottomHeader)``;

type Props = {
  vipSortingData: VipData[];
};

const BonusTable = ({ vipSortingData }: Props) => {
  const { vipBonusList } = useVipBonusListV2();
  const { isLoading, currentLevel, productRebateByLevel, vipData } = useBettingBonus();
  const titleList = [...vipBonusList];
  productRebateByLevel.map((gametype) => {
    titleList.push({
      key: gametype.name,
      label: gametype.label,
    });
  });

  return (
    <ScrollableContainer>
      <VIPTable>
        <thead>
          <TopHeader>
            <HeaderRowItem $width={"473px"} colSpan={3}>
              {i18n.t("vip.bonus")}
            </HeaderRowItem>
            <HeaderRowItem $width={"320px"} colSpan={3}>
              {i18n.t("vip.levelUp")}
            </HeaderRowItem>
            <HeaderRowItem $width={"756px"} colSpan={6}>
              {i18n.t("vip.vipBenefit")}
            </HeaderRowItem>
          </TopHeader>
          <BottomHeader>
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
              <Body key={vipData.level}>
                <FixRowItem>
                  <LevelIcon>
                    <img
                      width={"50px"}
                      height={"50px"}
                      src={`${import.meta.env.BASE_URL}assets/images/vip/level_${
                        vipData.level
                      }.png`}
                      alt={`level_${vipData.level}`}
                    />
                    <span>VIP{vipData.level}</span>
                  </LevelIcon>
                </FixRowItem>
                <RowItem>{vipData.promotionBenefit}</RowItem>
                <RowItem>{vipData.birthBenefit}</RowItem>
                <RowItem>{vipData.quarterlyBenefit}</RowItem>
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
