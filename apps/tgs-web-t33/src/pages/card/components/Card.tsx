import React from "react";
import styled from "styled-components";
import deleteIcon from "@/assets/t33/images/card/delete.svg";

const CardContainer = styled.div`
  padding: 16px;
  background: ${({ theme }) => theme.gray40};
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 4px;
`;

const CardTitle = styled.div`
  color: ${({ theme }) => theme.white};
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
  padding-bottom: 10px;
  font-size: 1.25rem;
  font-weight: 700;
`;

const CardContent = styled.div`
  color: ${({ theme }) => theme.gray20};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentRow = styled.div``;
const Icon = styled.div`
  width: 40px;
  height: 40px;

  & img {
    width: 100%;
    object-fit: cover;
  }
`;

type Props = {
  title: string;
  content: string;
  handleDelete: () => void;
  disable: boolean;
};
const Card = ({ title, content, handleDelete, disable }: Props) => {
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <CardContent>
        <ContentRow>{content}</ContentRow>
        <ContentRow>
          {!disable && (
            <Icon onClick={handleDelete}>
              <img src={deleteIcon} alt={"delete"} />
            </Icon>
          )}
        </ContentRow>
      </CardContent>
    </CardContainer>
  );
};

export default Card;
