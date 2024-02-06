import styled from "styled-components";
import { TypeProductRebateByLevel } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
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
    margin: 0 auto;
    scroll-snap-type: unset;
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
  background: ${({ theme }) => theme.labelText};
  border-radius: 6px 0px 0px 0px;

  ${media.sm} {
    height: 86px;
    padding: 20px 0px;
    border-radius: 8px 8px 0px 0px;
    background: ${({ theme }) => theme.primaryGradient};
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
  font-size: 0.75rem;
  font-weight: 400;
  text-align: center;
  margin: 0px 8px;

  ${media.sm} {
    max-width: 136px;
    font-size: 1rem;
    margin: unset;
  }
`;

const LevelTableBody = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  align-self: stretch;
  background: none;
  padding-top: 20px;
  border-radius: 0px 0px 8px 8px;

  ${media.sm} {
    background: ${(props) => props.theme.lightBlack};
  }
`;

const LevelTableRowWrapper = styled.div`
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
    color: ${(props) => props.theme.white};
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
          <HeaderItem>{i18n.t("vip.vipBenefit")}</HeaderItem>
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
