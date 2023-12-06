import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useRedirectToRegisterHint } from "@tgs-web-nx/core/features";

const CreateAccountContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.white};
  font-size: 0.937rem;
  font-weight: 700;
  align-self: baseline;
  display: flex;
  align-items: center;
  justify-content: center;

  .link {
    color: ${({ theme }) => theme.yellow};
    margin-left: 8px;
    cursor: pointer;
  }
`;

const RedirectToRegisterHint = (props: React.HTMLProps<HTMLDivElement>) => {
  const { handleRedirect } = useRedirectToRegisterHint();

  return (
    //@ts-ignore
    <CreateAccountContainer {...props}>
      <span>{i18n.t("T13.proceedRegister")}</span>
      <span onClick={handleRedirect} className="link">
        {i18n.t("common.register")}
      </span>
    </CreateAccountContainer>
  );
};

export default React.memo(RedirectToRegisterHint);
