import styled from "styled-components";
import { VipData } from "@tgs-web-nx/types";
import { useVipBonusList } from "@tgs-web-nx/core/hooks";
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
    width: 100%;
    margin: 0 auto;
  }
`;

const BonusTableHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 10.5px 0;
  border-radius: 6px 0px 0px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.g2};

  ${media.sm} {
    height: 97px;
    padding: 20px 0px;
    border-radius: 8px 8px 0px 0px;
  }
`;

const HeaderItem = styled.div`
  width: 60px;
  height: 100%;
  flex: 1;
  color: ${({ theme }) => theme.white};
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: 0.75rem;
  font-weight: 400;
  text-align: center;
  margin: 0px 8px;

  ${media.sm} {
    max-width: 150px;
    font-size: 1rem;
    margin: 0px 6px;
  }
`;

const BonusTableBody = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  align-self: stretch;

  ${media.sm} {
    border-radius: 10px;

    > div:nth-child(even) {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const BonusTableRowWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RowItem = styled.div`
  display: flex;
  min-height: 69px;
  justify-content: center;
  align-items: center;
  min-width: 60px;
  height: 100%;
  flex: 1;
  color: ${({ theme }) => theme.g2};
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: 0.75rem;
  font-weight: 400;
  text-align: center;
  margin: 8px 0;

  ${media.sm} {
    min-height: 106px;
    width: 128px;
    font-size: 1rem;
    margin: 0px 0;
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
  const { vipBonusList } = useVipBonusList();
  return (
    <ScrollableContainer>
      <BonusTableWrapper>
        <BonusTableHeader>
          {vipBonusList.map((bonus) => (
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
                <RowItem>{vipData.levelKeepAccumulateBetAmount.toLocaleString()}</RowItem>
                <RowItem>{vipData.levelKeepAccumulateDeposit.toLocaleString()}</RowItem>
                <RowItem>{vipData.levelUpAccumulateBetAmount.toLocaleString()}</RowItem>
                <RowItem>{vipData.levelUpAccumulateDeposit.toLocaleString()}</RowItem>
                <RowItem>{vipData.birthBenefit.toLocaleString()}</RowItem>
                <RowItem>{vipData.promotionBenefit.toLocaleString()}</RowItem>
                <RowItem>{vipData.quarterlyBenefit.toLocaleString()}</RowItem>
              </BonusTableRowWrapper>
            );
          })}
        </BonusTableBody>
      </BonusTableWrapper>
    </ScrollableContainer>
  );
};

export default BonusTable;
