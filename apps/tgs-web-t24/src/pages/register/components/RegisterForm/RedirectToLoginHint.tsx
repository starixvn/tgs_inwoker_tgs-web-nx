import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { useAuthDialog } from "@/core/feature/useAuthDialog";

const CreateAccountContainer = styled.div`
  width: 100%;
  color: white;
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

type Props = React.HTMLProps<HTMLDivElement>;

const RedirectToLoginHint = (props: Props) => {
  const { isDesktopSize } = useRwd();
  const { handleToggleRegisterDialog, handleToggleLoginDialog, handleToggleForgotPasswordDialog } =
    useAuthDialog();
  const history = useHistory();

  const handleRedirect = useCallback(() => {
    if (!isDesktopSize) {
      return history.push("/login");
    }

    handleToggleRegisterDialog(false);
    handleToggleForgotPasswordDialog(false);
    handleToggleLoginDialog(true);
  }, []);

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
