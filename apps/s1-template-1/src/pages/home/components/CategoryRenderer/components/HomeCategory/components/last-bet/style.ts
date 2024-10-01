import { media } from "@tgs-web-nx/constants";
import styled from "styled-components";

interface AnimationProps {
  $isNew: boolean;
}

export const TableContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 15rem;
    background: linear-gradient(180deg, rgba(13, 19, 28, 0) 0%, #0d131c 100%);
  }
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 40% repeat(2, calc(30% - 0.8rem));
  grid-template-rows: 4.4rem;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.8rem;
  text-align: center;
  gap: 0.8rem;

  ${media.md} {
    grid-template-columns: repeat(5, 1fr);
  }

  .hide-xs-md {
    display: none;

    ${media.md} {
      display: block;
    }
  }
`;

export const TableHeader = styled(LayoutGrid)`
  position: relative;
  border-radius: 0.8rem;
  background: ${({ theme }) => theme.latestBetsTableHeaderBg};
  color: ${({ theme }) => theme.latestBetsTableHeaderColor};
  font-size: 1.3rem;
  font-weight: 700;
  z-index: 2;
`;

export const TableRow = styled(LayoutGrid)<AnimationProps>`
  border-radius: 0.8rem;
  border-bottom: 1px solid #151d29;
  background: ${({ theme }) => theme.latestBetsTableRowBg};
  margin-top: 0.6rem;
  color: ${({ theme }) => theme.latestBetsTableRowColor};
  font-size: 1.3rem;
  font-weight: 500;
`;

export const TableWrapper = styled.div`
  position: relative;
  width: 100%;
  max-height: 46rem;
  overflow: hidden;
  will-change: transform;

  &.start-animation {
    animation: shuffle 0.5s ease-out;
  }

  @keyframes shuffle {
    0% {
      transform: translateY(-50px);
    }

    to {
      transform: translateY(0);
    }
  }
`;

export const TableCell = styled.div``;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const TextColor = styled(TableCell)<{ payout: number }>`
  text-align: right;
  font-weight: bold;
  color: ${({ payout }) => {
    if (payout === 0) {
      return "#7A8597";
    } else if (payout > 0) {
      return "#189EFF";
    } else {
      return "#FF1818";
    }
  }};
`;

export const PlayerName = styled.div`
  text-align: left;
`;

export const GameName = styled.div`
  text-align: left;
  text-transform: capitalize;
  line-height: 1.2;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
