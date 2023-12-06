import styled from "styled-components";
import React from "react";
import { Modal, Slide } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";

export const Container = styled.div``;
export const Transition = React.forwardRef(function Transition(props, ref) {
  //@ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});
export const ContentBg = styled.div`
  background: #fff;
  width: 100%;

  padding: 60px 60px 30px 60px;
  margin-bottom: 30px;
`;
export const BalanceLabel = styled.div`
  font-size: 30px;

  color: #979797;
`;
export const DepositAmount = styled.div`
  font-size: 80px;
  font-weight: bold;

  color: ${({ theme }) => theme.secondary};
`;
export const SplitLine = styled.div`
  height: 2px;
  background-color: #f1f1f1;
  margin: 50px 0;
`;
export const LeftLabel = styled.div`
  font-size: 24px;
  color: #979797;
  float: left;
`;
export const RightLabel = styled.div`
  font-size: 24px;
  color: #333333;
  float: right;
  font-weight: bold;
`;
export const SplitBoth = styled.div`
  clear: both;
  margin: 30px 0;
`;

export const StyledModalPopup = muiStyled(Modal)(({ theme }) => ({
  paper: {
    borderRadius: "50px",
    fontSize: "28px",
    color: "#666666",
    padding: "30px",
    width: "600px",
    maxWidth: "690px",
    display: "block",
  },
}));
export const DialoTitle = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin: 0 auto;
  display: table;
  color: #4a4a4a;
`;

export const OTPContainer = styled.div`
  position: relative;
  text-align: center;
  margin: 50px 0;
  &:after {
    content: "___   ___   ___   ___   ___   ___";
    display: block;
    position: absolute;
    top: 28px;
    left: 64px;
    white-space: pre;
  }
`;
export const OTPTextBox = styled.input`
  position: relative;
  font-size: 50px;
  z-index: 2;
  border: none;
  background: transparent;
  width: 500px;
  text-indent: 9px;
  padding-left: 64px;
  color: ${({ theme }) => theme.secondary};
  -webkit-letter-spacing: 25.6px;
  -moz-letter-spacing: 25.6px;
  -ms-letter-spacing: 25.6px;
  letter-spacing: 42.6px;
  font-family: Courier;
`;
