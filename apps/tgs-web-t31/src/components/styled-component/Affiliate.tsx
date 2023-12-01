import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const AffiliateContainer = styled.div`
  color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 9px;

  ${media.lg} {
    flex-direction: row;
    gap: 19px;
    align-items: flex-start;
  }
`;

export const FlexContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  ${media.sm} {
    width: auto;
  }
`;

export const AffiliateTitle = styled.h2`
  padding: 0;
  margin-block: 0;
  margin-inline: 0;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.758rem;
  margin-bottom: 14px;
`;

export const QRCodeContainer = styled.div`
  background-color: #fff;
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 18px;
`;
export const ActionButtonContainer = styled.div`
  width: 288px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 34px;

  & > * {
    width: 110px;
    height: 27px;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.171rem;
    padding: 4px 36px;
    border-radius: 5px;
  }
`;

export const AffiliateInfoRowContainer = styled.div`
  width: 100%;
  margin-bottom: 27px;

  & > div {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
