import { GreenGradientButton } from "@/components/UI/Button";
import DialogPopup from "@/components/UI/Dialog/DialogPopup";
import { DialogContainer, DialogContent, DialogTitle } from "@/components/UI/Dialog/dialogStyles";

import { i18n } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom"; // Import useHistory
import styled from "styled-components";


const FormContainer = styled.div`
  padding: 0 3px;
  font-weight: 400;
  text-align: justify;
  overflow: auto;
  max-height: 50vh;
`;

const ContentContainer = styled.div`
  margin: 20px 20px 10px 20px;
  padding: 0 3px;
  overflow: auto;
  height: 800px;
`;

type ImageBannerProps = {
  img: string;
  order: any;
};
const ImageBanner = styled.div<ImageBannerProps>`
  background: url(${({ img }: any) => img}) no-repeat center;
  height: 200px;
  width: 560px;
  border-radius: 5px;
  background-size: 100%;
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0/0.1),
    0 2px 4px -2px rgb(0 0 0/0.1);
`;

type Props = {
  open: boolean;
  onClose: () => void;
  header?: string;
  type?: string;
  content?: any[];
  text?: string;
};

const DepositPopupAnnouncement = ({ open, onClose, header, type, content, text }: Props) => {
  const history = useHistory(); // Initialize history hook

  const handlePromotionClick = (id: string) => {
    history.push(`/promotion/${id}`);
    onClose();
  };

  return (
    <DialogPopup open={open} onClose={onClose} >
      <DialogContainer>
      <DialogTitle>{header}</DialogTitle>
      <DialogContent>
      {type === "promo" && content ? (
        <ContentContainer>
          {content
            .sort((a, b) => {
              return a.order - b.order;
            })
            .map((data, index) => {
              const checkLocale = data.localization[i18n.language];
              return (
                <ImageBanner
                  img={checkLocale ? checkLocale.mobileBanner : data.mobileBanner}
                  key={index}
                  order={data.order}
                  onClick={() => {
                    handlePromotionClick(data.id);
                  }}
                />
              );
            })}
        </ContentContainer>
      ) : (
        <FormContainer
          dangerouslySetInnerHTML={{
            __html: text?.replace(/\n/g, "<br />") || "",
          }}
        />
      )}
      </DialogContent>
      <GreenGradientButton fullWidth onClick={onClose}>
        <>{i18n.t("common.confirm")}</>
      </GreenGradientButton>
      </DialogContainer>
    </DialogPopup>
  );
};

export default DepositPopupAnnouncement;
