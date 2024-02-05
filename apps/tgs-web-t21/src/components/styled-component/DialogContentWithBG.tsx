import styled from "styled-components";
import { DialogContent } from "@mui/material";
import BG from "@/assets/t21/images/loginBG.png";

export const DialogContentWithBG = styled(DialogContent)`
  background: url(${BG}) no-repeat center center;
  background-size: cover;
`;
