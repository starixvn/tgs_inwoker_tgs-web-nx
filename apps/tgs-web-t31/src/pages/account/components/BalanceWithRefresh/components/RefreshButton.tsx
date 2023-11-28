import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import refreshImg from "@/assets/t31/images/account/Refresh.png";

type StyledRefreshButtonProps = {
  $isSpinning: boolean;
};

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledRefreshButton = styled.div<StyledRefreshButtonProps>`
  width: 24px;
  height: 24px;
  cursor: pointer;
  animation: ${({ $isSpinning }: StyledRefreshButtonProps) =>
    $isSpinning
      ? css`
          ${spinAnimation} 1s linear infinite
        `
      : "none"};
`;

const RefreshImage = styled.img`
  width: 100%;
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
      <RefreshImage src={refreshImg} alt="refresh" />
    </StyledRefreshButton>
  );
};

export default RefreshButton;
