import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const BadgeContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;

  ${media.sm} {
    margin-bottom: 0;
  }
`;