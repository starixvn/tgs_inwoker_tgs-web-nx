import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import mobile from "@/assets/t32/images/home/mobile.png";
import AppFlag from "@/pages/home/components/AppFlag";
import QRcodeUrl from "@/assets/t32/images/home/QRcode.svg";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 30px;
  width: 100%;
`;

const Description = styled.div`
  max-width: ${SUB_CONTENT_MAX_WIDTH};
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 24px;
  gap: 6px;
`;

const AppWrapper = styled.div`
  /* width: 333px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 18px;
  font-weight: 700;
  line-height: 30px;
`;

const Content = styled.div`
  color: #0A0A0A;
  font-size: 18px;
  font-weight: 400;
`;

const LeftText = styled.div`
  width: 77%;
`;

const MobileImg = styled.div`
  width: 23%;
  max-width: 455px;
  img {
    width: 100%;
  }
`;

const DownloadText = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  font-weight: 700;
`;

const AppLink = styled.div`
 display: flex;
 gap: 60px;
`;

const PlayBtn = styled.div`
  min-width: 143px;
  padding: 10px 12px;
  color: ${({ theme }) => theme.white};
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  background: ${({ theme }) => theme.btnPri};
  z-index: 2;

  &:hover {
    box-shadow: 0 -5px 15px 0 #34c75cc9;
    padding: 10px 12px;
    }
`;

const Application = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <LeftText>
        <Description>
          <Title>Application</Title>
          <Content>Download the App for your phone now to experience the game better and safer, the application supports all products: Sports, E-Sports, Casino, Games and Lottery.</Content>
        </Description>
        <AppLink>
          <AppWrapper><img src={QRcodeUrl} width={129} alt="QRcode" /><PlayBtn onClick={() => history.push("/appDownload")}>DOWNLOAD</PlayBtn></AppWrapper>
          <AppWrapper><DownloadText>Download App</DownloadText><AppFlag /></AppWrapper>
        </AppLink>
      </LeftText>
      <MobileImg><img src={mobile} alt={"Application"} /></MobileImg>
    </Wrapper>
  );
};

export default Application;
