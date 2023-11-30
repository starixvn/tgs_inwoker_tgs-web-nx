import React, { HTMLProps } from "react";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";

const LoadingBlockContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  size: number;
} & HTMLProps<HTMLDivElement>;

const LoadingBlock = ({ size, ...others }: Props) => {
  return (
    //@ts-ignore
    <LoadingBlockContainer {...others}>
      <CircularProgress size={size} color={"primary"} />
    </LoadingBlockContainer>
  );
};

export default LoadingBlock;
