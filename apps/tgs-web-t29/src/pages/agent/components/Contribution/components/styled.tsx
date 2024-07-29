import styled, { css } from "styled-components";
import { media } from "@/theme/breakpoints";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Wrapper = styled.div`
  display: flex;
`;

const NoData = styled.div`
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid rgba(83, 88, 103, 0.3);
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
  text-align: center;
`;

const PlayName = styled.div<{
  $isActive?: boolean;
}>`
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
  color: ${({ theme }) => theme.blue30};

  ${props => props.$isActive && css`
    text-decoration: underline;
  `}
`;

const PlayerInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PlayInfo = styled.div`
  width: 100%;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  gap: 18px;
`;

const PlayerInfoTitle = styled.div`
  padding: 2px 10px;
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

const InfoTextContainer = styled.div<{
  $isActive?: boolean
}>`
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  gap: 5px;
  width: 100%;
  line-height: 1.5;
  color: #535867;
  ${props => props.$isActive && css`
    color: #399FDA;
  `}

  ${props => !props.$isActive && css`
    pointer-events: none;
  `}
`;

const InfoText = styled.p`
`;

const InfoAmount = styled(InfoText)`
  text-align: end;
`;

const PlayerSpecialTitle = styled(PlayName)`
  margin: 10px 0;
`;


export {
    ScrollArea,
    NoData,
    Wrapper,
    
    Container,
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