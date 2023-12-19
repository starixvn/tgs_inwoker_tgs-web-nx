import React from "react";
import styled from "styled-components";

const SubHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
`;
const NumberContainer = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.primary};
  font-size: 0.75rem;
  font-weight: 400;
  color: ${({ theme }) => theme.black};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SubTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  float: left;
  color: ${({ theme }) => theme.text};
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
