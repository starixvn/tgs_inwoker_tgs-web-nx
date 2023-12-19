import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useAuthContext } from "@tgs-web-nx/core/features";
import { RoundHeaderButton } from "./HeaderButton";
import { theme } from "@/theme";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 12px;
`;

const AccountHeaderContent = () => {
  const history = useHistory();
  const { handleLogout } = useAuthContext();

  const transferStyle = {
    color: theme.neutralBlack,
    background: theme.secondaryGradient,
    width: "140px",
    height: "30px",
    padding: "6px 12px",
    borderRadius: "4px",
    gap: "4px",
    fontSize: "14px",
    fontWeight: 700,
    lineHeight: "16px",
    letterSpacing: "0em",
    justifyContent: "center",
  };

  const logOutstyle = {
    ...transferStyle,
    background: theme.tertiaryGradient,
  };
  return (
    <ButtonContainer>
      <RoundHeaderButton
        onClick={() => {
          history.push("/transfer");
        }}
        style={transferStyle}
      >
        {i18n.t("common.transfer").toLocaleUpperCase()}
      </RoundHeaderButton>

      <RoundHeaderButton color={"primary"} onClick={handleLogout} style={logOutstyle}>
        {i18n.t("web.header.logout").toLocaleUpperCase()}
      </RoundHeaderButton>
    </ButtonContainer>
  );
};

export default AccountHeaderContent;
