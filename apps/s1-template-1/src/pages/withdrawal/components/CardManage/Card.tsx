import Icon from "@/components/project/Icon";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";
import styled from "styled-components";

type CardContentProps = {
  $isHeader: boolean;
  theme: typeof theme;
}

const CardContainer = styled.div`
  width: 100%;
  padding: 16px;
  background: ${({ theme }) => theme.secBTNBGC};
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 4px;

  ${media.md} {
    width: calc((100% - 14px * 1) / 2);
    background: ${({ theme }) => theme.mainBackground};
  }
`;

const CardTitle = styled.div`
  color: ${({ theme }) => theme.text};
  border-bottom: 1px solid ${({ theme }) => theme.gray20};
  padding-bottom: 10px;
  font-size: 1.1rem;
  font-weight: 700;
`;

const CardContent = styled.div<CardContentProps>`
  color: ${({ $isHeader, theme }: CardContentProps) =>
    $isHeader ? theme.tableHeaderColor : theme.tableColor};
  display: grid;
  grid-template-columns: 5.6rem 1fr 1fr 4.8rem;
  align-items: center;
  height:${({ $isHeader, theme }: CardContentProps) =>
    $isHeader ? `3.6rem` : `4.8rem`};
   border-bottom: 1px solid ${({ $isHeader, theme }: CardContentProps) =>
    $isHeader ? theme.tableHeaderBorderColor : theme.tableBorderColor};
  padding: .4rem;
  font-size:${({ $isHeader, theme }: CardContentProps) =>
    $isHeader ? theme.tableHeaderFontSize : theme.tableFontSize};
  font-weight: ${({ $isHeader, theme }: CardContentProps) =>
    $isHeader ? `700` : `400`};
   background-color: ${({ $isHeader, theme }: CardContentProps) =>
    $isHeader ? theme.tableHeaderBackground : `inherit`};
   border-radius: ${({ $isHeader, theme }: CardContentProps) =>
    $isHeader ? `${theme.tableBorderRadius} ${theme.tableBorderRadius} 0 0` : `0`};
  
  &:last-child {
    border-radius: 0 0 ${theme.tableBorderRadius} ${theme.tableBorderRadius};
    border: none;
  }
  ${media.sm} {
    font-size: 1.4rem;
    grid-template-columns: 19rem 1fr 1fr 11rem;
    height: 4.8rem;
  }

`;
  

const ContentRow = styled.div<CardContentProps>` 
   display: flex;
   justify-content: center;
   ${media.sm} {
      padding: .8rem;
   }
   
  
`;

type Props = {
  title: string;
  content: string;
  handleDelete: () => void;
  disable?: boolean;
  contentName: string;
  isHeader: boolean;
};
const Card = ({ title, content, handleDelete, contentName, disable, isHeader}: Props) => {
  return (
      <CardContent $isHeader={isHeader}>
        <ContentRow $isHeader={isHeader}>{title}</ContentRow>
        <ContentRow $isHeader={isHeader}>{contentName}</ContentRow>
        <ContentRow $isHeader={isHeader}>
          {/* <EndingInLabel>{i18n.t("card.tail")}</EndingInLabel> */}
          {content}
        </ContentRow>
        
        <ContentRow $isHeader={isHeader}>
          {!disable && (
            <Icon
              onClick={handleDelete}
              iconUrl="/assets/images/common/icon-delete.svg"
              width={"13px"}
              height={"16px"}
              style={{
                cursor: "pointer",
                width: "100%"
              }}
            />
          )}
        </ContentRow>
      </CardContent>
  );
};

export default Card;
