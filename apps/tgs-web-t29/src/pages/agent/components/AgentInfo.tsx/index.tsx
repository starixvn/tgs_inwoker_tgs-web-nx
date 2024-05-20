import QRCode from "react-qr-code";
import { useImageActions, useRebateTable, useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";
import { Button } from "@mui/material";
import { theme } from "@/theme";
import { QRCodeContainer } from "@/components/styled-component/Affiliate";
import { media } from "@/theme/breakpoints";

const AgentInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentCard = styled.div`
  background: ${({ theme }) => theme.blue20};
  margin-bottom: 20px;
`;

const BasicDataCard = styled(ContentCard)`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  ${media.sm} {
    padding: 20px 50px;
  }
`;

const SharingContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 130px;
`;

const DataText = styled.div`
  line-height: 16.1px;
  color: ${({ theme }) => theme.gray50};
`;

const DataAmount = styled(DataText)`
  color: #23507d;
`;

const ProductChargeCard = styled(BasicDataCard)`
  flex-direction: column;
  justify-content: start;
  gap: 10px;
  & > div {
    font-size: 16px;
    font-weight: 400;
    line-height: 18.4px;
    color: #23507d;
    display: flex;
    align-items: center;
    gap: 10px;
    ${media.sm} {
      gap: 50px;
    }
  }
`;

const AgentPlayerAmountCard = styled(ProductChargeCard)`
  & > div {
    font-size: 16px;
    font-weight: 400;
    line-height: 18.4px;
    color: #23507d;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
    ${media.sm} {
      gap: 50px;
    }
    & > div {
      flex-shrink: 0;
    }
  }
`;

const AffiliateCard = styled(ProductChargeCard)`
  & > div {
    & > span {
      width: 200px;
    }
  }
`;

const QRcodeCard = styled(ProductChargeCard)`
  & > div {
    align-items: start;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AgentInfo = () => {
  const { imageId } = useImageActions();
  const { affiliateLink } = useRebateTable();
  const { isDesktopSize } = useRwd();

  return (
    <AgentInfoContainer>
      <BasicDataCard>
        <SharingContent>
          <DataText>{i18n.t("agent.P/T")}</DataText>
          <DataAmount>10%</DataAmount>
        </SharingContent>
        <SharingContent>
          <DataText>{i18n.t("agent.cumulativenegativeDividendAmount")}</DataText>
          <DataAmount>-100</DataAmount>
        </SharingContent>
        <SharingContent>
          <DataText>{i18n.t("agent.negativeDividend")}</DataText>
          <DataAmount>{i18n.t("agent.liable")}</DataAmount>
        </SharingContent>
        <SharingContent>
          <DataText>{i18n.t("agent.platformFee")}</DataText>
          <DataAmount>0%</DataAmount>
        </SharingContent>
      </BasicDataCard>

      <ProductChargeCard>
        <span>{i18n.t("agent.productCharges")}</span>
        <div>
          <div>{`${i18n.t("common.live")}:1%`}</div>
          <div>{`${i18n.t("common.sport")}:1%`}</div>
          <div>{`${i18n.t("common.table")}:1%`}</div>
        </div>
        <div>
          <div>{`${i18n.t("common.qipai")}:1%`}</div>
          <div>{`${i18n.t("common.lottery")}:1%`}</div>
          <div>{`${i18n.t("common.virtualsports")}:1%`}</div>
        </div>
      </ProductChargeCard>

      <AgentPlayerAmountCard>
        <div>
          <div>{`${i18n.t("agent.directAgent")}:1`}</div>
          <div>{`${i18n.t("agent.indirectAgent")}:1`}</div>
          <div>{`${i18n.t("agent.diectPlayer")}:1`}</div>
          <div>{`${i18n.t("agent.indirectPlayer")}:1`}</div>
        </div>
      </AgentPlayerAmountCard>

      <AffiliateCard>
        <span>{i18n.t("affiliate.promoId")}</span>
        <div>
          <span>dkhdio730902</span>
          <Button
            className={"button"}
            onClick={() => {}}
            variant={"outlined"}
            sx={{
              width: "70px",
              color: theme.white,
              background: theme.blue30,
              "&:hover": {
                color: theme.white,
                background: theme.blue30,
                border: `1px solid ${theme.blue30}`,
              },
            }}
          >
            {i18n.t("common.copy")}
          </Button>
        </div>
        <span>{i18n.t("affiliate.promoLink")}</span>
        <div>
          <span>https: tw.news.yahoo.com/</span>
          <Button
            className={"button"}
            onClick={() => {}}
            variant={"outlined"}
            sx={{
              width: "70px",
              color: theme.white,
              background: theme.blue30,
              "&:hover": {
                color: theme.white,
                background: theme.blue30,
                border: `1px solid ${theme.blue30}`,
              },
            }}
          >
            {i18n.t("common.copy")}
          </Button>
        </div>
      </AffiliateCard>

      <QRcodeCard>
        <span>{i18n.t("affiliate.qrCode")}</span>
        <div>
          <QRCodeContainer id={imageId}>
            <QRCode value={affiliateLink} size={isDesktopSize ? 256 : 128} />
          </QRCodeContainer>
          <ButtonContainer>
            <Button
              className={"button"}
              onClick={() => {}}
              variant={"outlined"}
              sx={{
                width: "70px",
                color: theme.white,
                background: theme.blue30,
                "&:hover": {
                  color: theme.white,
                  background: theme.blue30,
                  border: `1px solid ${theme.blue30}`,
                },
              }}
            >
              {i18n.t("common.copy")}
            </Button>
            <Button
              className={"button"}
              onClick={() => {}}
              variant={"outlined"}
              sx={{
                width: "70px",
                color: theme.white,
                background: theme.blue30,
                "&:hover": {
                  color: theme.white,
                  background: theme.blue30,
                  border: `1px solid ${theme.blue30}`,
                },
              }}
            >
              {i18n.t("common.download")}
            </Button>
          </ButtonContainer>
        </div>
      </QRcodeCard>
    </AgentInfoContainer>
  );
};

export default AgentInfo;
