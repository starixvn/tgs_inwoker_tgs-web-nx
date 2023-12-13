import React from "react";
import { Dialog } from "@mui/material";
import styled from "styled-components";
import { BrandsSupport } from "@tgs-web-nx/types";

const QRCodeContainer = styled.div`
  margin: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const QRCodeImage = styled.img`
  height: 175px;
  width: 175px;
`;

const QRCodeText = styled.div`
  padding: 10px 0px;
  font-weight: bold;
  font-size: 34px;
`;

const IDText = styled.div`
  font-size: 24px;
`;

type QrCodeHolderProps = {
  selectedBrandsSupport: BrandsSupport;
};
const QRCodeHolder = ({ selectedBrandsSupport }: QrCodeHolderProps) => {
  const { qrcodeurl, type, appid } = selectedBrandsSupport;

  if (qrcodeurl) {
    return (
      <QRCodeContainer>
        <QRCodeImage src={qrcodeurl} />
        <QRCodeText>{type}</QRCodeText>
      </QRCodeContainer>
    );
  } else {
    return (
      <QRCodeContainer>
        <QRCodeText>{type}</QRCodeText>
        <IDText>ID: {appid}</IDText>
      </QRCodeContainer>
    );
  }
};

type Props = {
  selectedBrandsSupport: BrandsSupport | null;
  handleClose: () => void;
};
const QrCodeDialog = ({ selectedBrandsSupport, handleClose }: Props) => {
  return (
    <Dialog open={!!selectedBrandsSupport} onClose={handleClose}>
      {selectedBrandsSupport && <QRCodeHolder selectedBrandsSupport={selectedBrandsSupport} />}
    </Dialog>
  );
};

export default QrCodeDialog;
