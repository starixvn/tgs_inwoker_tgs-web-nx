import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const Container = styled.div`
  width: 100%;
`;
export const SubTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: ${({ theme }) => theme.blue50};
  margin-top: 50px;
  text-align: center;
`;
export const SubTitleDesc = styled.div`
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;
export const ButtonContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 16px;

  ${media.sm} {
    flex-direction: row;
  }
`;
