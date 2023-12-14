import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useRedirectToRegisterHint } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import styled from "styled-components";
import { RedirectContainer } from "@/components/styled-component/auth/Form";

const RedirectToRegisterHint = (props: React.HTMLProps<HTMLDivElement>) => {
  const { handleRedirect } = useRedirectToRegisterHint();
  const { isMobileSize } = useRwd();

  const RegisterText = styled.span`
    color: ${({ theme }) => theme.yellow};
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
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
