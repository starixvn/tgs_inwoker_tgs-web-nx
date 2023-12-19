import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useRedirectToRegisterHint } from "@tgs-web-nx/core/features";
import { RedirectContainer } from "@/components/styled-component/auth/Form";
import { Button } from "@/components/UI/Button";

const RedirectToRegisterHint = (props: React.HTMLProps<HTMLDivElement>) => {
  const { handleRedirect } = useRedirectToRegisterHint();

  return (
    //@ts-ignore
    <RedirectContainer {...props}>
      <span>{i18n.t("T13.proceedRegister")}</span>
      <Button fullWidth onClick={handleRedirect}>
        {i18n.t("common.register")}
      </Button>
    </RedirectContainer>
  );
};

export default React.memo(RedirectToRegisterHint);
