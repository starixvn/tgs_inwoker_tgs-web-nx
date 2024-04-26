import styled from "styled-components";
import { FormContainerProps } from "../types";
import {LabelContainer as ProfileLabelContainer} from "@/components/styled-component/ProfileForms";
import { theme } from "@/theme";
import {ItemContainer,} from "@/components/styled-component/ProfileForms";
import { media } from "@/theme/breakpoints";

export const Icon = styled.img`
  width: 20px;
  aspect-ratio: 1;
`;

export const WarningText = styled.div`
  color: ${({ theme }) => theme.red};
`;

export const TransferHint = styled.div`
  font-weight: bold;
`;

export const CurrencyHint = styled.p`
  margin-top: 5px;
  color: red;
`;

export const LabelContainer = styled(ProfileLabelContainer)`
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 10px;
`;

type BadgeProps = {
  $isActive: boolean;
  theme: typeof theme;
};
export const Badge = styled.div<BadgeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
  background: ${({$isActive, theme}) => $isActive ? theme.blue40 : theme.blue20};
  font-size: 0.812rem;
  font-weight: 400;
  color: ${({$isActive, theme}) => ($isActive ? theme.white : theme.black)};
  text-align: center;
  cursor: pointer;
  word-break: break-word;

  ${media.sm} {
    padding: 10px;
  }
`;

export const BadgeWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  gap: 10px;

  ${media.md} {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const Item = styled(ItemContainer)`
  margin-bottom: 10px;
  ${media.md} {
    max-width: 100%;
  }
`

export const FormContainer = ({
  children,
  label,
}: FormContainerProps) => (
  <Item>
    <LabelContainer>
      {label}
    </LabelContainer>
    <BadgeWrapper>
      {children}
    </BadgeWrapper>
  </Item> 
);