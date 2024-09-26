import { media } from "@tgs-web-nx/constants";
import styled from "styled-components";

import { FilterTagWrapper } from "../../../HomeGameFilterTag/style";
import { GameTypeTitle } from "../HomeCategory/style";

export const ContainerWithTitle = styled.div`
  width: 100%;
  position: relative;

  ${GameTypeTitle} {
    margin-bottom: 0;
  }

  ${FilterTagWrapper} {
    margin-top: 1rem;

    ${media.sm} {
      position: absolute;
      top: -4.8rem;
      right: 0;
    }
  }
`;
