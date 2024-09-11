import Icon from "@/components/project/Icon";
import styled from "styled-components";

export const DIALOG_HEADER_HEIGHT = "64px";

const DialogHeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${DIALOG_HEADER_HEIGHT};
  background: ${({ theme }) => theme.dialogTitleBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.white};
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0;
  z-index: 1300;
  padding: 22px 10px;
  gap: 14px;
`;

const ReturnIconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const DialogTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
  padding-left: 1.2rem;
  letter-spacing: .04rem;
`;

type Props = {
  handleClose: () => void;
  dialogHeaderTitle: string;
};

const DialogHeader = ({ dialogHeaderTitle, handleClose }: Props) => {
  return (
    <DialogHeaderContainer>
      <ReturnIconContainer onClick={handleClose}>
        <Icon iconUrl="/assets/images/common/icon-back.svg" width={"32px"} height={"32px"} />
        <DialogTitle>{dialogHeaderTitle}</DialogTitle>
      </ReturnIconContainer>
    </DialogHeaderContainer>
  );
};

export default DialogHeader;
