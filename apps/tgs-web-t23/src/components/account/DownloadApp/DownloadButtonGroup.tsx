import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { i18n, utility } from "@tgs-web-nx/utils";
import AppFlag from "@/pages/home/components/AppFlag";
import { HeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";

const Container = styled.div`
  color: ${({ theme }) => theme.white};
  padding-top: 12px;
  font-family: Gill Sans MT;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background: #2e3237;
  margin-top: 12px;
`;

const ContentContainer = styled.div`
  display: flex;
`;

const QRCodeContainer = styled.div``;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DownloadText = styled.div`
  color: ${({ theme }) => theme.white};
  font-family: Gill Sans MT;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 16px;
`;

const DownloadBtn = styled.div`
  width: 100%;
  height: 48px;
  padding: 16px 133.405px 16px 133.595px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentPlacedHere = styled.div`
  position: relative;
  overflow: auto;
`;

const TheFirstSection = styled.div`
  margin-top: 10px;
  display: flex;
  min-height: 150px;
  justify-content: flex-end;
`;

const TheSecondSection = styled.div`
  display: flex;
  justify-content: center;
`;

const FirstSectionContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const SectionContentItem = styled.div`
  padding-left: 15px;
`;

const InstallationGuideButton = styled.div`
  color: #fff;
  background: #000;
  border-radius: 75px;
  padding: 10px 20px;
  font-size: 30px;
  cursor: pointer;
  user-select: none;
`;

const Text = styled.div`
  font-size: 40px;
`;

type IconsProp = {
  $icon?: string | undefined;
};
const Icons = styled.div<IconsProp>`
  width: 60px;
  height: 60px;

  background: #000;
  mask: url(${({ $icon }: IconsProp) => {
      return import.meta.env.BASE_URL + `assets/images/download/icons/${$icon}.png`;
    }})
    no-repeat center / contain;
  background-size: 100%;
`;

const DownloadTitleSection = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
`;

const DownloadIcon = styled(Icons)`
  height: 50px;
  width: 50px;
`;

const TitleText = styled(Text)`
  font-size: 45px;
  margin-left: 10px;
  font-weight: bold;
`;

const CustomModal = styled(Dialog)`
  .MuiBackdrop-root {
  }

  .MuiDialog-paper {
    min-width: 80vw;

    border-radius: 16px;
    background: #f6f8f7;
    min-height: 200px;
  }
`;

const DialogTitle = styled.div`
  background: #f6f8f7;
  min-height: 50px;
  display: flex;
  align-items: center;
  padding: 20px 30px;
  font-size: 40px;
  font-weight: bold;
  justify-content: space-between;
`;

const DialogContent = styled.div`
  padding: 40px;
  font-size: 40px;
`;

const DialogTitle2 = styled(DialogTitle)`
  background: ${({ theme }) => theme.primary};
  color: white;
`;

const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  right: 30px;
`;

const DeviceGuide = styled.div`
  padding-bottom: 20px;
`;

const DownloadSection = styled.div`
  display: flex;
  justify-content: center;
`;

// const QRCodeContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 20px;
//   align-items: center;
// `;

const DeviceText = styled.div`
  padding: 20px 0px;
  font-size: 30px;
`;

const QRCodeHolder = styled.div`
  height: 200px;
  width: 200px;
  padding: 10px;
  border-radius: 36px;
  border: solid 1px rgba(0, 0, 0, 0.5);
`;

const DownloadButton = styled.div`
  color: #fff;
  background: #000;
  border-radius: 75px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 30px;
  user-select: none;
  min-width: 100px;
  text-align: center;
`;

const TheGuide = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 75px;
`;

const PointlessShit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 10px;
`;

const HiddenDialogContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DeviceName = styled.div`
  font-weight: bold;
`;

const Links = styled.div`
  opacity: 0.75;
  font-size: 24px;
  cursor: pointer;
`;

const Download = () => {
  const [open, setOpen] = useState(false);
  const [download, setDownload] = useState<any[]>([]);

  const [pointlessDialog, setPointlessDialog] = useState(false);

  function getJsonData() {
    return fetch("https://app12.srvptt.com/version_" + config.brand + ".json")
      .then((response) => response.json())
      .then((responseJson) => {
        setDownload(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function copyStupidLink(link: string) {
    // alert("", i18n.t("pointless.copy"));
    utility.copy(link);
  }

  // useEffect(() => {
  //   if (download.length === 0) {
  //     getJsonData();
  //   } else {
  //   }
  // }, []);

  function logoSwitcher(brand: string) {
    switch (brand) {
      case "Atinbet":
        return "Atinbet";
      case "inyobet":
        return "inyo";
      default:
        return "PB";
    }
  }
  return (
    <Container>
      <ContentContainer>
        <QRCodeContainer>
          <HeaderButton
            color={"primary"}
            onClick={() => {}}
            style={{
              background: "linear-gradient(90deg, #FACE27 53.32%, #F3AF16 53.95%)",
              color: theme.black,
            }}
          >
            <>DOWNLOD</>
          </HeaderButton>
        </QRCodeContainer>
        <AppContainer>
          <AppFlag />
        </AppContainer>
      </ContentContainer>
    </Container>
  );
};

export default Download;
