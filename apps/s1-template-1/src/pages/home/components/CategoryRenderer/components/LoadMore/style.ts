import styled from "styled-components";

export const LoadMoreWrapper = styled.div`
  margin-top: 3.2rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`;

export const LoadingMore = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  justify-content: stretch;
`;

export const LoadMoreButton = styled.button`
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

export const ProgressBar = styled.div<{ percent: number }>`
  position: relative;
  height: 0.4rem;
  background-color: ${({ theme }) => theme.progress};
  border-radius: 10rem;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${({ percent }) => percent}%;
    border-radius: 10rem;
    background-color: ${({ theme }) => theme.progressBar};
  }
`;

export const Caption = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 2rem;
  color: ${({ theme }) => theme.captionTextColor};
`;
