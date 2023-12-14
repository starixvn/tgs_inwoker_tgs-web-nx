/* eslint-disable react/jsx-no-useless-fragment */
import styled from "styled-components";
import dislikeIcon from "@/assets/129/images/home/disLike.svg";
import likeIcon from "@/assets/t19/images/home/like.svg";
import { media } from "@/theme/breakpoints";

const LikeIcon = styled.div<{ $imageUrl: string }>`
  width: 22px;
  height: 22px;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  box-sizing: border-box;
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 2;

  ${media.sm} {
    top: 10px;
    right: 10.27px;
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
