import React from "react";
import styled from "styled-components";
import authImage from "@/assets/t24/images/auth/authBG.png";

const AuthDialogImageContainer = styled.div`
  position: relative;
  width: 50%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > .bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: bottom;
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
