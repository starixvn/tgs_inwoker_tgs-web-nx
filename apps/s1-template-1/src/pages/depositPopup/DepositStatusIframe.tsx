import { useLocation } from "react-router";
import styled from "styled-components";

const CenteredLayout = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  text-align: center;
`

const DepositStatusIframe = () => {

  const search = useLocation().search;
  const status = new URLSearchParams(search).get("status")

  return<CenteredLayout>
    {status === 'fail' && <h1>FAIL</h1>}
    {status === 'success' && <h1>SUCCESS</h1>}
    Please close this page.
  </CenteredLayout>

}

export default DepositStatusIframe;
