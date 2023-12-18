// import config from "@tgs-web-nx/config";
// import { GameItem } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";
import { LinearProgress, Button as MuiButton, styled as muiStyled } from "@mui/material";
import { useHistory } from "react-router-dom";
import { theme } from "@/theme";

const MainWrapper = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 65px;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
`;
const Time = styled.div`
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
`;

const DepositButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 14px;
`;

const DepositButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.secBTNOutline,
  border: `1px solid ${theme.palette.secBTNOutline}`,
  height: "34px",
  padding: "10px 12px",
  borderRadius: "4px",
  justifyContent: "end",
}));

const DepositProgress = () => {
  const history = useHistory();

  return (
    <MainWrapper>
      <ProgressContainer>
        <TitleWrapper>
          <Title> {i18n.t("common.deposit")}</Title>
          <Time>2 minutes 1 second</Time>
        </TitleWrapper>
        <LinearProgress
          variant="determinate"
          value={25}
          sx={{
            backgroundColor: "#026931",
            "& .MuiLinearProgress-bar": {
              background:
                " linear-gradient(90deg, #D22B2B 0%, #FFA500 33.33%, #E1F91A 66.67%, #00F562 100%);",
            },
          }}
        />
      </ProgressContainer>
      <ProgressContainer>
        <TitleWrapper>
          <Title> Withdraw money</Title>
          <Time>2 minutes 1 second</Time>
        </TitleWrapper>
        <LinearProgress
          variant="determinate"
          value={50}
          sx={{
            backgroundColor: "#026931",
            "& .MuiLinearProgress-bar": {
              background:
                " linear-gradient(90deg, #D22B2B 0%, #FFA500 33.33%, #E1F91A 66.67%, #00F562 100%);",
            },
          }}
        />
      </ProgressContainer>
      <DepositButtonContainer>
        <DepositButton
          onClick={() => {
            history.push("/deposit");
          }}
        >
          Deposit Now
        </DepositButton>
      </DepositButtonContainer>
    </MainWrapper>
  );
};

export default DepositProgress;
