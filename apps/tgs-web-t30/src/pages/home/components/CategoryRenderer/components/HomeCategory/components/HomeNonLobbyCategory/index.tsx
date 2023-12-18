import styled from "styled-components";
import tabBg from "@/assets/t23/images/home/tabBg.svg";

const HomeCategorySection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 13px;
`;

const CategoryTab = styled.div`
  width: 184px;
  height: 48px;
  background-image: url(${tabBg});
  background-size: contain;
  padding: 15.5px 15px;
`;

const CategoryTitle = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 0.875rem;
`;

const CategoryContent = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border-radius: 0px 20px 20px 20px;
  background-color: ${({ theme }) => theme.mainBackground};
`;

type Props = {
  title: string;
  children: React.ReactNode;
};

const HomeNonLobbyCategory = ({ title, children }: Props) => {
  return (
    <HomeCategorySection>
      <CategoryTab>
        <CategoryTitle>{title}</CategoryTitle>
      </CategoryTab>
      <CategoryContent>{children}</CategoryContent>
    </HomeCategorySection>
  );
};

export default HomeNonLobbyCategory;
