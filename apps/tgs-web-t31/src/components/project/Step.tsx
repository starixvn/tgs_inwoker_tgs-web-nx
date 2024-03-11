import React from "react";
import styled from "styled-components";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";

const Container = styled.div`
  width: 100%;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 20px;
`;

const StepContainer = styled.div`
  width: 50%;
  float: left;
`;

type StepCircleProps = {
  $active: boolean;
  theme: typeof theme;
};
const StepCircle = styled.div<StepCircleProps>`
  color: ${({ $active, theme }: StepCircleProps) => ($active ? theme.iconLable : "#c3c3c3")};
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  border-radius: 50%;
  padding-top: 3px;

  ${media.sm} {
    color: ${({ $active, theme }: StepCircleProps) => ($active ? theme.primary : "#c3c3c3")};
  }
`;

type StepLineProps = {
  $active: boolean;
  $isFirst: boolean;
  $isLast: boolean;
  theme: typeof theme;
};
const StepLine = styled.div<StepLineProps>`
  height: 8px;
  background-color: ${({ $active, theme }: StepLineProps) => ($active ? theme.iconLable : "#c3c3c3")};
  ${({ $isFirst }: StepLineProps) => ($isFirst ? `border-radius: 4px 0 0 4px;` : "")};
  ${({ $isLast }: StepLineProps) => ($isLast ? `border-radius: 0 4px 4px 0;` : "")};
  margin-top: 14px;
  
  ${media.sm} {
    background-color: ${({ $active, theme }: StepCircleProps) => ($active ? theme.primary : "#c3c3c3")};
  }
`;

type StepLabelProps = {
  $active: boolean;
  theme: typeof theme;
};
const StepLabel = styled.div<StepLabelProps>`
  font-size: 1rem;
  color: ${({ $active, theme }: StepLabelProps) => ($active ? theme.iconLable : "#c3c3c3")};
  text-align: center;
  margin-top: 8px;
  width: 100%;
  font-weight: 600;

  ${media.sm} {
    color: ${({ $active, theme }: StepCircleProps) => ($active ? theme.primary : "#c3c3c3")};
  }
`;

type Props = {
  steps: { label: string }[];
  currentStep: number;
};

const Step = ({ steps, currentStep }: Props) => {
  return (
    <Container>
      {steps.map((row, index) => {
        return (
          <StepContainer key={index}>
            <StepCircle $active={index + 1 <= currentStep}>STEP {index + 1}</StepCircle>

            <StepLine
              $active={index + 1 <= currentStep}
              $isFirst={index === 0}
              $isLast={index === steps.length - 1}
            />

            <StepLabel $active={index + 1 <= currentStep}>{row.label}</StepLabel>
          </StepContainer>
        );
      })}
    </Container>
  );
};

export default Step;