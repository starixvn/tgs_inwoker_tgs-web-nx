import React from "react";
import { useHistory } from "react-router";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import styled from "styled-components";
import { RedirectContainer } from "@/components/styled-component/auth/Form";
import { media } from "@/theme/breakpoints";

const RedirectToRegisterHint = (props: React.HTMLProps<HTMLDivElement>) => {
  const history = useHistory();

  const handleRedirect = () => {
    history.push("/register");
  };
  const { isMobileSize } = useRwd();

  const RegisterText = styled.span`
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
    ${media.sm} {
      color: ${({ theme }) => theme.yellow};
    }
  `;
  return (
    //@ts-ignore
    <RedirectContainer {...props}>
      {isMobileSize ? (
        <RegisterText onClick={handleRedirect} className="link">
          {i18n.t("common.register")}
        </RegisterText>
      ) : (
        <>
          <span>{i18n.t("T13.proceedRegister")} </span>
          <RegisterText onClick={handleRedirect}> {i18n.t("common.register")}</RegisterText>
        </>
      )}
    </RedirectContainer>
  );
};

export default React.memo(RedirectToRegisterHint);
