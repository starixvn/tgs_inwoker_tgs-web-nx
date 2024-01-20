import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { theme } from "@/theme";
import IconCheckBox from "@/assets/t23/images/icon_checkbox.svg";

const NotShowAgainHintContainer = styled.div`
  height: 38px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.black};
`;

type CheckBoxProps = {
  $isCheck: boolean;
  theme: typeof theme;
};
const CheckBox = styled.div<CheckBoxProps>`
  width: 18px;
  height: 18px;
  background: ${(props: CheckBoxProps) =>
    props.$isCheck ? `url(${IconCheckBox}) no-repeat center center;` : null};
  margin-right: 10px;
  border: ${(props) => (props.$isCheck ? "0" : "1px")} solid #000000;
  border-radius: 5px;
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
