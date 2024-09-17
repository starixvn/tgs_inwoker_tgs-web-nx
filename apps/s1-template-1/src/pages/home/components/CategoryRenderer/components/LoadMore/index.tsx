import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { Trans } from "react-i18next";
import styled from "styled-components";

const LoadMoreWrapper = styled.div`
  margin-top: 3.2rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`;

const LoadingMore = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  justify-content: stretch;
`;

const LoadMoreButton = styled.button`
  background-color: ${({ theme }) => theme.loadingMoreButtonBackground};
  border-color: transparent;
  border-radius: 1rem;
  height: 3.6rem;
  padding: 0 1.8rem;
  color: ${({ theme }) => theme.loadingMoreButtonColor};
  font-size: 1.6rem;
  font-weight: 700;
  width: fit-content;
  cursor: pointer;
`;

const ProgressBar = styled.div`
  height: 0.4rem;
  background-color: ${({ theme }) => theme.progressBar};
  border-radius: 10rem;
`;

const Caption = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 2rem;
  color: ${({ theme }) => theme.captionTextColor};
`;

const LoadMore: React.FC<{ totalGames: number }> = ({ totalGames }) => {
  const { pageIndex, pageSize, handleChangePageIndex } = useHomeGameContext();

  const shownItems = pageIndex * pageSize;
  const remainingItems = totalGames - shownItems;
  const numberMore = Math.max(0, Math.min(remainingItems, pageSize));

  const hasMoreItems = totalGames > shownItems;

  return (
    <LoadMoreWrapper>
      {hasMoreItems && (
        <LoadingMore>
          <LoadMoreButton onClick={() => handleChangePageIndex(pageIndex + 1)}>
            <Trans>{i18n.t("common.showNumberMore", { numberMore })}</Trans>
          </LoadMoreButton>
          <ProgressBar />
        </LoadingMore>
      )}
      <Caption>
        <Trans>
          {i18n.t("common.showNumberOfTotal", {
            number: Math.min(shownItems, totalGames),
            total: totalGames,
          })}
        </Trans>
      </Caption>
    </LoadMoreWrapper>
  );
};

export default LoadMore;
