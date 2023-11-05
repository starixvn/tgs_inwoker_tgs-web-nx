import React, { useCallback } from "react";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { useHistory } from "react-router";
import { useAuthDialog } from "@/core/feature/useAuthDialog";

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

type Props = {};
const RedirectToLoginHint = (props: Props) => {
  const { isDesktopSize } = useRwd();
  const { handleToggleRegisterDialog, handleToggleLoginDialog } = useAuthDialog();
  const history = useHistory();

  const handleRedirect = useCallback(() => {
    if (!isDesktopSize) {
      return history.push("/login");
    }

    handleToggleRegisterDialog(false);
    handleToggleLoginDialog(true);
  }, []);

  return (
    <CreateAccountContainer>
      <span>
        <>{i18n.t("T13.proceedLogin")}</>
      </span>
      <span onClick={handleRedirect} className={"link"}>
        <>{i18n.t("common.login")}</>
      </span>
    </CreateAccountContainer>
  );
};

export default React.memo(RedirectToLoginHint);
