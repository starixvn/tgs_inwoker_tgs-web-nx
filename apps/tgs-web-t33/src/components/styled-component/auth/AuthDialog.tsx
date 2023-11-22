import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const TitleContainer = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 84px;
  white-space: nowrap;

  ${media.sm} {
    color: ${({ theme }) => theme.white};
    margin-bottom: 26px;
  }
`;
