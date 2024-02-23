import styled from "styled-components";
import { VipData } from "@tgs-web-nx/types";
import { useBettingBonus, useVipBonusListV2 } from "@tgs-web-nx/core/hooks";

import { media } from "@/theme/breakpoints";

const ScrollableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  gap: 12px;

  ${media.sm} {
    //overflow-x: hidden; // this will cause tablet display issue
    margin: 0 auto;
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

const BonusTableWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 670px;
  height: 100%;

  ${media.sm} {
    /* width: 100%; */
    margin: 0 auto;
  }
`;

const BonusTableHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0;
  background-color: ${({ theme }) => theme.mainBackground};
  border-bottom: 1px solid #23507d;
  border-radius: 6px 0px 0px 0px;

  ${media.sm} {
    height: 67px;
    border-radius: 8px 8px 0px 0px;
    border-bottom: 1px solid ${(props) => props.theme.gray10};
  }
  & *:nth-child(5) {
    background: #e7f1fb;
  }
  *:nth-child(6) {
    background: #e7f1fb;
  }
`;

const VIPTitleTableHeader = styled(BonusTableHeader)`
  justify-content: start;
  ${media.sm} {
    height: 60px;
    padding: 20px 0;
    border-radius: 8px 8px 0px 0px;
    border-bottom: 1px solid ${(props) => props.theme.gray10};
  }
`;

const HeaderItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 115px;
  height: 100%;
  flex: 1;
  color: ${(props) => props.theme.text};
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: 0.75rem;
  font-weight: 400;
  text-align: center;
  margin: 0px;

  ${media.sm} {
    max-width: 115px;
    font-size: 1rem;
    color: #23507d;
  }
`;

const BonusTableBody = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  align-self: stretch;

  ${media.sm} {
    background: ${(props) => props.theme.mainBackground};
  }
`;

const BonusTableRowWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid#23507D;

  ${media.sm} {
    border-bottom: unset;
    color: #23507d;
  }
  & *:nth-child(5) {
    background: #e7f1fb;
  }
  *:nth-child(6) {
    background: #e7f1fb;
  }
`;

const RowItem = styled(HeaderItem)`
  display: flex;
  min-height: 69px;
  justify-content: center;
  align-items: center;
  min-width: 60px;
  height: 100%;
  flex: 1;
  color: ${(props) => props.theme.black};
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: 0.75rem;
  font-weight: 400;
  text-align: center;
  margin: 0px 0px;

  ${media.sm} {
    min-height: 106px;
    width: 128px;
    font-size: 1rem;
    color: #23507d;
  }
`;

const LevelIcon = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

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
      <BonusTableWrapper>
        <VIPTitleTableHeader>
          <HeaderItem>Bonus</HeaderItem>
          <HeaderItem>Level Up</HeaderItem>
          <HeaderItem>VIP Rebate</HeaderItem>
        </VIPTitleTableHeader>
        <BonusTableHeader>
          {titleList.map((bonus) => (
            <HeaderItem key={bonus.key}>{bonus.label}</HeaderItem>
          ))}
        </BonusTableHeader>

        <BonusTableBody>
          {vipSortingData.map((vipData) => {
            return (
              <BonusTableRowWrapper key={vipData.level}>
                <RowItem>
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
                </RowItem>
                {/* <RowItem>{vipData.levelKeepAccumulateBetAmount.toLocaleString()}</RowItem>
                <RowItem>{vipData.levelKeepAccumulateDeposit.toLocaleString()}</RowItem>
                <RowItem>{vipData.levelUpAccumulateBetAmount.toLocaleString()}</RowItem>
                <RowItem>{vipData.levelUpAccumulateDeposit.toLocaleString()}</RowItem> */}
                <RowItem>{vipData.birthBenefit}</RowItem>
                <RowItem>{vipData.promotionBenefit}</RowItem>
                <RowItem>{vipData.quarterlyBenefit}</RowItem>
                <RowItem>{vipData.levelUpAccumulateDeposit}</RowItem>
                <RowItem>{vipData.levelUpAccumulateBetAmount}</RowItem>

                <RowItem>{`${vipData.liveDealerRebate} %`}</RowItem>
                <RowItem>{`${vipData.slotRebate} %`}</RowItem>
                <RowItem>{`${vipData.cardGameRebate} %`}</RowItem>
                <RowItem>{`${vipData.sportsRebate} %`}</RowItem>
                <RowItem>{`${vipData.virtualSportsRebate} %`}</RowItem>
                <RowItem>{`${vipData.lotteryRebate} %`}</RowItem>
              </BonusTableRowWrapper>
            );
          })}
        </BonusTableBody>
      </BonusTableWrapper>
    </ScrollableContainer>
  );
};

export default BonusTable;
