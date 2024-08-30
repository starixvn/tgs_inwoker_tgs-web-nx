import styled from "styled-components";
import { utility } from "@tgs-web-nx/utils";


const emptyImageLogo = utility.imagePathGenerator("mobile/promotion/empty.png");
const EmptyImage = styled.div`
  width: 100%;
  height: calc(100vh - 80px - 82px);
  background: url(${emptyImageLogo})
    no-repeat center center;
  background-size: cover;
`;

const EmptyPage = () => {
  return <EmptyImage />;
};

export default EmptyPage;
