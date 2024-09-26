import { useLocation } from "react-router";
import styled from "styled-components";

const CenteredLayout = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 6.5rem - 1.6rem - 1.5rem - 27rem);
  text-align: center;
  color: #fff;
  font-size: 1.4rem;
  > h1 {
    font-size: 1.8rem;
   }
`

const DepositStatusIframe = () => {

  const search = useLocation().search;
  const status = new URLSearchParams(search).get("status")

  return<CenteredLayout>
    {status === 'fail' && <h1>FAIL</h1>}
    {status === 'success' && <h1>SUCCESS</h1>}
    <p>Please close this page.</p>
  </CenteredLayout>

}

export default DepositStatusIframe;
