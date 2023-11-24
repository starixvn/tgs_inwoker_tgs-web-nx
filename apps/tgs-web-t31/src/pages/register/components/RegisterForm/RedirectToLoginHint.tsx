import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuthDialog } from "@tgs-web-nx/core/features";

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
      <LinkText onClick={handleRedirect} >
        {i18n.t("common.login")}
      </LinkText>
    </CreateAccountContainer>
  );
};

export default React.memo(RedirectToLoginHint);
