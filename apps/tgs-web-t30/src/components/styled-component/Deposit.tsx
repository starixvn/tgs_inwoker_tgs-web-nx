import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const LimitLabel = styled.span`
  color: ${({ theme }) => theme.white};

  ${media.sm} {
    color: ${({ theme }) => theme.text};
  }
`;

export const LimitAmount = styled.span`
  color: ${({ theme }) => theme.white};
  ${media.sm} {
    color: ${({ theme }) => theme.text};
  }
`;

export const TransferLabel = styled.div``;
export const TransferValue = styled.div``;

export const ExchangeRateContainer = styled.div`
  margin: 20px auto;
  font-size: 0.937rem;
  font-weight: 400;
`;

export const QRCodeImg = styled.img`
  display: block;
  margin-top: 10px;
  width: 200px;
  height: 200px;
`;

export const HintText = styled.div`
  color: ${({ theme }) => theme.primary};
`;

export const AmountHint = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 0.937rem;
  font-weight: 400;
  margin-top: 9px;
  text-align: center;
  max-width: 500px;
  ${media.sm} {
    color: ${({ theme }) => theme.text};
  }
`;

export const FeeSpot = styled.div`
  margin-bottom: 17px;
  span {
    font-weight: bold;
  }
`;
