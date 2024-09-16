import { media } from "@/theme/breakpoints";
import styled from "styled-components";

export const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color:  ${({ theme }) => theme.tableBackground}

  ${media.sm} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;
