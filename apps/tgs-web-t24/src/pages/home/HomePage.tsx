import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import styled from "styled-components";

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};

  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    padding: 20px 0px;
    gap: 20px;
  }
`;

const SliderWrapper = styled.div`
  width: 100%;
  height: 160px;

  ${media.sm} {
    height: 375px;
    border-radius: 10px;
  }
`;

const GameTypeBanner = styled.div<{ $imageUrl: string }>`
  width: 100%;

  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    height: 375px;
    border-radius: 10px;
    background-image: url(${({ $imageUrl }) => $imageUrl});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const MainContentWrapper = styled.div`
  width: 100%;
  padding: 22px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.primaryDark};
  color: ${({ theme }) => theme.white};
  gap: 10px;
  flex-shrink: 0;

  ${media.sm} {
    gap: 20px;
    padding: unset;
  }
`;

const HomePage = () => {
  const { general } = useGeneralStore();
  const { isMobileSize, isDesktopSize } = useRwd();
  const { activeGameType, activeGameTypeKey } = useHomeGameContext();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [activeGameType]);

  return (
    <MainWrapper>
      {((isDesktopSize && !activeGameType)) && !!general.banner.length && (
        <SliderWrapper>
          <Slider />
        </SliderWrapper>
      )}

      {!!activeGameType && (
        <GameTypeBanner
          $imageUrl={
            activeGameTypeKey
              ? `${import.meta.env.BASE_URL}assets/images/home/gp_banner/${activeGameTypeKey}.png`
              : ""
          }
        />
      )}

      {/* <MainContentWrapper>
        {(isMobileSize || (isDesktopSize && !activeGameType)) && <CardPrompt />}
        {isMobileSize && <GameTypeTab />}

        <CategoryRenderer />
        <HomePromotionCard />

        {isMobileSize &&
          footerCategoriesList.length &&
          footerCategoriesList.map((category, index) => (
            <HomeCategoryFolder key={index} title={category.title} size={category.size!}>
              {category.content ? (
                category.content
              ) : (
                <ImageCard
                  imageUrl={category.imageUrl}
                  text={category.text}
                  alignment={category.alignment}
                />
              )}
            </HomeCategoryFolder>
          ))}
      </MainContentWrapper> */}
    </MainWrapper>
  );
};

export default React.memo(HomePage);
