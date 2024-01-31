import React from "react";
import styled from "styled-components";

const SubHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
`;
const NumberContainer = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 3.2px;
  background-color: ${({ theme }) => theme.primary};
  font-family: Arial;
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ theme }) => theme.white};
  text-align: center;
  padding-top: 2px;
  float: left;
`;
const SubTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  float: left;
  color: ${({ theme }) => theme.white};
  white-space: nowrap;
`;

type Props = {
  step?: number;
  title: string;
  children?: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

const StepTitle = ({ step, title, children, ...others }: Props) => {
  return (
    //@ts-ignore
    <SubHeaderContainer {...others}>
      {typeof step === "number" && <NumberContainer>{step}</NumberContainer>}
      <SubTitle>{title}</SubTitle>
      {children}
    </SubHeaderContainer>
  );
};

export default StepTitle;
