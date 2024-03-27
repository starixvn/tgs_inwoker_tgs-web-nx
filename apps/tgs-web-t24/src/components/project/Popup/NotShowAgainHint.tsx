import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { theme } from "@/theme";
import IconCheckBox from "@/assets/t24/images/checkbox.svg";

const NotShowAgainHintContainer = styled.div`
  background: ${({ theme }) => theme.gray90};
  width: fit-content;a
  height: 39px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.white};
  border-radius: 4px;
  padding: 10px;
  margin-top: 15px;
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
  border: ${(props) => (props.$isCheck ? "0" : "1px")} solid ${({ theme }) => theme.primary};
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
