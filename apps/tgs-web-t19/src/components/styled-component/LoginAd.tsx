import styled from "styled-components";
import { DialogContent } from "@mui/material";
import Ad from "@/assets/t19/images/login-ad.png";

export const LoginAd = styled(DialogContent)`
  width: 100%;
  padding-top : 100%;
  background: url(${Ad}) no-repeat center center;
  background-size: cover
`;
