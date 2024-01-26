import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const Container = styled.div`
  width: 100%;
`;
export const SubTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.white};
`;
export const SubTitleDesc = styled.div`
  font-size: 0.937rem;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.white};
  white-space: pre-line;
`;
export const ButtonContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;

  ${media.sm} {
    flex-direction: row;
  }
`;
