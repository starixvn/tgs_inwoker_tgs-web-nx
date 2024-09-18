import { GameName, Loading, NoGameIconWrapper, NoImage, SpinnerBox } from "./style";

export const NoGameIcon: React.FC<{ gameName?: string }> = ({ gameName }) => {
  return (
    <NoGameIconWrapper>
      <NoImage src="/assets/images/common/no-image.svg" alt="No image" />
      {gameName && <GameName>{gameName}</GameName>}
    </NoGameIconWrapper>
  );
};

export const LoadingIcon: React.FC = () => {
  return (
    <SpinnerBox>
      <Loading />
    </SpinnerBox>
  );
};
