import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import refreshImg from "@/assets/t21/images/account/balanceTracker/refresh.svg";
import Icon from "@/components/project/Icon";

type StyledRefreshButtonProps = {
  $isSpinning: boolean;
};

const spinAnimation = keyframes`
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const StyledRefreshButton = styled.div<StyledRefreshButtonProps>`
  cursor: pointer;
  animation: ${({ $isSpinning }: StyledRefreshButtonProps) =>
    $isSpinning
      ? css`
          ${spinAnimation} 1s linear infinite
        `
      : "none"};
`;

type Props = {
  handleClick: () => Promise<void>;
};
const RefreshButton = ({ handleClick }: Props) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRefreshClick = async () => {
    setIsSpinning(true);
    await handleClick();
    setIsSpinning(false);
  };

  return (
    <StyledRefreshButton $isSpinning={isSpinning} onClick={handleRefreshClick}>
      <Icon iconUrl={refreshImg} width={"20px"} height={"20px"} />
    </StyledRefreshButton>
  );
};

export default RefreshButton;
