import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import AppFlag from "@/pages/home/components/AppFlag";
import { Button } from "@/components/UI/Button";
import { theme } from "@/theme";
import android from "@/assets/t23/images/home/android.svg";
import ios from "@/assets/t23/images/home/ios.svg";
import { media } from "@/theme/breakpoints";

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
  align-items:center;
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
  color: ${({ theme }) => theme.white};
  font-family: Gill Sans MT;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 16px;
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
              background: theme.primaryMix,
              color: theme.black,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              width: "145px",
              height: "37px",
              fontFamily: "Gill Sans MT",
              fontSize: "20px",
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
