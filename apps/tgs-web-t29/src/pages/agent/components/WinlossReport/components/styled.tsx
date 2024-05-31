import styled from "styled-components";
import { media } from "@/theme/breakpoints";

const WinlossReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Wrapper = styled.div`
  display: flex;
`;

const FormulaWrapper = styled(Wrapper)`
  flex-direction: column;
  gap: 10px;
  ${media.sm} {
    flex-direction: row;
  }
`;

const FormulaContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.button<{
  $isDisable: boolean;
}>`
  cursor: ${props => props.$isDisable ? 'auto' : 'pointer'};
  color: ${({ theme }) => theme.blue50};
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
  background: none;
  border: none;
`;

const HintIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  & > img {
    cursor: pointer;
  }
`;

const NoData = styled.div`
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid rgba(83, 88, 103, 0.3);
`;

const TableWrapper = styled.div`
  min-width: 1200px;
`;

const ScrollArea = styled.div`
  width: 100%;
  overflow-x: auto;

  &::-webkit-scrollbar{
      height: 4px;
    }
  &::-webkit-scrollbar-track {
    background-color: #E7F1FB;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #535867;
  }
`;

const CardContainer = styled.div`
  padding: 10px;
  border: ${({ theme }) => `1px solid ${theme.blue40}`};
  margin-bottom: 20px;
`;

const PlayerNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
`;

const PlayNameTitle = styled.div`
  background: ${({ theme }) => theme.blue30};
  color: ${({ theme }) => theme.white};
  width: 120px;
  padding: 6px 10px;
  gap: 10px;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.1px;
`;

const PlayName = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
  color: ${({ theme }) => theme.blue30};
`;

const PlayerInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const PlayInfo = styled.div`
  width: 150px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  gap: 18px;
`;

const PlayerInfoTitle = styled.div`
  height: 48px;
  background: ${({ theme }) => theme.blue20};
  font-size: 14px;
  font-weight: 400;
  line-height: 16.1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayerInfoValue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3px;
`;

const InfoTextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  line-height: 1.5;
`;

const InfoText = styled.div`
  display: flex;
  justify-content: start;
  min-width: 80px;
`;

const InfoAmount = styled(InfoText)`
  min-width: 30px;
  justify-content: end;
  align-items: end;
`;

const PlayerSpecialTitle = styled(PlayName)`
  margin: 10px 0;
`;


export {
    ScrollArea,
    TableWrapper,
    NoData,
    HintIconWrapper,
    UserName,
    FormulaContainer,
    FormulaWrapper,
    Wrapper,
    WinlossReportContainer,
    CardContainer,
    PlayerSpecialTitle,
    InfoAmount,
    InfoText,
    InfoTextContainer,
    PlayerInfoValue,
    PlayerInfoTitle,
    PlayInfo,
    PlayerInfoContainer,
    PlayName,
    PlayNameTitle,
    PlayerNameContainer,
}