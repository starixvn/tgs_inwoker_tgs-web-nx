import styled from "styled-components";
import { VipData } from "@tgs-web-nx/types";
import { media } from "@/theme/breakpoints";
import { vipBonusList } from "@/constants/vip";

const ScrollableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  gap: 12px;
  border-radius: 8px;

  ${media.sm} {
    //overflow-x: hidden; // this will cause tablet display issue
    margin: 0 auto;
    scroll-snap-type: unset;

    &::-webkit-scrollbar {
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
    }

    &::-webkit-scrollbar-track-piece {
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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10.5px 0;
  background: #d6dbdd;
  border-bottom: 1px solid #23507d;
  border-radius: 6px 0px 0px 0px;

  ${media.sm} {
    padding: 20px 0;
    border-radius: 8px 8px 0px 0px;
  }
`;

const HeaderItem = styled.div`
  width: 60px;
  height: 100%;
  flex: 1;
  color: ${(props) => props.theme.text};
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: 0.75rem;
  font-weight: 400;
  text-align: center;
  margin: 0px 8px;

  ${media.sm} {
    max-width: 115px;
    font-size: 1rem;
    margin: 0px 6px;
    color: #23507d;
  }
`;

const BonusTableBody = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  align-self: stretch;
  background: #d6dbdd;

  ${media.sm} {
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
`;

const RowItem = styled.div`
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
  margin: 0px 8px;

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
  return (
    <ScrollableContainer>
      <BonusTableWrapper>
        <BonusTableHeader>
          {vipBonusList.map((bonus) => (
            <HeaderItem key={bonus}>{bonus}</HeaderItem>
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
