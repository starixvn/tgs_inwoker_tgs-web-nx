import { theme } from "@/theme";
import styled from "styled-components";
import { ArrowLeftIcon } from "../CustomizeIcon";

export const DIALOG_HEADER_HEIGHT = "54px";

const DialogHeaderContainer = styled.div`
  width: 100%;
  height: ${DIALOG_HEADER_HEIGHT};
  background: ${({ theme }) => theme.dialogLayoutBackground};
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

export const ReturnIconContainer = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.gapPage};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const DialogTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  padding-left: 1.2rem;
  letter-spacing: .04rem;
  color: ${({ theme }) => theme.headerDialogTextColor}
`;

const IconWrapper = styled.div`
  background: ${({ theme }) => theme.backIconHeaderDialogBgColor};
  border: 1px solid ${({ theme }) => theme.backIconHeaderDialogBoderColor};
  box-shadow: ${({ theme }) => theme.backIconHeaderDialogBoxshadow};
  border-radius: .8rem;
  padding: .3rem .4rem;
`;

type Props = {
  handleClose: () => void;
  dialogHeaderTitle: string;
};

const DialogHeader = ({ dialogHeaderTitle, handleClose }: Props) => {
  return (
    <DialogHeaderContainer>
      <ReturnIconContainer onClick={handleClose}>
        <IconWrapper><ArrowLeftIcon sx={{color: `${theme.backIconHeaderDialogColor}`, fontSize: "2rem", position: "relative", top: "5px", left: "6px"}}/></IconWrapper>
        <DialogTitle>{dialogHeaderTitle}</DialogTitle>
      </ReturnIconContainer>
    </DialogHeaderContainer>
  );
};

export default DialogHeader;
