import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
// import iconReturn from "@/assets/t21/images/dialog/icon-close.svg";
import Icon from "@/components/project/Icon";
import downloadImg from "@/assets/t21/images/header/icon-download.svg";
import backIcon from "@/assets/t21/images/dialog/icon-close.svg";

export const DIALOG_HEADER_HEIGHT = "50px";

const DialogHeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${DIALOG_HEADER_HEIGHT};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.primary};
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0;
  z-index: 1300;
  padding: 10px 11.42px;
  gap: 14px;
`;

const ReturnIconContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 17px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  cursor: pointer;
`;

type Props = {
  handleClose: () => void;
  dialogHeaderTitle: string;
};

const DialogHeader = ({ dialogHeaderTitle, handleClose }: Props) => {
  const history = useHistory();

  const goToDownload = useCallback(() => {
    history.push("/appDownload");
  }, []);
  return (
    <DialogHeaderContainer>
      <ReturnIconContainer onClick={handleClose}>
        <Icon iconUrl={backIcon} width={"20px"} height={"20px"} />
      </ReturnIconContainer>
      {/* <ReturnIconContainer onClick={handleClose}>
        <Icon iconUrl={iconReturn} width={"20px"} height={"20px"} />
      </ReturnIconContainer> */}

      {dialogHeaderTitle}

      {/* <Icon
        iconUrl={downloadImg}
        width={"30px"}
        height={"30px"}
        style={{
          cursor: "pointer",
        }}
        onClick={() => goToDownload()}
      /> */}
    </DialogHeaderContainer>
  );
};

export default DialogHeader;
