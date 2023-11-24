import { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";

const Wrapper = styled.div`
  color: ${({ theme }) => theme.white};
  font-family: Gill Sans MT;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const CurrentTime = () => {
  const [currentTime, setcurrentTime] = useState(moment().format("YYYY-MM-DD HH:mm:ss"));
  const [tickCount, setTickCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTickCount(tickCount + 1);
      setcurrentTime(moment().format("YYYY-MM-DD HH:mm:ss"));
    }, 1000);
    return () => clearTimeout(timer);
  }, [tickCount]);

  return <Wrapper>{currentTime}</Wrapper>;
};

export default CurrentTime;
