import React from "react";
import styled from "styled-components";
import Icon from "@/components/project/Icon";

const PageBadgeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: ${({ theme }) => theme.primary};
  width: fit-content;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.437rem;
  padding: 10px 20px;
  border-left: 5px solid #65b8ff;
  margin-bottom: 20px;
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
        width={width || "24px"}
        height={height || "24px"}
        style={{
          marginRight: "5px",
        }}
      />
      {text}
    </PageBadgeContainer>
  );
};

export default PageBadge;
