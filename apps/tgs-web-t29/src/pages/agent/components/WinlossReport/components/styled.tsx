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

const UserName = styled.p`
  color: ${({ theme }) => theme.blue50};
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
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
  min-width: 890px;
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
}