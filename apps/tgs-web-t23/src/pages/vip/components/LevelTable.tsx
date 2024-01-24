import styled from "styled-components";
import { TypeProductRebateByLevel } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";

const ScrollableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  overflow-x: auto;
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
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
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

const LevelTableWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 570px;
  height: 100%;

  ${media.sm} {
    width: ${MAIN_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    background: ${(props) => props.theme.mainLightBackground};
    border-radius: 10px;
  }
`;

const LevelTableHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 12px 15px 12px 15px;
  background: ${(props) => props.theme.mainDarkBackground};

  ${media.sm} {
    border-radius: 10px;
    height: 45px;
    padding: 12px 0px;
    background: transparent;
  }
`;

const HeaderItem = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 100%;
  flex: 1;
  color: ${(props) => props.theme.white};
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: 0.6875rem;
  font-weight: 400;
  text-align: center;
  margin: 0px 8px;

  ${media.sm} {
    width: 166px;
    font-size: 1.125rem;
    margin: unset;
  }
`;

const LevelTableBody = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  background: ${(props) => props.theme.mainBackground};

  ${media.sm} {
    background: ${(props) => props.theme.mainLightBackground};
    border-radius: 10px;
  }
`;

const LevelTableRowWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.mainDarkBackground};

  ${media.sm} {
    border-bottom: 1px solid #434343;
  }
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
    width: 166px;
    font-size: 1rem;
  }
`;

export const LevelTableRow = ({
  level,
  bonusList,
}: {
  level: number;
  isCurrentLevel: boolean;
  bonusList: number[];
}) => {
  return (
    <LevelTableRowWrapper>
      <RowItem>{level}</RowItem>
      {bonusList.map((bonus, index) => {
        return <RowItem key={index}>{bonus}%</RowItem>;
      })}
    </LevelTableRowWrapper>
  );
};

const LevelTable = ({
  currentLevel,
  productRebateByLevel,
}: {
  currentLevel: number;
  productRebateByLevel: TypeProductRebateByLevel[];
}) => {
  const firstProductRebate = productRebateByLevel[0];
  const maxLevel = firstProductRebate.rebate.length;
  const levelList = Array.from({ length: maxLevel }, (_, i) => i + 1);

  const getRebateList = (level: number) => {
    return productRebateByLevel.map((productRebate) => {
      const rebateList = productRebate.rebate;
      return rebateList[level - 1];
    });
  };

  return (
    <ScrollableContainer>
      <LevelTableWrapper>
        <LevelTableHeader>
          <HeaderItem>VIP rebate</HeaderItem>
          {productRebateByLevel.map((game) => (
            <HeaderItem key={game.name}>{game.label}</HeaderItem>
          ))}
        </LevelTableHeader>

        <LevelTableBody>
          {levelList.map((level) => {
            return (
              <LevelTableRow
                key={level}
                level={level}
                isCurrentLevel={currentLevel === level}
                bonusList={getRebateList(level)}
              />
            );
          })}
        </LevelTableBody>
      </LevelTableWrapper>
    </ScrollableContainer>
  );
};

export default LevelTable;
