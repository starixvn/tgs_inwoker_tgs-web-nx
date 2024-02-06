import { useHistory } from "react-router";
import styled from "styled-components";
import { FilterTagTypeEnum, useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";

const Wrapper = styled.div`
  width: 100%;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
  }
`;

const DesktopCategoryContentWrapper = styled.div`
  padding-top: 20px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  max-width: ${SUB_CONTENT_MAX_WIDTH};
`;

const NoDataText = styled.div`
  color: #333;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
`;

const Card = styled.div<{
  $imageUrl: string;
}>`
  width: 100%;
  aspect-ratio: 1;
  background: url(${({$imageUrl}) => $imageUrl}) center no-repeat;
  background-size: contain;
  cursor: pointer;
  transition: transform .4s ease-out;
  &:hover {
    transform: scale(1.05);
  }
`

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

  return (
    <Wrapper>
      <DesktopCategoryContentWrapper>
        {hasMappingData &&
          navPopupCategoryList.map((provider) => {
            const { code: gpCode } = provider;
            const baseUrl = `${import.meta.env.BASE_URL}assets/images/home`;
            const imageUrl = `${baseUrl}/nav/${activeNavPopupGameTypeKey}/${gpCode}.png`;

            if (gpCode === "BC") {
              return null;
            }

            return (
              <Card
                key={gpCode}
                $imageUrl={imageUrl}
                onClick={() => enterVendorFilter(gpCode)}
              />
            );
          })}
        {!hasMappingData && <NoDataText>No data</NoDataText>}
      </DesktopCategoryContentWrapper>
    </Wrapper>
  );
};

export default NavCategory;
