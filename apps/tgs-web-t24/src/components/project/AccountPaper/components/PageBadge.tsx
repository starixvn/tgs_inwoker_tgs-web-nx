import React from "react";
import Icon from "@/components/project/Icon";
import styled from "styled-components";

const PageBadgeContainer = styled.div`
  padding: 10px 20px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: ${({ theme }) => theme.white};
  width: fit-content;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.437rem;
`;

type Props = {
  iconUrl: string;
  width?: string;
  height?: string;
  text: string;
} & React.HTMLProps<HTMLDivElement>;

const PageBadge = ({ iconUrl, width, height, text, ...others }: Props) => {
  return (
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
