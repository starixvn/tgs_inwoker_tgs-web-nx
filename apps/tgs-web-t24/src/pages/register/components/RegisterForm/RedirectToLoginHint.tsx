import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useRedirectToLoginHint } from "@tgs-web-nx/core/features";

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

const RedirectToLoginHint = (props: React.HTMLProps<HTMLDivElement>) => {
  const { handleRedirect } = useRedirectToLoginHint();

  return (
    //@ts-ignore
    <CreateAccountContainer {...props}>
      <span>{i18n.t("T13.proceedLogin")}</span>
      <span onClick={handleRedirect} className={"link"}>
        {i18n.t("common.login")}
      </span>
    </CreateAccountContainer>
  );
};

export default React.memo(RedirectToLoginHint);
