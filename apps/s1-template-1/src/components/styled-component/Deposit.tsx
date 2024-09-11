import styled from "styled-components";

export const LimitLabel = styled.span`
  color: ${({ theme }) => theme.gray50};
`;

export const LimitAmount = styled.span`
  color: ${({ theme }) => theme.text};
`;

export const TransferLabel = styled.div`
  color: ${({ theme }) => theme.transferPrimaryText};
  line-height: 1.8rem;
  letter-spacing: 0.28px;

`;
export const TransferValue = styled.div`
  padding-top: .2rem;
  line-height: 1.8rem;
  letter-spacing: 0.28px;
`;

export const ExchangeRateContainer = styled.div`
  margin: 20px auto;
  font-size: 0.937rem;
  font-weight: 400;
`;

export const QRCodeImg = styled.img`
  display: block;
  margin-top: 10px;
  width: 7.8rem;
  height: 7.8rem;
`;

export const HintText = styled.div`
  color: ${({ theme }) => theme.primary};
`;

export const AmountHint = styled.div`
  color: ${({ theme }) => theme.text};
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
