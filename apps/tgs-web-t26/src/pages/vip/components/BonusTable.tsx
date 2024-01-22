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

  ${media.sm} {
    //overflow-x: hidden; // this will cause tablet display issue
    margin: 0 auto;
    scroll-snap-type: unset;

    &::-webkit-scrollbar {
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
      /* background: ${(props) => props.theme.gray10}; */
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
  width: 100%;
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 10.5px 0;
  background-color: ${({ theme }) => theme.darkGray};

  ${media.sm} {
    height: 100px;
    padding: 20px;
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
    width: 128px;
    font-size: 20px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
  }
`;

const BonusTableBody = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  align-self: stretch;

  ${media.sm} {
    margin-top: 20px;
    background: ${(props) => props.theme.darkGray};
  }
`;

const BonusTableRowWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${({ theme }) => `1px solid ${theme.darkGray}`};
  ${media.sm} {
    border-bottom: unset;
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
  color: ${(props) => props.theme.text};
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
