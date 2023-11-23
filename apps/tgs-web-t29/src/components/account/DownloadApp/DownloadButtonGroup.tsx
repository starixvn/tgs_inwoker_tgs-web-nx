import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import AppFlag from "@/pages/home/components/AppFlag";
import { Button } from "@/components/UI/Button";
import { theme } from "@/theme";
import android from "@/assets/t29/images/home/android.svg";
import ios from "@/assets/t29/images/home/ios.svg";
import { media } from "@/theme/breakpoints";

const Container = styled.div`
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.blue20};
`;

const ContentContainer = styled.div`
  ${media.sm} {
    padding: 40px;
  }
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const QRCodeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const QRCode = styled.div`
  width: 129px;
  height: 129px;
  border: 1px solid;
  margin-bottom: 10px;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.blue70};
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
          <QRCode></QRCode>
          <Button
            color={"primary"}
            onClick={() => {}}
            style={{
              width: "145px",
              height: "37px",
              background: theme.primary,
              color: theme.white,
              padding: "12px, 20px, 12px, 20px",
              borderRadius: "6px",
              
            }}
          >
            <>Download</>
          </Button>
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
