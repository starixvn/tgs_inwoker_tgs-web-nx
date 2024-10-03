import { Checkbox } from "@/components/UI/Checkbox";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";

const NotShowAgainHintContainer = styled.div`
  width: fit-content;
  height: 38px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.gray60};
  margin: 18px 0;
  position: relative;
  left: -1.2rem;
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
      <Checkbox value={isCheck} />
      {i18n.t("common.donotshowagain")}
    </NotShowAgainHintContainer>
  );
};

export default NotShowAgainHint;
