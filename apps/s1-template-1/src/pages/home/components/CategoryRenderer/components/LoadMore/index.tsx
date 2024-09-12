import { useGetNonLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";

const LoadMoreWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadMoreButton = styled.button`
  background-color: ${({ theme }) => theme.gray20};
  border-color: transparent;
  border-radius: 8px;
  padding: 10px 20px;
  color: ${({ theme }) => theme.white};
  font-size: 16px;
  font-weight: 700;
  width: fit-content;
  cursor: pointer;
`;

const ProgressBar = styled.div`
  width: 150px;
  height: 5px;
  background-color: ${({ theme }) => theme.gray20};
  margin-top: 5px;
  border-radius: 5px;
`;

const Caption = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.gray50};
  margin-top: 10px;
`;

const LoadMore = () => {
  const { pageIndex, pageSize, handleChangePageIndex } = useHomeGameContext();

  const { total } = useGetNonLobbyCategoryList();

  return (
    total > pageSize * pageIndex && (
      <LoadMoreWrapper>
        <LoadMoreButton onClick={() => handleChangePageIndex(pageIndex + 1)}>
          {i18n.t("common.loadmore")}
        </LoadMoreButton>
        <ProgressBar></ProgressBar>
        <Caption>{`${i18n.t("common.shown")} ${pageIndex * pageSize} ${i18n.t("common.of")} ${total}`}</Caption>
      </LoadMoreWrapper>
    )
  );
};

export default LoadMore;
