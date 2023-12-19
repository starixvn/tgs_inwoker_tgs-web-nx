import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { getGameTypeName, i18n } from "@tgs-web-nx/utils";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import iconReturn from "@/assets/t30/images/home/icon-return.svg";
import iconSearch from "@/assets/t30/images/home/icon-search.svg";
import Icon from "@/components/project/Icon";
import SearchBar, {
  CATEGORY_HEADER_HEIGHT,
} from "@/layouts/components/CategoryHeader/components/SearchBar";

const CategoryHeaderContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
`;

const GameTypeName = styled.div`
  color: ${({ theme }) => theme.white};
`;

type Props = {};

const CategoryHeader = (props: Props) => {
  const history = useHistory();
  const { activeGameType, handleChangeGameType } = useHomeGameContext();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prevState) => !prevState);
  }, []);

  const navigateToHome = useCallback(() => {
    handleChangeGameType(GameTypeEnum.NONE);
    history.push("/");
  }, []);

  if (activeGameType === GameTypeEnum.NONE) return null;

  return (
    <CategoryHeaderContainer>
      <Icon
        iconUrl={iconReturn}
        width={CATEGORY_HEADER_HEIGHT}
        height={CATEGORY_HEADER_HEIGHT}
        style={{
          cursor: "pointer",
        }}
        onClick={navigateToHome}
      />
      <GameTypeName>{i18n.t(getGameTypeName(activeGameType))}</GameTypeName>
      <Icon
        iconUrl={iconSearch}
        width={"19px"}
        height={"19px"}
        style={{
          cursor: "pointer",
          margin: "0 15px 0 auto",
        }}
        onClick={toggleSearch}
      />

      <SearchBar isOpen={isSearchOpen} toggleSearch={toggleSearch} />
    </CategoryHeaderContainer>
  );
};

export default React.memo(CategoryHeader);
