import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { i18n } from "@tgs-web-nx/utils";
import { CloseButton } from "@/components/styled-component/ProfileForms";
import { theme } from '@/theme';

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
    const [fullScreen, setFullScreen] = useState(false);
    const history = useHistory();

    const handleOnClickDeposit = () => {
        onClose();
        history.push('/deposit');
    }

    const handleOnClickFullScreenIcon = () => {
        onClose();
        setFullScreen(false);
    }

    const renderButtons = () => {
        if(fullScreen) {
            return (
                <FullScreenIconWrapper onClick={handleOnClickFullScreenIcon}>
                    <ArrowBackIosIcon />
                </FullScreenIconWrapper>
            )
        }

        return (
                <ButtonWrapper>
                    <IconWrapper onClick={onClose}>
                        <ArrowBackIosIcon />
                    </IconWrapper>
                    <CloseButton onClick={handleOnClickDeposit}>{i18n.t("common.deposit")}</CloseButton>
                    <CloseButton onClick={() => setFullScreen(true)}>{i18n.t("slot.fullscreen")}</CloseButton>
                </ButtonWrapper>
        )
    }

    return (
        <Modal 
            open={isOpen}
            onClose={onClose} 
            style={{zIndex: "9999999999"}} // 需大於 livechat 的 zIndex
        >
            <IFrameWrapper>
                {renderButtons()}
                <IFrame src={url}></IFrame>
            </IFrameWrapper>
        </Modal>
    )
}

export default WebviewModal;

const ButtonWrapper = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 1fr repeat(2, min-content);
    gap: 10px;
    width: 100%;
    padding: 10px 20px;
    background: ${theme.primaryGradient};
`;

const IconWrapper = styled.div`
    color: #fff;
`;

const FullScreenIconWrapper = styled(IconWrapper)`
    padding: 5px 5px 5px 15px;
    border-radius: 5px;
    background: ${theme.primaryGradient};
    position: absolute;
    top: 20px;
    left: 20px;;
`;


const IFrame = styled.iframe`
  width: 100%;
  flex: 1;
  border: none;
`;

const IFrameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
`;