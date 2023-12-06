import styled from "styled-components";
import { styled as muiStyled } from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import React from "react";
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { theme } from "@/theme";

export const MenuDrawerListContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid ${({ theme }) => theme.gray80};

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #53535375;
  }

  &::-webkit-scrollbar-track-piece {
    background: transparent;
  }

  & > * {
    flex-shrink: 0;
  }
`;
export const MenuDrawerListGroup = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.gray80};
`;
export const MenuRow = styled.div`
  padding: 17px 34px;
  color: ${({ theme }) => theme.gray5};
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.gray95};
  }
`;
export const MenuRowLabel = styled.span`
  white-space: nowrap;
`;
export const Accordion = muiStyled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));
export const AccordionSummary = muiStyled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(() => ({
  backgroundColor: `${theme.mainBackground} !important`,
  flexDirection: "row",
  color: theme.gray10,
  padding: "21px 34px",

  // position: "relative",
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: theme.gray10,
    transform: "rotate(0deg)",
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    margin: 0,
  },
}));
export const AccordionDetails = muiStyled(MuiAccordionDetails)(() => ({
  background: `${theme.mainBackground} !important`,
  padding: 0,
}));
