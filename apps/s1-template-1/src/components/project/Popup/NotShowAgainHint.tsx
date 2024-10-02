import { theme } from "@/theme";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";

const NotShowAgainHintContainer = styled.div`
  width: fit-content;
  height: 38px;
  padding: 10px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.gray60};
  margin: 18px 0;
`;

type CheckBoxProps = {
  $isCheck: boolean;
  theme: typeof theme;
};
const CheckBox = styled.div<CheckBoxProps>`
  width: 18px;
  height: 18px;
  background: ${(props: CheckBoxProps) =>
    props.$isCheck ? `url("") no-repeat center center;` : null};
  margin-right: 10px;
  border: ${(props) => (props.$isCheck ? "0" : "1px")} solid ${({ theme }) => theme.gray60};
  border-radius: 4px;
`;

const NotShowAgainHint = ({
  onClick,
  isCheck,
  ...others
}: {
  onClick: () => void;
  isCheck: boolean;
  style?: React.CSSProperties;
}) => {
  return (
    <NotShowAgainHintContainer onClick={onClick} {...others}>
      <CheckBox $isCheck={isCheck} />
      {i18n.t("common.donotshowagain")}
    </NotShowAgainHintContainer>
  );
};

export default NotShowAgainHint;
