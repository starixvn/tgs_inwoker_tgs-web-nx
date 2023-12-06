import styled from "styled-components";
import bigTabBg from "@/assets/t23/images/home/bigTabBg.svg";
import tabBg from "@/assets/t23/images/home/tabBg.svg";

const HomeCategorySection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 13px;
`;

const CategoryTab = styled.div<{ $size?: string }>`
  width: 100%;
  height: 50px;
  background-image: url(${({ $size }) => $size === "big" ? bigTabBg : tabBg});
  background-size: contain;
  background-repeat: no-repeat;
  padding:15px;
`;

const CategoryTitle = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 1.125rem;
  font-weight: 700;
`;

const CategoryContent = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border-radius: 0px 20px 20px 20px;
  background-color: ${({ theme }) => theme.mainDarkBackground};
`;

type Props = {
  title: string;
  size?: string | undefined;
  children: React.ReactNode;
};

const HomeCategoryFolder = ({
  title,
  size,
  children,
}: Props) => {
  return (
    <HomeCategorySection>
      <CategoryTab $size={size}>
        <CategoryTitle>{title}</CategoryTitle>
      </CategoryTab>
      <CategoryContent>{children}</CategoryContent>
    </HomeCategorySection>
  );
};

export default HomeCategoryFolder;
