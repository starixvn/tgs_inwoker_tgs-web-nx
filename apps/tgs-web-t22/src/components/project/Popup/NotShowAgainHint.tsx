import styled from "styled-components";
import { theme } from "@/theme";
import IconCheckBox from "@/assets/t22/images/promotion/icon_checkbox.svg";
import { media } from "@/theme/breakpoints";

const NotShowAgainHintContainer = styled.div`
  width: fit-content;
  height: 38px;
  padding: 10px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.black};
  margin: 18px 0;

  ${media.sm} {
    color: ${({ theme }) => theme.white};
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
    props.$isCheck ? `url(${IconCheckBox}) no-repeat center center;` : null
  };
  margin-right: 10px;
  border: ${(props) => (props.$isCheck ? "0" : "1px")} solid ${({ theme }) => theme.black};
  border-radius: 5px;

  ${media.sm} {
    border: ${(props) => (props.$isCheck ? "0" : "1px")} solid ${({ theme }) => theme.white};
  }
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
