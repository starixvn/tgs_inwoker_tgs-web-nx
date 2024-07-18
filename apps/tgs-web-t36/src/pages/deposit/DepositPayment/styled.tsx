import { ReactNode } from "react";
import styled, { css } from "styled-components";

export const DepositPaymentLayout = ({children}: {children: ReactNode}) => (
    <Wrapper>
        <LayoutContainer>
            {children}
        </LayoutContainer>
    </Wrapper>
);

export const Wrapper = styled.div`
    padding: 0 30px;
    background: #020C23;
    color: #fff;
    font-size: 15px;
    line-height: 18px;
    font-weight: 400;
`;

export const LayoutContainer = styled.div`
    max-width: 430px;
    margin: 0 auto;
    min-height: 100vh;
`;

export const Header = styled.nav`
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Logo = styled.img`
    width: 120px;
    aspect-ratio: 120 / 32;
`;

export const AmountContainer = styled.div`
    margin-top: 16px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
`;

export const AmountTitle = styled.p<{
    $isRight?: boolean;
    $isLarge?: boolean;
}>`
    font-weight: 400;
    font-size: ${props => props.$isLarge ? "20px" : "15px"};
    text-align: ${props => props.$isRight ? "right" : "left"};
`;

export const ScanContainer = styled.div`
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const ScanTitle = styled.p`
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    color: #00ADEF;
`;

export const ScanField = styled.div`
    padding: 16px;
    display: grid;
    grid-template-columns: 150px 1fr;
    align-items: center;
    gap: 10px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.2);
`;

export const ScanFieldText = styled.p<{
    $hasMask?: boolean;
}>`
    

    ${props => props.$hasMask && css`
        color: rgba(255, 255, 255, 0.5);
    `}
`;

export const QrCode = styled.div`
    margin: 0 auto;
    width: 250px;
    aspect-ratio: 1;
    background: #fff;
`;