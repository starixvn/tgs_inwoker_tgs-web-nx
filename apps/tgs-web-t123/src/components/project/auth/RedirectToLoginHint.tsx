import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useRedirectToLoginHint } from "@tgs-web-nx/core/features";

const CreateAccountContainer = styled.div`
  width: 100%;
  color: white;
  font-size: 1.062rem;
  font-weight: 400;
  line-height: 1.245;
  align-self: baseline;
  display: flex;
  align-items: center;
  justify-content: center;

  .link {
    color: ${({ theme }) => theme.primary};
    margin-left: 8px;
    cursor: pointer;
  }
`;

const LinkText = styled.div`
  text-decoration: underline;
`;

const RedirectToLoginHint = (props: React.HTMLProps<HTMLDivElement>) => {
  const { handleRedirect } = useRedirectToLoginHint();

  return (
    //@ts-ignore
    <CreateAccountContainer {...props}>
      <LinkText onClick={handleRedirect}>{i18n.t("common.login")}</LinkText>
    </CreateAccountContainer>
  );
};

export default React.memo(RedirectToLoginHint);
