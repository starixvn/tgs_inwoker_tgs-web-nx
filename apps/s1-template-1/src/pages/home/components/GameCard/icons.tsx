import { CustomNoImage, GameName, Loading, NoGameIconWrapper, SpinnerBox } from "./style";

export const NoGameIcon: React.FC<{ gameName?: string }> = ({ gameName }) => {
  return (
    <NoGameIconWrapper>
      <CustomNoImage />
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
