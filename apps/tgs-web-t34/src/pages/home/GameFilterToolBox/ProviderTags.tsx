import React from "react";
import styled from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";

const ProviderTagsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 8px;

  ${media.sm} {
    width: 42%;
    border-bottom: 1px solid ${({ theme }) => theme.grey00};
  }
`;

type ProviderTagProps = {
  $isActive: boolean;
  theme: typeof theme;
};
const ProviderTag = styled.div<ProviderTagProps>`
  background: ${({ $isActive, theme }: ProviderTagProps) =>
    $isActive ? theme.grey00 : theme.white};
  color: ${({ $isActive, theme }: ProviderTagProps) => ($isActive ? theme.white : theme.grey00)};
  border: 1px solid ${({ theme }) => theme.grey00};
  border-radius: 2px;
  padding: 8px 12px;
  flex-shrink: 0;
  cursor: pointer;
  font-size: 0.75rem;

  ${media.sm} {
    border: 1px solid
      ${({ $isActive, theme }: ProviderTagProps) => ($isActive ? theme.grey00 : "transparent")};
    border-radius: 4px 4px 0 0;
    font-size: 0.875rem;
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
