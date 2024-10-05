import { media } from "@tgs-web-nx/constants";
import styled from "styled-components";

import { FilterTagWrapper } from "../../../HomeGameFilterTag/style";
import { GameTypeTitle } from "../HomeCategory/style";
import { GamesWrapperBlock } from "../NonLobbyCategory/style";

export const ContainerWithTitle = styled(GamesWrapperBlock)`
  width: 100%;
  position: relative;
  gap: 0;

  ${GameTypeTitle} {
    margin-bottom: ${({ theme }) => theme.gameTypeTitleInGamePageMargin};
  }

  ${FilterTagWrapper} {
    margin-top: 1rem;

    ${media.sm} {
      position: absolute;
      top: -5.6rem;
      right: 0;
    }
  }
`;
