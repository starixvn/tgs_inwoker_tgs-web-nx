import styled from "styled-components";
import { VipData } from "@tgs-web-nx/types";
import { media } from "@/theme/breakpoints";
import { vipBonusList } from "@/constants/vip";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";

const ScrollableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  background-color: ${(props) => props.theme.primaryDark};
  color: ${(props) => props.theme.white};
  box-sizing: border-box;
  gap: 12px;
  
  ${media.sm} {
    margin: 0 auto;
    scroll-snap-type: unset;

    &::-webkit-scrollbar {
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
      background: ${(props) => props.theme.tertiaryDark};
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
  width: 670px;
  height: 100%;

  ${media.sm} {
    width: ${MAIN_CONTENT_MAX_WIDTH};
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
  padding: 10.5px 0;
  background-color: ${(props) => props.theme.gray80};

  ${media.sm} {
    height: 86px;
    padding: 20px;
    background-color: transparent;
  }
`;

const HeaderItem = styled.div`
  width: 60px;
  height: 100%;
  flex: 1;
  color: ${(props) => props.theme.white};
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: 0.5rem;
  font-weight: 400;
  text-align: center;
  margin: 0px 8px;

  ${media.sm} {
    width: 128px;
    font-size: 1.25rem;
  }
`;

const BonusTableBody = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  background: ${(props) => props.theme.mainBackground};

  ${media.sm} {
    background: ${(props) => props.theme.mainLightBackground};
  }

  > div:nth-child(even) {
    background-color: ${(props) => props.theme.gray80};
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
  height: 46px;
  padding: 24px 0px;
  justify-content: center;
  align-items: center;
  min-width: 60px;
  height: 100%;
  flex: 1;
  color: ${(props) => props.theme.white};
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: 0.75rem;
  font-weight: 400;
  text-align: center;
  margin: 0px 8px;

  ${media.sm} {
    width: 128px;
    font-size: 1rem;
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
                    <img width={"50px"} height={"50px"} src={`${import.meta.env.BASE_URL}assets/images/vip/level_${vipData.level}.png`} alt={`level_${vipData.level}`} />VIP{vipData.level}                  </LevelIcon>
                </RowItem>
                <RowItem>{(vipData.levelKeepAccumulateBetAmount).toLocaleString()}</RowItem>
                <RowItem>{(vipData.levelKeepAccumulateDeposit).toLocaleString()}</RowItem>
                <RowItem>{(vipData.levelUpAccumulateBetAmount).toLocaleString()}</RowItem>
                <RowItem>{(vipData.levelUpAccumulateDeposit).toLocaleString()}</RowItem>
                <RowItem>{(vipData.birthBenefit).toLocaleString()}</RowItem>
                <RowItem>{(vipData.promotionBenefit).toLocaleString()}</RowItem>
                <RowItem>{(vipData.quarterlyBenefit).toLocaleString()}</RowItem>
              </BonusTableRowWrapper>
            );
          })}
        </BonusTableBody>
      </BonusTableWrapper>
    </ScrollableContainer>
  );
};

export default BonusTable;
