import styled from "styled-components";
import { useProvider } from "@tgs-web-nx/core/features";

const VendorLogoWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0px;
  gap: 10px;
`;

const VendorLogoCard = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  & > img {
    width: calc((100% - 20px * 5) / 5);
    height: 100%;
    margin: 10px;
    object-fit: contain;
  }
`;

const VendorLogo = () => {
  const { providerList } = useProvider();

  const vendorCodeList = providerList.map((provider) => provider.code);
  const vendorLogoUrlList = vendorCodeList.map((gpCode) => {
    return ({
      gpCode: gpCode,
      logoUrl: `/assets/images/home/provider_logo_gray/${gpCode}.png`
    });
  });

  return (
    <VendorLogoWrapper>
      <VendorLogoCard>
        {vendorLogoUrlList.map((vendor) => {
          return <img key={vendor.gpCode} src={vendor.logoUrl} alt={vendor.gpCode} />;
        })}
      </VendorLogoCard>
    </VendorLogoWrapper>
  );
};

export default VendorLogo;
