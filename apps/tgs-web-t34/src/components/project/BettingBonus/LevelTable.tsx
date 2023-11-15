import styled from "styled-components";
import { TypeProductRebateByLevel } from "@tgs-web-nx/core/hooks";

const LevelTableContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  gap: 36px;
  background: ${(props) => props.theme.mainLightBackground};
`;

const LevelTableHeader = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  align-self: stretch;
  width: 100%;
`;

const HeaderItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  color: ${(props) => props.theme.white};
  font-size: 1.125rem;
  font-weight: 400;
`;

const LevelTableBody = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
`;

const LevelTableRowContainer = styled.div`
  display: flex;
  padding: 24px 0px;
  align-items: center;
  align-self: stretch;
  border-bottom: 1px solid #434343;
`;

const RowItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  color: ${(props) => props.theme.white};
  font-size: 1rem;
  font-weight: 400;
`;

export const LevelTableRow = ({
  level,
  isCurrentLevel,
  bonusList,
}: {
  level: number;
  isCurrentLevel: boolean;
  bonusList: number[];
}) => {
  return (
    <LevelTableRowContainer>
      {/* <IconCell>
        <LevelIconWrapper>
          <LevelIcon isCurrentLevel={isCurrentLevel} level={level} width={"57px"} />
        </LevelIconWrapper>
      </IconCell> */}
      <RowItem>{level}</RowItem>
      {bonusList.map((bonus, index) => {
        return <RowItem key={index}>{bonus}%</RowItem>;
      })}
    </LevelTableRowContainer>
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
    <LevelTableContainer>
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
    </LevelTableContainer>
  );
};

export default LevelTable;
