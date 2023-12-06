import styled from "styled-components";
import { theme } from "@/theme";
import IconCheckBox from "@/assets/t30/images/icon-checkbox.svg";
import { media } from "@/theme/breakpoints";

const NotShowAgainHintContainer = styled.div`
  width: 100%;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${({ theme }) => theme.font};
  margin-top: 20px;

  ${media.sm} {
    justify-content: center;
  }
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
