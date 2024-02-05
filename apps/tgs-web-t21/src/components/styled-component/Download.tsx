import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const DownloadAppContainer = styled.div``;
export const GirlImage = styled.div`
  width: 100%;
  margin-bottom: 10px;

  img {
    width: 100%;
  }
`;
export const Paper = styled.div`
  padding: 0;
  ${media.sm} {
    background: ${({ theme }) => theme.mainBackground};
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
  text-align: left;
  gap: 12px;
  margin-bottom: 34px;
  & span {
    font-family: Arial;
    font-size: 18px;
    font-weight: 700;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
  }
`;
export const InfoCardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;

  ${media.sm} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;
