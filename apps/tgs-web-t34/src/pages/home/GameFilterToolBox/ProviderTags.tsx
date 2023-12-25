import React from "react";
import styled from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { theme } from "@/theme";

const ProviderTagsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 8px;
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
`;

type Props = {};

const ProviderTags = (props: Props) => {
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
