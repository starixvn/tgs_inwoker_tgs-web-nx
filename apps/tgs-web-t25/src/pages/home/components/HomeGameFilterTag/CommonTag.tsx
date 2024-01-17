import styled from "styled-components";
import Icon from "@/components/project/Icon";

const CommonTagContainer = styled.div<{
  $isActive: boolean;
}>`
  width: calc((100% - 10px) / 2);
  display: flex;
  align-items: center;
  height: 100%;
  user-select: none;
  color: ${({ $isActive, theme }) => ($isActive ? theme.green : "#999999")};
  cursor: pointer;
  gap: 7px;
  overflow: visible;
`;

const Label = styled.div`
  overflow: visible;
`;

type Props = {
  text: string;
  isActive: boolean;
  iconUrl?: string;
  activedUrl?: string;
  onClick: () => void;
};

const CommonTag = ({ text, isActive, iconUrl, activedUrl, onClick }: Props) => {
  return (
    <CommonTagContainer $isActive={isActive} onClick={onClick}>
      <Icon iconUrl={`${isActive ? activedUrl : iconUrl}`} width={"18px"} height={"18px"} />
      <Label>{text}</Label>
    </CommonTagContainer>
  );
};

export default CommonTag;
