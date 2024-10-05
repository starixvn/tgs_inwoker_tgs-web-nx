import { media } from "@tgs-web-nx/constants";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 6px;

  ${media.sm} {
    margin: 0 auto;
    padding: 15px 0px;
  }
`;

export const DesktopCategoryContentWrapper = styled.div`
  width: 100%;
  min-height: 35rem;
  gap: 1rem 0.6rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: start;
`;

export const DesktopWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const NoData = styled.div`
  width: 100%;
  text-transform: capitalize;
  text-align: center;
  color: ${({ theme }) => theme.noDataTextColor};
  font-size: 1.2rem;
  font-weight: 500;
`;

export const GameList = styled.ul`
  --gap: 1.2rem;
  --column-count: 2;
  --min-width: 11.8rem;
  --single-column-width: calc(
    (100% - (var(--column-count) - 1) * var(--gap)) / var(--column-count)
  );

  display: grid;
  gap: var(--gap);
  grid-auto-flow: row;
  grid-template-columns: repeat(auto-fill, minmax(131px, 1fr));
  width: 100%;
  transition: grid-template-columns 0.1s ease-in-out;
  list-style: none;

  @media (min-width: 420px) {
    --column-count: 3;
    grid-auto-columns: calc(var(--min-width) + var(--gap));
    grid-template-columns: repeat(var(--column-count), minmax(var(--single-column-width), 1fr));
  }

  @media (min-width: 729px) {
    --gap: 1.6rem;
    --column-count: 4;
  }

  @media (min-width: 995px) {
    --column-count: 5;
  }

  @media (min-width: 1171px) {
    --column-count: 6;
  }

  @media (min-width: 1347px) {
    --column-count: 7;
  }

  @media (min-width: 1523px) {
    --column-count: 8;
  }

  @media (min-width: 1699px) {
    --column-count: 9;
  }
`;
