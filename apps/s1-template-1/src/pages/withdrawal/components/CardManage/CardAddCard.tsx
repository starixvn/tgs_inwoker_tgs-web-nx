
import { LightBlueGradientButton } from "@/components/UI/Button";
import Icon from "@/components/project/Icon";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 100%;
  padding: 13px 20px;
  background: ${({ theme }) => theme.secBTNBGC};
  border: 1px solid ${({ theme }) => theme.main};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  border-radius: 5px;
  cursor: pointer;
`;

const EmptyCardTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const IconContainer = styled.div`
  width: 38px;
  height: 38px;

  & > img {
    width: 100%;
    object-fit: cover;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
`;

type Props = {
  handleClick: () => void;
};
const CardAddCard = ({ handleClick }: Props) => {
  return (
    <LightBlueGradientButton onClick={handleClick} style={{height: "36px", width: "110px"}}>        
        Add New
        <Icon iconUrl="/assets/images/common/icon-plus.svg" width={"18px"} height={"18px"} />
      {/*<EmptyCardDesc>{i18n.t("card.msgAddCardDesc")}</EmptyCardDesc>*/}
    </LightBlueGradientButton>
  );
};

export default CardAddCard;
