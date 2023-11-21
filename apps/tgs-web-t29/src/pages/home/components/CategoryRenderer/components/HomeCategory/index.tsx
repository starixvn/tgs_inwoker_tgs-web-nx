import styled from "styled-components";
import bg from "@/assets/t29/images/home/home_bg.png";
import sport from "@/assets/t29/images/home/home_sport.png";
import live_casino from "@/assets/t29/images/home/home_live_casino.png";
import slot from "@/assets/t29/images/home/home_slot.png";
import lottery from "@/assets/t29/images/home/home_lottery.png";

const HomeCategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  background-image: url(${bg});
  background-size: cover;
  background-repeat: repeat;
  padding: 15px 0px;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px 0px 34px 0px;
`;

const CategoryImage = styled.img`
  width: 250px;
  height: 200px;
`;

const CategoryName = styled.div`
  color: #333;
  font-size: 0.9375rem;
  font-weight: 700;
  text-align: center;
`;

const HomeCategory = () => {

  const homeCategotyList = [
    {
      name: "SPORT",
      imgUrl: sport,
    },
    {
      name: "LIVE CASINO",
      imgUrl: live_casino,
    },
    {
      name: "SLOT",
      imgUrl: slot,
    },
    {
      name: "LOTTERY",
      imgUrl: lottery,
    },
  ];

  return (
    <HomeCategoryContainer>
      {homeCategotyList.map((item) => {
        return (
          <CategoryWrapper key={item.name}>
            <CategoryImage src={item.imgUrl} alt={item.name} />
            <CategoryName>{item.name}</CategoryName>
          </CategoryWrapper>
        );
      })};
    </HomeCategoryContainer>
  );
};

export default HomeCategory;
