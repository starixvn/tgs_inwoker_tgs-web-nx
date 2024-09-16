import Icon from "@/components/project/Icon";
import { media } from "@/theme/breakpoints";
import styled from "styled-components";

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

const CardContent = styled.div`
  color: ${({ theme }) => theme.text};
  display: grid;
  grid-template-columns: 5.6rem 1fr 1fr 4.8rem;
  align-items: center;
  height: 4.8rem;
   border-bottom: 1px solid ${({ theme }) => theme.tableBorderColor};
`;

const ContentRow = styled.div`
   font-size: 1.1rem;
  
`;


type Props = {
  title: string;
  content: string;
  handleDelete: () => void;
  disable: boolean;
  contentName: string;
};
const Card = ({ title, content, handleDelete, contentName, disable }: Props) => {
  return (
      <CardContent>
        <ContentRow>{title}</ContentRow>
        <ContentRow>{contentName}</ContentRow>
        <ContentRow>
          {/* <EndingInLabel>{i18n.t("card.tail")}</EndingInLabel> */}
          {content}
        </ContentRow>
        
        <ContentRow>
          {!disable && (
            <Icon
              onClick={handleDelete}
              iconUrl="/assets/images/common/icon-delete.svg"
              width={"13px"}
              height={"16px"}
              style={{
                marginLeft: "auto",
                cursor: "pointer",
              }}
            />
          )}
        </ContentRow>
      </CardContent>
  );
};

export default Card;
