import styled from 'styled-components';
import downloadBgRight from "@/assets/t22/images/home/downloadBgRight.png";
import downloadBgLeft from "@/assets/t22/images/home/downloadBgLeft.png";
import qrCode from "@/assets/t22/images/home/qrcode.png";
import iconIos from "@/assets/t22/images/home/ios.svg";
import iconAndroid from "@/assets/t22/images/home/andriod.svg";
import {theme} from '@/theme';
import BrandLogo from '@/components/project/BrandLogo';



const Root = styled.div`
  margin-top: 55px;
  padding: 40px 0 20px;
  position: relative;
  width: 100%;
`;

type Position = "left" | "right";
const Background = styled.div<{
  $bgUrl: string;
  $position: Position;
}>`
  position: absolute;
  top: 0;
  ${({$position}) => $position}: 0;
  background: url(${({$bgUrl}) => $bgUrl}) no-repeat ${({$position}) => $position};
  background-size: contain;
  width: 50%;
  height: 100%;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  position: relative;
  display: flex;
  gap: 40px;
  width: 415px;
`;

const Card = styled.div`
  width: 100%;
  padding: 20px;
  border: 2px solid ${theme.defaultTab};
  border-radius: 8px;
`;

const Logo = styled(BrandLogo)`
  margin-top: 30px;
  max-width: 320px;
`;

const Box = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const QrCode = styled.img`
  width: 100%;
`;

const Icon = styled.img`
  width: 24px;
`;

const Text = styled.span`
  color: transparent;
  background: ${theme.primaryGradient};
  background-clip: text;
  font-size: 1.6rem;
`;

const links = [
  {
    icon: iconIos,
    text: 'IOS'
  },
  {
    icon: iconAndroid,
    text: 'Android'
  },
];

const Download = () => {
  return (
    <Root >

      {/* bg */}
      <Background $bgUrl={downloadBgLeft} $position="left" />
      <Background $bgUrl={downloadBgRight} $position="right" />

      {/* QR code */}
      <Wrapper>
        {
          links.map((link) => {
              return(
                <Card key={link.text}>
                  <QrCode src={qrCode} alt={`qrcode_${link.text}`} />
                  <Box>
                    <Icon src={link.icon} alt={`icon_${link.icon}`}/>
                    <Text>{link.text}</Text>
                  </Box>
                </Card>
            );
          })
        }
      </Wrapper>

      {/* Logo*/}
      <Logo />

    </Root>
  );
};

export default Download;
