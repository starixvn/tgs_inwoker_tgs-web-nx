import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import contactGirlImg from "@/assets/t36/images/contact/contact.png";
import contactGirlImgMobile from "@/assets/t36/images/contact/contact_mobile.png";

const HeaderImageContainer = styled.div`
  width: 100%;
  border-radius: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const HeaderImage = () => {
  const { isDesktopSize } = useRwd();
  return (
    <HeaderImageContainer>
      <img src={isDesktopSize ? contactGirlImg : contactGirlImgMobile} alt={"contact"} />
    </HeaderImageContainer>
  );
};

export default HeaderImage;
