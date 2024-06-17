import styled from "styled-components";
import { FormContainerProps } from "@tgs-web-nx/types";
import {LabelContainer, LabelContainer as ProfileLabelContainer} from "@/components/styled-component/ProfileForms";
import {ItemContainer,} from "@/components/styled-component/ProfileForms";
import { media } from "@/theme/breakpoints";
import { theme } from "@/theme";

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

type BadgeProps = {
  $isActive: boolean;
};
export const Badge = styled.div<BadgeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
  font-size: 0.812rem;
  font-weight: 400;
  color: ${({$isActive}) => ($isActive ? theme.white : theme.gray01)};
  background: ${({$isActive}) => ($isActive ? theme.primary : "transparent")};
  border: 1px solid ${({$isActive}) => ($isActive ? theme.primary : theme.gray01)};
  text-align: center;
  cursor: pointer;
  word-break: break-word;
  border-radius: 3px;

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
  max-width: 100%;
  width: 100%;
  margin-bottom: 10px;
`;

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