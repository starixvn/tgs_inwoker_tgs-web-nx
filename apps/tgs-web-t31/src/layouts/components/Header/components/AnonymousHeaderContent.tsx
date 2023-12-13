import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { RoundHeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

type Props = {
  buttonWidth?: string;
};

const AnonymousHeaderContent = ({ buttonWidth }: Props) => {
  const history = useHistory();
  const loginStyle = {
    color: theme.neutralBlack,
    background: theme.tertiaryGradient,
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

  const registerStyle = {
    ...loginStyle,
    background: theme.secondaryGradient,
  };
  return (
    <ButtonContainer>
      <RoundHeaderButton
        onClick={() => {
          history.push("/login");
        }}
        style={loginStyle}
      >
        {i18n.t("common.login").toLocaleUpperCase()}
      </RoundHeaderButton>

      <RoundHeaderButton
        color={"primary"}
        onClick={() => {
          history.push("/register");
        }}
        style={registerStyle}
      >
        {i18n.t("common.register").toLocaleUpperCase()}
      </RoundHeaderButton>
    </ButtonContainer>
  );
};

export default AnonymousHeaderContent;
