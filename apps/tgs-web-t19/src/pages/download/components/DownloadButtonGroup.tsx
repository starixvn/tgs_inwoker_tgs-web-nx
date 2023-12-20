import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import AppFlag from "@/pages/home/components/AppFlag";
import { Button } from "@/components/UI/Button";
import { theme } from "@/theme";
import android from "@/assets/t29/images/home/android.svg";
import ios from "@/assets/t29/images/home/ios.svg";
import { media } from "@/theme/breakpoints";
import BrandLogo from "@/components/project/BrandLogo";

const Container = styled.div`
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.mainBackground};
  border-radius: 10px;
`;

const ContentContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  ${media.sm} {
    padding: 40px 10px;
  }
`;

const QRCodeContainer = styled.div`
  max-width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.white};
  font-family: Arial;
  font-size: 16px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  padding-bottom: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 19px;
`;

const Download = () => {
  const { isDesktopSize } = useRwd();
  return (
    <Container>
      <ContentContainer>
        <QRCodeContainer>
          <BrandLogo />
        </QRCodeContainer>
        <AppContainer>
          <Text>Download App</Text>
          {isDesktopSize ? (
            <AppFlag />
          ) : (
            <Wrapper>
              <img src={android} alt="android" />
              <img src={ios} alt="ios" />
            </Wrapper>
          )}
        </AppContainer>
      </ContentContainer>
    </Container>
  );
};

export default Download;
