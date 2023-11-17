import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const TitleContainer = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 69px;
  white-space: nowrap;

  ${media.sm} {
    margin-bottom: 26px;
  }
`;
