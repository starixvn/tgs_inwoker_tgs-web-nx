import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";
import { useHistory } from "react-router";
import { RedirectContainer } from "@/components/styled-component/auth/Form";
import { media } from "@/theme/breakpoints";

const LoginText = styled.span`
  text-decoration: underline;
  ${media.sm} {
    color: ${({ theme }) => theme.yellow};
  }
`;

const RedirectToLoginHint = (props: React.HTMLProps<HTMLDivElement>) => {
  const history = useHistory();

  return (
    //@ts-ignore
    <RedirectContainer {...props}>
      <LoginText
        onClick={() => {
          history.push("/login");
        }}
        className={"link"}
      >
        {i18n.t("common.login")}
      </LoginText>
    </RedirectContainer>
  );
};

export default React.memo(RedirectToLoginHint);
