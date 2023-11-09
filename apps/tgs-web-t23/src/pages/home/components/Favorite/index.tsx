/* eslint-disable react/jsx-no-useless-fragment */
import styled from "styled-components";
import dislikeIcon from "@/assets/t23/images/home/disLike.svg";
import likeIcon from "@/assets/t23/images/home/fullLike.svg";
import { media } from "@/theme/breakpoints";

const LikeIcon = styled.div<{ $imageUrl: string }>`
  width: 15px;
  height: 12px;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  box-sizing: border-box;
  position: absolute;
  top: 6px;
  right: 4.5px;

  ${media.sm} {
    width: 30px;
    height: 24px;
  }
`;

type FavoriteProps = {
  isFavorite: boolean;
  handleToggleFavorite: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => void;
  gameItemId: number;
};

const Favorite = ({ isFavorite, handleToggleFavorite, gameItemId }: FavoriteProps) => {
  return (
    <>
      {isFavorite ? (
        <LikeIcon
          $imageUrl={likeIcon}
          onClick={(event) => handleToggleFavorite(event, gameItemId)}
        />
      ) : (
        <LikeIcon
          $imageUrl={dislikeIcon}
          onClick={(event) => handleToggleFavorite(event, gameItemId)}
        />
      )}
    </>
  );
};

export default Favorite;
