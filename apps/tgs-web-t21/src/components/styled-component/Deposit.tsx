import styled from "styled-components";
import { theme } from "@/theme";

export const LimitLabel = styled.span`
  color: ${theme.text};
`;

export const LimitAmount = styled.span`
  color: ${theme.text};
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
  color: ${theme.primary};
`;

export const AmountHint = styled.div`
  color:${theme.text};
  font-size: 0.937rem;
  font-weight: 400;
  margin-top: 9px;
  text-align: center;
  max-width: 500px;
`;

export const FeeSpot = styled.div`
  margin-bottom: 17px;
  span {
    font-weight: bold;
  }
`;
