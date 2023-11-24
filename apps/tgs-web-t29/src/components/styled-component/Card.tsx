import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const CardContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 14px;

  ${media.sm} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;
