import styled from "styled-components";
import { TypeProductRebateByLevel } from "@tgs-web-nx/core/hooks";
import { media } from "@/theme/breakpoints";

const ScrollableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  gap: 12px;

  ${media.sm} {
    margin: 0 auto;
    scroll-snap-type: unset;
    overflow-x: hidden;
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

const LevelTableWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 570px;
  height: 100%;

  ${media.sm} {
    width: 100%;
    margin: 0 auto;
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
  background-color: ${({ theme }) => theme.mainBackground};
  border-bottom: 1px solid #23507d;

  ${media.sm} {
    height: 86px;
    padding: 20px 0px;
    border-bottom: 1px solid ${(props) => props.theme.gray10};
  }
`;

const HeaderItem = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 100%;
  flex: 1;
  color: ${(props) => props.theme.text};
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: 0.6875rem;
  font-weight: 400;
  text-align: center;
  margin: 0px 8px;

  ${media.sm} {
    max-width: 136px;
    font-size: 1.125rem;
    margin: unset;
    color: #23507d;
  }
`;

const LevelTableBody = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  align-self: stretch;
  background: ${(props) => props.theme.mainBackground};
  padding-top: 20px;

  ${media.sm} {
    background: ${(props) => props.theme.mainBackground};

    > div:nth-child(even) {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const LevelTableRowWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.mainBackground};
  border-bottom: 1px solid #23507d;

  ${media.sm} {
    border-bottom: unset;
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
  color: ${(props) => props.theme.black};
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: 0.75rem;
  font-weight: 400;
  text-align: center;
  margin: 0px 8px;

  ${media.sm} {
    min-height: 67px;
    width: 166px;
    font-size: 1rem;
    color: #23507d;
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
  const gameList = productRebateByLevel.map((productRebate) => {
    return productRebate.name;
  });

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
          {gameList.map((game) => (
            <HeaderItem key={game}>{game}</HeaderItem>
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
