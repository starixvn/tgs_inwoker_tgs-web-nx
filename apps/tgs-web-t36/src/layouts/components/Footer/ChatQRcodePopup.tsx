import styled from "styled-components";
import closeIcon from "@/assets/t36/images/qrcode/icon-close.svg";
import { media } from "@/theme/breakpoints";

const PopupBg = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;

const PopupBody = styled.div`
  width: 100%;
  max-width: 1080px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupBox = styled.div`
  width: 80%;
  position: relative;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.white};
`;

const PopupHeader = styled.div`
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 30px;
  position: relative;
  background: ${({ theme }) => theme.gray60};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 0px 30px;
  border-radius: 16px 16px 0px 0px;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: min(max(1.5vw, 24px), 40px);
`;

const CloseIcon = styled.div`
  position: absolute;
  right: 3%;
  width: 20px;
  height: 20px;
  background-image: url(${closeIcon});
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
`;

const PopupContent = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 30px;
`;

const QrcodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const QrcodeImage = styled.img`
  width: 100%;
  max-width: 110px;
  height: 110px;

  
  ${media.md} {
    max-width: 150px;
    height: 150px;
  }
`;

const QrcodeTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.gray60};
`;

type Props = {
  setIsOpenChatQRcode: (isOpen: boolean) => void;
  chatQRcodeList: {
    name: string;
    url: string;
  }[];
};

const ChatQRcodePopup = ({ setIsOpenChatQRcode, chatQRcodeList }: Props) => {
  return (
    <PopupBg>
      <PopupBody>
        <PopupBox>
          <PopupHeader>
            <Title>Contact Us !</Title>
            <CloseIcon onClick={() => setIsOpenChatQRcode(false)}></CloseIcon>
          </PopupHeader>
          <PopupContent>
            {chatQRcodeList.map((item, index) => {
              return (
                <QrcodeContainer key={index}>
                  <QrcodeImage src={item.url} />
                  <QrcodeTitle>{item.name}</QrcodeTitle>
                </QrcodeContainer>
              )
            })}
          </PopupContent>
        </PopupBox>
      </PopupBody>
    </PopupBg>
  );
};

export default ChatQRcodePopup;
