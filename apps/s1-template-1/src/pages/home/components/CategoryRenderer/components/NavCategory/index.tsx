import { useHistory } from "react-router";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { Common } from "@tgs-web-nx/utils";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import { FilterTagTypeEnum, useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import DesktopVendorCard from "@/pages/home/components/VendorCard/desktop";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
  }
`;

const DesktopCategoryContentWrapper = styled.div`
  width: 100%;
  flex: 1;
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;

const NoDataText = styled.div`
  color: #333;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
`;

const NavCategory = () => {
  const { activeNavPopupGameType, activeNavPopupGameTypeKey, handleChangeGameType, handleChangeActiveProviderFilterTag } = useHomeGameContext();
  const history = useHistory();
  const { navPopupCategoryList } = useGetLobbyCategoryList();

  const enterVendorFilter = (gpcode: string) => {
    handleChangeGameType(activeNavPopupGameType);
    const filterTag = {
      tagType: FilterTagTypeEnum.PROVIDER,
      name: "",
      gpCode: gpcode,
    };
    handleChangeActiveProviderFilterTag(filterTag);

    history.push(`/main/${activeNavPopupGameTypeKey}`);
  };

  const hasMappingData = !!navPopupCategoryList.length;

  // activeNavPopupGameType just for nav popup displays vendor list

  return (
    <Wrapper>
      <DesktopCategoryContentWrapper>
        {hasMappingData &&
          navPopupCategoryList.map((provider) => {
            const { code: gpCode, status, name } = provider;

            if (gpCode === "BC") return null;
            return (
              <DesktopVendorCard
                key={gpCode}
                bgUrl={`${window.envConfig.assetsPath
                  }assets/images/home/desktop/${activeNavPopupGameTypeKey}/bg.png`}
                imageUrl={`${window.envConfig.assetsPath
                  }assets/images/home/desktop/${activeNavPopupGameTypeKey}/${gpCode}.png`}
                venderLogoUrl={`${window.envConfig.assetsPath
                  }assets/images/home/provider_logo/${activeNavPopupGameTypeKey}/${gpCode}.png`}
                launchGame={() => enterVendorFilter(gpCode)}
                status={status}
                venderName={name}
              />
            );
          })}
        {!hasMappingData && <NoDataText>No data</NoDataText>}
      </DesktopCategoryContentWrapper>
    </Wrapper>
  );
};

export default NavCategory;
