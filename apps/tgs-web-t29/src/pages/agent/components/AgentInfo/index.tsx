import { useCallback, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { ImageActionEnum, useImageActions, useRwd } from "@tgs-web-nx/core/hooks";
import { Common, i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";
import { Button, styled as muiStyled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { AgentInfo as AgentInfoService } from "@tgs-web-nx/core";
import { NoData as RequestFailHint } from "../NoData";
import { QRCodeContainer } from "@/components/styled-component/Affiliate";
import { media } from "@/theme/breakpoints";
import LoadingBlock from "@/components/project/LoadingBlock";

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
  flex: 1 1 140px;
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
  const { imageId, handleQrAction, isCopied } = useImageActions();
  const { isDesktopSize } = useRwd();

  const [idIsCopied, setIdIsCopied] = useState(false);
  const [linkIsCopied, setLinkIsCopied] = useState(false);

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["agentInfo"],
    queryFn: AgentInfoService.getAgentInfo,
    enabled: false,
  });

  const negativeAgentDividend = Common.formatCurrency(data?.data.negativeAgentDividend ?? 0);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleCopyIdText = useCallback(() => {
    if (idIsCopied) return;

    navigator.clipboard.writeText(data?.data.invitationCode as string);
    setIdIsCopied(true);

    setTimeout(() => {
      setIdIsCopied(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data.invitationCode]);

  const handleCopyLinkText = useCallback(() => {
    if (linkIsCopied) return;
    navigator.clipboard.writeText(`https://${window.location.host}/a/${data?.data.invitationCode}`);
    setLinkIsCopied(true);

    setTimeout(() => {
      setLinkIsCopied(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data.invitationCode]);

  return isFetching ? (
    <LoadingBlock size={30} />
  ) : data?.IsSuccess ? (
    <AgentInfoContainer>
      {isDesktopSize ? (
        <BasicDataCard>
          <SharingContent>
            <DataText>{i18n.t("agent.profitShareP/T")}</DataText>
            <ValueText>{`${data?.data.dividendPercentage}%`}</ValueText>
          </SharingContent>

          <SharingContent>
            <DataText>{i18n.t("agent.cumulativenegativeDividendAmount")}</DataText>
            <ValueText>{negativeAgentDividend}</ValueText>
          </SharingContent>

          <SharingContent>
            <DataText>{i18n.t("agent.negativeDividend")}</DataText>
            <ValueText>
              {i18n.t(
                data?.data.negativeAgentDividendCarryForward ? "agent.liable" : "agent.notLiable",
              )}
            </ValueText>
          </SharingContent>
        </BasicDataCard>
      ) : (
        <>
          <BasicDataCard>
            <SharingContent>
              <DataText>{i18n.t("agent.profitShareP/T")}</DataText>
              <ValueText>{`${data?.data.dividendPercentage}%`}</ValueText>
            </SharingContent>
          </BasicDataCard>
          <BasicDataCard>
            <SharingContent>
              <DataText>{i18n.t("agent.negativeDividend")}</DataText>
              <ValueText>
                {i18n.t(
                  data?.data.negativeAgentDividendCarryForward ? "agent.liable" : "agent.notLiable",
                )}
              </ValueText>
            </SharingContent>

            <SharingContent>
              <DataText>{i18n.t("agent.cumulativenegativeDividendAmount")}</DataText>
              <ValueText>{negativeAgentDividend}</ValueText>
            </SharingContent>
          </BasicDataCard>
        </>
      )}

      <ProductChargeCard>
        <span>{i18n.t("agent.productCharges")}</span>
        <GameTypeContainer>
          <GameType>{`${i18n.t("common.live")}: ${data?.data.liveDealerPercentage}%`}</GameType>
          <GameType>{`${i18n.t("common.sport")}: ${data?.data.sportsPercentage}%`}</GameType>
          <GameType>{`${i18n.t("common.table")}: ${data?.data.slotPercentage}%`}</GameType>
          <GameType>{`${i18n.t("common.qipai")}: ${data?.data.cardGamePercentage}%`}</GameType>
          <GameType>{`${i18n.t("common.lottery")}: ${data?.data.lotteryPercentage}%`}</GameType>
          <GameType>{`${i18n.t("common.virtualsports")}:${data?.data
            .virtualSportsPercentage}%`}</GameType>
        </GameTypeContainer>
      </ProductChargeCard>

      <AgentPlayerAmountCard>
        <div>
          <div>{`${i18n.t("agent.directAgent")}:${data?.data.directAgentCount}`}</div>
          <div>{`${i18n.t("agent.indirectAgent")}:${data?.data.indirectAgentCount}`}</div>
          <div>{`${i18n.t("agent.diectPlayer")}:${data?.data.directPlayerCount}`}</div>
          <div>{`${i18n.t("agent.indirectPlayer")}:${data?.data.indirectPlayerCount}`}</div>
        </div>
      </AgentPlayerAmountCard>

      <AffiliateCard>
        <div>
          <span>{i18n.t("agent.referralCode")}</span>
          <div>
            <ValueText>{data?.data.invitationCode}</ValueText>
            <StyledButton onClick={handleCopyIdText}>
              {idIsCopied ? i18n.t("affiliate.copied") : i18n.t("common.copy")}
            </StyledButton>
          </div>
        </div>

        <div>
          <span>{i18n.t("affiliate.promoLink")}</span>
          <div>
            <ValueText>{`https://${window.location.host}/a/${data?.data.invitationCode}`}</ValueText>
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
            <QRCode
              value={`https://${window.location.host}/a/${data?.data.invitationCode}`}
              size={isDesktopSize ? 256 : 128}
            />
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
  ) : (
    <RequestFailHint />
  );
};

export default AgentInfo;
