import styled from "styled-components";
import CardAddButton from "@/pages/withdrawal/components/CardManage/CardAddButton";

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  height: 46px;
`;

type Props = {
  title: string;
  isShowAddCardButton?: boolean;
  handleClickAddCard?: () => void;
};
const FormTitle = ({ title, isShowAddCardButton, handleClickAddCard }: Props) => {
  return (
    <TitleWrapper>
      {isShowAddCardButton && handleClickAddCard && (
        <CardAddButton handleClick={handleClickAddCard} />
      )}
    </TitleWrapper>
  );
};

export default FormTitle;
