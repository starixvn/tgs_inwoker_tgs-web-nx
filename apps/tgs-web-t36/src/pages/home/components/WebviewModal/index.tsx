import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { i18n } from "@tgs-web-nx/utils";
import { CloseButton } from "@/components/styled-component/ProfileForms";

type Props = {
    url: string;
    isOpen: boolean;
    onClose: () => void;
}

const WebviewModal = ({
    url,
    isOpen,
    onClose,
}: Props) => {
    return (
        <Modal 
            open={isOpen}
            onClose={onClose} 
            style={{zIndex: "9999999999"}} // 需大於 livechat 的 zIndex
        >
            <IFrameWrapper>
                <ButtonWrapper>
                    <CloseButton onClick={onClose}>{i18n.t("common.close")}</CloseButton>
                </ButtonWrapper>
                <IFrame src={url}></IFrame>
            </IFrameWrapper>
        </Modal>
    )
}

export default WebviewModal;

const ButtonWrapper = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`;


const IFrame = styled.iframe`
  width: 100%;
  flex: 1;
  border: none;
`;

const IFrameWrapper = styled.div`
    display: flex;
    position: relative;
    width: 100vw;
    height: 100vh;
`;