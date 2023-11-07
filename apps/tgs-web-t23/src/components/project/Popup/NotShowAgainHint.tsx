import styled from "styled-components";
import { theme } from "@/theme";

const NotShowAgainHintContainer = styled.div`
  background: ${({ theme }) => theme.primaryLight};
  width: 100%;
  height: 38px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  color: #ffffff;
`;

type CheckBoxProps = {
  $isCheck: boolean;
  theme: typeof theme;
};
const CheckBox = styled.div<CheckBoxProps>`
  width: 18px;
  height: 18px;
  background: ${({ $isCheck, theme }: CheckBoxProps) => ($isCheck ? theme.primary : null)};
  margin-right: 10px;
  border: ${(props) => (props.$isCheck ? "0" : "1px")} solid #ffffff;
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
