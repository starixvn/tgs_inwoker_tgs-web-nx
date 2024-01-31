import styled from "styled-components";
import { MOBILE_BOTTOM_APP_BAR_HEIGHT, MOBILE_HEADER_HEIGHT } from "@/theme/constants";

const EmptyImage = styled.div`
  width: 100%;
  height: calc(100vh - ${MOBILE_HEADER_HEIGHT} - ${MOBILE_BOTTOM_APP_BAR_HEIGHT});
  background: url(${import.meta.env.BASE_URL + `assets/images/mobile/promotion/empty.png`})
    no-repeat center center;
  background-size: cover;
`;

const EmptyPage = () => {
  return <EmptyImage />;
};

export default EmptyPage;
