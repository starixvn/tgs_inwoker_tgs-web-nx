import React from "react";
import styled from "styled-components";
import { usePageName } from "@tgs-web-nx/core/features";
import authImage from "@/assets/t23/images/auth/login-header-img 1.png";

const AuthDialogImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 169px;
  z-index: 1;
  background: #6401d5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 33px 60px 0 27px;

  & > .bg {
    width: 178px;
    height: 152px;
    align-self: flex-start;
  }
`;

const TitleContainer = styled.div`
  font-size: 3rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: visible;
`;

const AuthDialogImage = () => {
  const { pageName } = usePageName();

  return (
    <AuthDialogImageContainer>
      <TitleContainer>{pageName}</TitleContainer>
      <img className={"bg"} src={authImage} alt={"welcome"} />
    </AuthDialogImageContainer>
  );
};

export default AuthDialogImage;
