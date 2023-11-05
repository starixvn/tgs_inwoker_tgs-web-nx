import React, { useState } from "react";
import config from "@/config/config";
import { BrandsSupport } from "@/core/types/stores/general";
import styled from "styled-components";
import SupportCard from "@/components/pages/contactUs/components/SupportCard";
import QrCodeDialog from "@/components/pages/contactUs/components/QRCodeHolder";
import IMHandler from "@/core/components/Support/IMHandler";
import { useGeneralStore } from "@/core/stores/useGeneralStore";
import { useContactCS } from "@/core/hooks/tools/useContactCS";
import HeaderImage from "@/components/pages/contactUs/components/HeaderImage";

const SupportContainer = styled.div``;

const CardsContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

type Props = {};
const Support = ({}: Props) => {
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
