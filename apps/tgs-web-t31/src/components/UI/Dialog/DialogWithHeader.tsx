import { Dialog as MuiDialog, DialogProps } from "@mui/material";
import React, {
  CSSProperties,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";
import styled from "styled-components";
import { TransitionProps } from "@mui/material/transitions";
import DialogHeader from "@/components/UI/Dialog/DialogHeader";
import { UpTransition } from "@/components/UI/Dialog/Transition";

const DialogContainer = styled(MuiDialog)`
  z-index: 999 !important; // can't overlap footer(which z-index is 1000)
  & .MuiPaper-root {
    position: relative;
    padding: 73px 0 82px; // header/footer
    background: ${({ theme }) => theme.primaryDark};
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: scroll;
  padding: 21px 22px;
`;

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  dialogHeaderTitle?: string;
  style?: CSSProperties;
  transitionComponent?: ForwardRefExoticComponent<
    PropsWithoutRef<TransitionProps & { children?: React.ReactNode }> & RefAttributes<unknown>
  >;
} & DialogProps;

const DialogWithHeader = ({
  open,
  onClose,
  children,
  dialogHeaderTitle,
  style,
  transitionComponent,
  ...others
}: Props) => {
  return (
    <DialogContainer
      fullScreen
      open={open}
      TransitionComponent={transitionComponent || UpTransition}
      style={style}
      {...others}
    >
      <DialogHeader dialogHeaderTitle={dialogHeaderTitle || ""} handleClose={onClose} />

      <ChildContainer>{children}</ChildContainer>
    </DialogContainer>
  );
};

export default React.memo(DialogWithHeader);
