import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { Trans } from "react-i18next";

import { Caption, LoadingMore, LoadMoreButton, LoadMoreWrapper, ProgressBar } from "./style";

const LoadMore: React.FC<{ totalGames?: number }> = ({ totalGames }) => {
  const { pageIndex, pageSize, handleChangePageIndex } = useHomeGameContext();

  const shownItems = pageIndex * pageSize;
  const remainingItems = totalGames ? totalGames - shownItems : 0;
  const numberMore = Math.max(0, Math.min(remainingItems, pageSize));

  const hasMoreItems = totalGames && totalGames > shownItems;
  const shownItemsNumber = Math.min(shownItems, totalGames || 0);
  const percentShownItems = (totalGames && (shownItemsNumber / totalGames) * 100) || 0;

  return (
    <LoadMoreWrapper>
      {hasMoreItems && (
        <LoadingMore>
          <LoadMoreButton onClick={() => handleChangePageIndex(pageIndex + 1)}>
            <Trans>{i18n.t("common.showNumberMore", { numberMore })}</Trans>
          </LoadMoreButton>
          <ProgressBar percent={percentShownItems} />
        </LoadingMore>
      )}
      <Caption>
        <Trans>
          {i18n.t("common.showNumberOfTotal", {
            number: shownItemsNumber,
            total: totalGames,
          })}
        </Trans>
      </Caption>
    </LoadMoreWrapper>
  );
};

export default LoadMore;
