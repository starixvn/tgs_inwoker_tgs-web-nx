import QRCode from "react-qr-code";
import styled from "styled-components";
import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import AffiliateInfoRow from "@/pages/affiliate/components/AffiliateInfoRow";
import RebateTable from "@/pages/affiliate/components/RebateTable";
import { Button } from "@/components/UI/Button";
import { useRebateTable } from "@/core/components/Affiliate/hooks/useRebateTable";
import { Select } from "@/components/UI/Select";
import { FormControl } from "@/components/styled-component/ProfileForms";
import { ImageActionEnum, useImageActions } from "@/core/hooks/tools/useImageActions";
import { useAccountStore } from "@/core/stores/useAccountStore";
import { media } from "@/theme/breakpoints";
import { QRCodeButton } from "@/pages/affiliate/components/QRCodeButton";

const AffiliateContainer = styled.div`
  color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 9px;

  ${media.lg} {
    flex-direction: row;
    gap: 19px;
    align-items: flex-start;
  }
`;

const FlexContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  ${media.sm} {
    width: auto;
  }
`;

const AffiliateTitle = styled.h2`
  padding: 0;
  margin-block: 0;
  margin-inline: 0;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.758rem;
  margin-bottom: 14px;
`;

const QRCodeContainer = styled.div`
  background-color: #fff;
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 18px;
`;
const ActionButtonContainer = styled.div`
  width: 288px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 34px;

  & > * {
    width: 110px;
    height: 27px;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.171rem;
    padding: 4px 36px;
    border-radius: 5px;
  }
`;

const AffiliateInfoRowContainer = styled.div`
  width: 100%;
  margin-bottom: 27px;

  & > div {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Affiliate = () => {
  const { account } = useAccountStore();
  const {
    rebateItemList,
    selectedRebateItem,
    handleChangeSelectItem,
    rebateTableRow,
    affiliateLink,
  } = useRebateTable();

  const { imageId, handleQrAction, isCopied, isDownloaded } = useImageActions();

  return (
    <AffiliateContainer>
      <FlexContainer>
        {/* QRCode */}
        <AffiliateTitle>{i18n.t("affiliate.qrCode")}</AffiliateTitle>

        <QRCodeContainer id={imageId}>
          <QRCode value={affiliateLink} />
        </QRCodeContainer>

        {/* QRCode action region */}
        <ActionButtonContainer>
          <QRCodeButton
            variant={isCopied ? "outlined" : "contained"}
            onClick={() => handleQrAction(ImageActionEnum.COPY)}
          >
            {isCopied ? i18n.t("affiliate.copied") : i18n.t("common.copy")}
          </QRCodeButton>
          <QRCodeButton
            variant={isDownloaded ? "outlined" : "contained"}
            onClick={() => handleQrAction(ImageActionEnum.DOWNLOAD)}
          >
            {isDownloaded ? i18n.t("common.download") : i18n.t("common.download")}
          </QRCodeButton>
        </ActionButtonContainer>

        {/* Referral ID/Link */}
        <AffiliateInfoRowContainer>
          <AffiliateInfoRow label={i18n.t("affiliate.promoId")} value={account.info.playercode} />
          <AffiliateInfoRow label={i18n.t("affiliate.promoLink")} value={affiliateLink} />
        </AffiliateInfoRowContainer>
      </FlexContainer>

      <FlexContainer>
        {/* Table */}
        <AffiliateTitle style={{ alignSelf: "flex-start" }}>
          {i18n.t("rebateRate.title")}
        </AffiliateTitle>

        <FormControl style={{ marginBottom: "20px" }}>
          <Select
            fullWidth
            // disableUnderline
            native
            value={selectedRebateItem.value}
            onChange={(e) => handleChangeSelectItem(e)}
            color={"primary"}
          >
            {rebateItemList.map((rebateItem, index) => {
              return (
                <option key={index} value={rebateItem.value}>
                  {i18n.t(`common.${rebateItem.label}`)}
                </option>
              );
            })}
          </Select>
        </FormControl>

        <RebateTable rebateTableRow={rebateTableRow} />
      </FlexContainer>
    </AffiliateContainer>
  );
};

export default Affiliate;
