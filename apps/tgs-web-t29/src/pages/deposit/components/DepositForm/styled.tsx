import styled from "styled-components";
import { FormContainerProps } from "./types";
import {LabelContainer as ProfileLabelContainer} from "@/components/styled-component/ProfileForms";
import { theme } from "@/theme";
import {ItemContainer,} from "@/components/styled-component/ProfileForms";

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

export const Form = styled.form`
  display: block;
`;

export const LabelContainer = styled(ProfileLabelContainer)`
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
`;

type BadgeProps = {
  $isActive: boolean;
  theme: typeof theme;
};
export const Badge = styled.div<BadgeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: ${({$isActive, theme}) => $isActive ? theme.blue40 : theme.blue20};
  font-size: 0.812rem;
  font-weight: 400;
  color: ${({$isActive, theme}) => ($isActive ? theme.white : theme.black)};
  text-align: center;
  cursor: pointer;
`;

export const BadgeWrapper = styled.div`
  margin-top: 16px;
  width: 100%;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const FormContainer = ({
  children,
  label,
}: FormContainerProps) => (
  <ItemContainer>
    <LabelContainer>
      {label}
    </LabelContainer>
    <BadgeWrapper>
      {children}
    </BadgeWrapper>
  </ItemContainer> 
);