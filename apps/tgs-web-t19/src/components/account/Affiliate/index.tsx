import QRCode from "react-qr-code";
import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useAccountStore } from "@tgs-web-nx/core";
import { ImageActionEnum, useImageActions, useRebateTable } from "@tgs-web-nx/core/hooks";
import AffiliateInfoRow from "@/pages/affiliate/components/AffiliateInfoRow";
import RebateTable from "@/pages/affiliate/components/RebateTable";
import { Select } from "@/components/UI/Select";
import { FormControl } from "@/components/styled-component/ProfileForms";
import { QRCodeButton } from "@/pages/affiliate/components/QRCodeButton";
import {
  ActionButtonContainer,
  AffiliateContainer,
  AffiliateInfoRowContainer,
  AffiliateTitle,
  FlexContainer,
  QRCodeContainer,
} from "@/components/styled-component/Affiliate";
import { theme } from "@/theme";

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

        <FormControl style={{ marginBottom: "20px" }} sx={{ borderRadius: "6px" }}>
          <Select
            fullWidth
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
