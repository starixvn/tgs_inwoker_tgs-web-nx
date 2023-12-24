import React from "react";
import styled from "styled-components";
import Icon from "@/components/project/Icon";

const PageBadgeContainer = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: ${({ theme }) => theme.text};
  width: fit-content;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.437rem;
  border-left: 5px solid ${({ theme }) => theme.primary};
`;

type Props = {
  iconUrl: string;
  text: string;
  width?: string;
  height?: string;
} & React.HTMLProps<HTMLDivElement>;

const PageBadge = ({ iconUrl, width, height, text, ...others }: Props) => {
  return (
    // @ts-ignore
    <PageBadgeContainer {...others}>
      <Icon
        iconUrl={iconUrl}
        width={width || "22px"}
        height={height || "22px"}
        style={{
          marginRight: "8px",
        }}
      />
      {text}
    </PageBadgeContainer>
  );
};

export default PageBadge;
