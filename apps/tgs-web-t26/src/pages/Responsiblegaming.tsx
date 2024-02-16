import styled from "styled-components";
import { useResponsiblePage } from "@tgs-web-nx/core/hooks";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  padding: 20px;
  gap: 6px;
  flex-shrink: 0;
  flex: 1;

  & h1 {
    font-size: 3rem;
    font-weight: 500;
  }

  & h2 {
    font-size: 1.75rem;
    font-weight: 400;
    margin: 10px 0;
  }

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    padding: 30px;

    & h1 {
      font-size: 3.125rem;
    }
  }
`;

const Responsiblegaming = () => {
  const { getResponsibleTranslate } = useResponsiblePage();
  return <Container>{getResponsibleTranslate()}</Container>;
};

export default Responsiblegaming;
