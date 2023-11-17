import styled from "styled-components";
import { theme } from "@/theme";
import IconCheckBox from "@/assets/t23/images/icon_checkbox.svg";

const NotShowAgainHintContainer = styled.div`
  width: fit-content;
  height: 38px;
  padding: 10px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.font};
`;

type CheckBoxProps = {
  $isCheck: boolean;
  theme: typeof theme;
};
const CheckBox = styled.div<CheckBoxProps>`
  width: 18px;
  height: 18px;
  margin-right: 10px;
  border: ${({ theme, $isCheck }) => ($isCheck ? "none" : `1px solid ${theme.font}}`)};
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
      Don't show again
    </NotShowAgainHintContainer>
  );
};

export default NotShowAgainHint;
