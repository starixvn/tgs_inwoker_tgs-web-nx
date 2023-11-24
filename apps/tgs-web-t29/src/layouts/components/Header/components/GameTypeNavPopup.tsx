import styled from "styled-components";

export const PopupBg = styled.div`
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

export const PopupBody = styled.div`
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

export const PopupBox = styled.div`
  width: 88%;
  position: relative;
  border-radius: 20px;
  background-color: #fff;
  /* visibility: hidden; */
`;

export const PopupHeader = styled.div`
  width: 100%;
  position: relative;
  background: linear-gradient(306.53deg, #6695ef 21.28%, #34a3d5 53.1%, #73d5e0 82.66%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 20px 0;
  border-radius: 20px 20px 0px 0px;
  text-align: center;
`;

export const PopupTitle = styled.div`
  color: #fff;
  font-size: min(max(1.5vw, 28px), 44px);
`;

export const PopupClose = styled.div`
  position: absolute;
  top: 40%;
  left: 87%;
  width: 100%;
  height: 31%;
  background-image: url("../public/close.png");
  background-repeat: no-repeat;
  background-size: contain;
`;

export const PopupText = styled.div`
  color: #34a3d5;
  font-style: normal;
  font-weight: 700;
  font-size: min(max(1.5vw, 22px), 44px);
  word-break: break-word;
  padding: 80px 0;
  text-align: center;
`;

const GameTypeNavPopup = () => {
  return (
    <PopupBg>
      <PopupBody>
        <PopupBox>
          <PopupHeader>
            <PopupTitle>遊戲類型</PopupTitle>
          </PopupHeader>
          <PopupText>請選擇遊戲類型</PopupText>
        </PopupBox>
      </PopupBody>
    </PopupBg>
  );
}

export default GameTypeNavPopup;