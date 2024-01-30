import React from "react";
import styled from "styled-components";
import authImage from "@/assets/t25/images/auth/BN.png";
import { media } from "@/theme/breakpoints";

const AuthDialogImageContainer = styled.div`
  position: relative;
  width: 30%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.md} {
    width: 50%;
  }

  & > .bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
`;

const AuthDialogImage = () => {
  return (
    <AuthDialogImageContainer>
      <img className={"bg"} src={authImage} alt={"welcome"} />
    </AuthDialogImageContainer>
  );
};

export default AuthDialogImage;
