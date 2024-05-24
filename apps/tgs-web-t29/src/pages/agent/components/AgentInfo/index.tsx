import { useCallback, useState } from "react";
import QRCode from "react-qr-code";
import { ImageActionEnum, useImageActions, useRebateTable, useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";
import { Button, styled as muiStyled } from "@mui/material";
import { useAccountStore } from "@tgs-web-nx/core";
import { QRCodeContainer } from "@/components/styled-component/Affiliate";
import { media } from "@/theme/breakpoints";

const AgentInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentCard = styled.div`
  background: ${({ theme }) => theme.blue20};
  margin-bottom: 20px;
  gap: 20px;
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

const ValueText = styled(DataText)`
  color: #23507d;
  text-overflow: ellipsis;
`;

const ProductChargeCard = styled(BasicDataCard)`
  flex-direction: column;
`;

const GameTypeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const GameType = styled.div`
  flex: 0 1 140px;
  min-width: 120px;
  color: #23507d;
  font-size: 17px;
  font-weight: 400;
  line-height: 19.55px;
  ${media.sm} {
    flex: 0 1 200px;
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
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 400px;

    & > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

const QRcodeCard = styled(ProductChargeCard)`
  & > div {
    display: flex;
    align-items: start;
    gap: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledButton = muiStyled(Button)(({ theme }) => ({
  width: "100px",
  color: theme.palette.white,
  background: theme.palette.blue30,
  "&:hover": {
    background: theme.palette.blue30, // 保持背景色不变
    boxShadow: "none", // 去除阴影效果
  },
}));

const AgentInfo = () => {
  const { account } = useAccountStore();
  const { imageId, handleQrAction, isCopied } = useImageActions();
  const { affiliateLink } = useRebateTable();
  const { isDesktopSize } = useRwd();

  const [idIsCopied, setIdIsCopied] = useState(false);
  const [linkIsCopied, setLinkIsCopied] = useState(false);

  const handleCopyIdText = useCallback(() => {
    if (idIsCopied) return;

    navigator.clipboard.writeText(account.info.playercode);
    setIdIsCopied(true);

    setTimeout(() => {
      setIdIsCopied(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account.info.playercode]);

  const handleCopyLinkText = useCallback(() => {
    if (linkIsCopied) return;

    navigator.clipboard.writeText(affiliateLink);
    setLinkIsCopied(true);

    setTimeout(() => {
      setLinkIsCopied(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [affiliateLink]);

  return (
    <AgentInfoContainer>
      {isDesktopSize ? (
        <BasicDataCard>
          <SharingContent>
            <DataText>分红比例</DataText>
            <ValueText>10%</ValueText>
          </SharingContent>

          <SharingContent>
            <DataText>{i18n.t("agent.cumulativenegativeDividendAmount")}</DataText>
            <ValueText>-100</ValueText>
          </SharingContent>

          <SharingContent>
            <DataText>{i18n.t("agent.negativeDividend")}</DataText>
            <ValueText>{i18n.t("agent.liable")}</ValueText>
          </SharingContent>

          <SharingContent>
            <DataText>{i18n.t("agent.platformFee")}</DataText>
            <ValueText>0%</ValueText>
          </SharingContent>
        </BasicDataCard>
      ) : (
        <>
          <BasicDataCard>
            <SharingContent>
              <DataText>分红比例</DataText>
              <ValueText>10%</ValueText>
            </SharingContent>

            <SharingContent>
              <DataText>{i18n.t("agent.platformFee")}</DataText>
              <ValueText>0%</ValueText>
            </SharingContent>
          </BasicDataCard>
          <BasicDataCard>
            <SharingContent>
              <DataText>{i18n.t("agent.negativeDividend")}</DataText>
              <ValueText>{i18n.t("agent.liable")}</ValueText>
            </SharingContent>

            <SharingContent>
              <DataText>{i18n.t("agent.cumulativenegativeDividendAmount")}</DataText>
              <ValueText>-100</ValueText>
            </SharingContent>
          </BasicDataCard>
        </>
      )}

      <ProductChargeCard>
        <span>{i18n.t("agent.productCharges")}</span>
        <GameTypeContainer>
          <GameType>{`${i18n.t("common.live")}:1%`}</GameType>
          <GameType>{`${i18n.t("common.sport")}:1%`}</GameType>
          <GameType>{`${i18n.t("common.table")}:1%`}</GameType>
          <GameType>{`${i18n.t("common.qipai")}:1%`}</GameType>
          <GameType>{`${i18n.t("common.lottery")}:1%`}</GameType>
          <GameType>{`${i18n.t("common.virtualsports")}:1%`}</GameType>
        </GameTypeContainer>
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
        <div>
          <span>{i18n.t("affiliate.promoId")}</span>
          <div>
            <ValueText>{account.info.playercode}</ValueText>
            <StyledButton onClick={handleCopyIdText}>
              {idIsCopied ? i18n.t("affiliate.copied") : i18n.t("common.copy")}
            </StyledButton>
          </div>
        </div>

        <div>
          <span>{i18n.t("affiliate.promoLink")}</span>
          <div>
            <ValueText>{affiliateLink}</ValueText>
            <StyledButton onClick={handleCopyLinkText}>
              {linkIsCopied ? i18n.t("affiliate.copied") : i18n.t("common.copy")}
            </StyledButton>
          </div>
        </div>
      </AffiliateCard>

      <QRcodeCard>
        <span>{i18n.t("affiliate.qrCode")}</span>
        <div>
          <QRCodeContainer id={imageId}>
            <QRCode value={affiliateLink} size={isDesktopSize ? 256 : 128} />
          </QRCodeContainer>
          <ButtonContainer>
            <StyledButton onClick={() => handleQrAction(ImageActionEnum.COPY)}>
              {isCopied ? i18n.t("affiliate.copied") : i18n.t("common.copy")}
            </StyledButton>
            <StyledButton onClick={() => handleQrAction(ImageActionEnum.DOWNLOAD)}>
              {i18n.t("common.download")}
            </StyledButton>
          </ButtonContainer>
        </div>
      </QRcodeCard>
    </AgentInfoContainer>
  );
};

export default AgentInfo;
