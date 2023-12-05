import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useRedirectToLoginHint } from "@tgs-web-nx/core/features";
import { RedirectContainer } from "@/components/styled-component/auth/Form";

const RedirectToLoginHint = (props: React.HTMLProps<HTMLDivElement>) => {
  const { handleRedirect } = useRedirectToLoginHint();

  return (
    //@ts-ignore
    <RedirectContainer {...props}>
      <span>{i18n.t("T13.proceedLogin")}</span>
      <span onClick={handleRedirect} className={"link"}>
        {i18n.t("common.login")}
      </span>
    </RedirectContainer>
  );
};

export default React.memo(RedirectToLoginHint);
