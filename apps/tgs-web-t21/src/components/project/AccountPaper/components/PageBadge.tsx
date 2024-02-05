import React from "react";
import styled from "styled-components";
import Icon from "@/components/project/Icon";

const PageBadgeContainer = styled.div`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 5px;
  color: ${({ theme }) => theme.white};
  background: linear-gradient(180deg, #03a9dd 0%, #09b6ed 50%, #02c3ff 100%);
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.437rem;
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
        width={width || "30px"}
        height={height || "30px"}
        style={{
          marginRight: "8px",
        }}
      />
      {text}
    </PageBadgeContainer>
  );
};

export default PageBadge;
