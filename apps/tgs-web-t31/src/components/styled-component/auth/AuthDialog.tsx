import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const TitleContainer = styled.div`
  font-size: 3rem;
  line-height: 3.478rem;
  font-weight: 700;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  white-space: nowrap;

  ${media.sm} {
    display: none;
  }
`;
