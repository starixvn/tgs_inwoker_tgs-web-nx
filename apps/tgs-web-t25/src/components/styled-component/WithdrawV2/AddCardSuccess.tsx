import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const Container = styled.div`
  width: 100%;
`;
export const SubTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;
export const SubTitleDesc = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
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

export const Card = styled.div`
  background: ${({ theme }) => theme.black02};
  border: 1px solid ${({ theme }) => theme.grey06};
  border-radius: 6px;
  margin-bottom: 20px;
  padding: 24px 20px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;
