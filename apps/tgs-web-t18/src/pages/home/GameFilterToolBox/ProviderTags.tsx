import React from "react";
import styled from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";

const ProviderTagsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 8px;
  padding: 15px 0;

  ${media.sm} {
    width: 42%;
  }
`;

type ProviderTagProps = {
  $isActive: boolean;
  theme: typeof theme;
};
const ProviderTag = styled.div<ProviderTagProps>`
  background: ${({ $isActive, theme }: ProviderTagProps) =>
    $isActive ? theme.primary : theme.tertiaryDark};
  color: ${({ $isActive, theme }: ProviderTagProps) => ($isActive ? theme.white : theme.tertiary)};
  border-radius: 50px;
  padding: 8px 12px;
  flex-shrink: 0;
  cursor: pointer;
  font-size: 0.75rem;

  ${media.sm} {
  }
`;

const ProviderTags = () => {
  const { activeProviderFilterTag, handleChangeActiveProviderFilterTag, providerFilterTagList } =
    useHomeGameContext();

  return (
    <ProviderTagsContainer>
      {providerFilterTagList.map((providerFilterTag, index) => {
        return (
          <ProviderTag
            key={index}
            $isActive={providerFilterTag.gpCode === activeProviderFilterTag.gpCode}
            onClick={() => handleChangeActiveProviderFilterTag(providerFilterTag)}
          >
            {providerFilterTag.name}
          </ProviderTag>
        );
      })}
    </ProviderTagsContainer>
  );
};

export default ProviderTags;
