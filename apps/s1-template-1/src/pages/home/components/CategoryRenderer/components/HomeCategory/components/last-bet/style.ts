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
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 4.4rem;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.8rem;
  text-align: center;
  gap: 0.8rem;
`;

export const TableHeader = styled(LayoutGrid)`
  position: relative;
  border-radius: 0.8rem;
  background: #1a2335;
  color: #7a8597;
  font-size: 1.3rem;
  font-weight: 700;
  z-index: 2;
`;

export const TableRow = styled(LayoutGrid)<AnimationProps>`
  border-radius: 0.8rem;
  border-bottom: 1px solid #151d29;
  background: #151d29;
  margin-top: 0.6rem;
  color: #7a8597;
  font-size: 1.3rem;
  font-weight: 500;
`;

export const TableWrapper = styled.div`
  position: relative;
  width: 100%;
  max-height: 46rem;
  overflow: hidden;
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
  width: 8rem;
  text-align: left;
  white-space: nowrap;
  /* overflow: hidden; */
  text-overflow: ellipsis;
`;

export const GameName = styled.div`
  text-align: left;
  text-transform: capitalize;
`;
