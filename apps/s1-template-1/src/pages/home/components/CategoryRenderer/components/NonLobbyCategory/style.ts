import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import { media } from "@tgs-web-nx/constants";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 6px;

  ${media.sm} {
    /* max-width: ${SUB_CONTENT_MAX_WIDTH}; */
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
  align-content: center;
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
  --min-width: 13.1rem;
  --single-column-width: calc(
    (100% - (var(--column-count) - 1) * var(--gap)) / var(--column-count)
  );

  display: grid;
  gap: var(--gap);
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  width: 100%;
  transition: grid-template-columns 0.1s ease-in-out;
  list-style: none;

  @media (min-width: 250px) {
    --column-count: 2 !important;
    grid-template-columns: repeat(var(--column-count), var(--single-column-width));
  }

  @media (min-width: 350px) {
    --column-count: 3 !important;
  }

  @media (min-width: 729px) {
    --gap: 1.6rem;
    --column-count: 4 !important;
  }

  @media (min-width: 995px) {
    --column-count: 5 !important;
  }

  @media (min-width: 1171px) {
    --column-count: 6 !important;
  }

  @media (min-width: 1347px) {
    --column-count: 7 !important;
  }

  @media (min-width: 1523px) {
    --column-count: 8 !important;
  }

  @media (min-width: 1699px) {
    --column-count: 9 !important;
  }
`;
