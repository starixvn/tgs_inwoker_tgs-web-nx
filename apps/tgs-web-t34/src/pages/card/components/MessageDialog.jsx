import React from "react";
import styled from "styled-components";
import { Modal, Slide, styled as muiStyled } from "@mui/material";
import { i18n } from "@tgs-web-nx/utils";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledModalPopup = muiStyled(Modal)(({ theme }) => ({
  paper: {
    borderRadius: "50px",
    fontSize: "28px",
    color: "#666666",
    padding: "30px",
    width: "600px",
    maxWidth: "690px",
    display: "block",
  },
}));

const DialogTitle = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin: 0 auto;
  display: table;
  color: #4a4a4a;
`;
const DialogMessage = styled.div`
  font-size: 26px;
  margin: 30px 45px;
  color: #4a4a4a;
  line-height: 1.8em;
  text-align: center;
`;
const ButtonConfirm = styled.div`
  width: 250px;
  height: 90px;
  border-radius: 20px;

  font-size: 34px;

  text-align: center;

  padding-top: 24px;

  margin: 10px auto;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
  color: ${({ theme }) => theme.white};
`;

function MessageDialog(props) {
  return (
    <StyledModalPopup onClose={props.onClose} open={props.open} TransitionComponent={Transition}>
      <>
        <DialogTitle>{i18n.t("share.messageDialog.info")}</DialogTitle>
        <DialogMessage>{props.message}</DialogMessage>
        <ButtonConfirm onClick={props.onClick}>{i18n.t("common.confirm")}</ButtonConfirm>
      </>
    </StyledModalPopup>
  );
}

export default MessageDialog;
