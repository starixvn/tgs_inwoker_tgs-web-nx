import React, { useState } from "react";
import styled from "styled-components";
import { BrandsSupport } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useContactCS } from "@tgs-web-nx/core/hooks";
import SupportCard from "@/pages/contactUs/components/SupportCard";
import QrCodeDialog from "@/pages/contactUs/components/QRCodeHolder";
import IMHandler from "@/core/components/Support/IMHandler";
import HeaderImage from "@/pages/contactUs/components/HeaderImage";

const SupportContainer = styled.div``;

const CardsContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const Support = () => {
  const { general } = useGeneralStore();
  const { handleContactCs } = useContactCS();
  const brandsSupportList = general.brandsSupport;
  const [selectedBrandsSupport, setSelectedBrandsSupport] = useState<BrandsSupport | null>(null);

  const handleClick = (brandsSupport: BrandsSupport) => {
    if (brandsSupport.type === "Live") {
      handleContactCs();
      return;
    }

    if (brandsSupport.qrcodeurl) {
      setSelectedBrandsSupport(brandsSupport);
    } else {
      IMHandler(brandsSupport.type, brandsSupport.phone); // TODO: IMHandler
    }
  };

  const handleClose = () => {
    setSelectedBrandsSupport(null);
  };

  const csLiveChatUrl = general?.livechat?.setting?.url || "www.google.com";

  return (
    <SupportContainer>
      <CardsContainer>
        <HeaderImage />

        {(config.features.LiveChatVendor || csLiveChatUrl) && (
          <SupportCard
            brandsSupport={{
              appid: null,
              phone: null,
              qrcodeurl: null,
              type: "Live",
            }}
            handleClick={handleClick}
          />
        )}

        {brandsSupportList.map((brandsSupport, index) => {
          return (
            <SupportCard key={index} handleClick={handleClick} brandsSupport={brandsSupport} />
          );
        })}
      </CardsContainer>

      <QrCodeDialog selectedBrandsSupport={selectedBrandsSupport} handleClose={handleClose} />
    </SupportContainer>
  );
};

export default Support;
