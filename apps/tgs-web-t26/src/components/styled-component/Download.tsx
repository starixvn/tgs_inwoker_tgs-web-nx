import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const DownloadAppContainer = styled.div``;

export const Paper = styled.div`
  padding: 0;

  ${media.sm} {
    padding: 10px;
  }
`;
export const IntroductionContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
  font-family: Arial;
  font-size: 18px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  gap: 10px;
  margin-bottom: 12px;
  padding: 12px 24px;

  & span {
    font-size: 18px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
  }

  ${media.sm} {
    background: ${({ theme }) => theme.darkGray};
    padding: 40px 20px;
  }
`;
export const InfoCardListContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;

  ${media.sm} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;
