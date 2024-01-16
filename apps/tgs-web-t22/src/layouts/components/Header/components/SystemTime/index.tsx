import { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { useGeneralStore } from "@tgs-web-nx/core";

const Wrapper = styled.div`
  color: ${({ theme }) => theme.white};
  font-family: Gill Sans MT;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: nowrap;
  flex-shrink: 0;
`;

const SystemTime = () => {
  const {
    general: { brand },
  } = useGeneralStore();

  const timeText = brand.code === "MOPH" ? "GMT+8" : "GMT+7";

  const [systemTime, setSystemTime] = useState(
    moment()
      .utcOffset(brand.code === "MOPH" ? "+08:00" : "+07:00")
      .format("YYYY-DD-MM HH:mm:ss"),
  );
  const [tickCount, setTickCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTickCount(tickCount + 1);
      setSystemTime(
        moment()
          .utcOffset(brand.code === "MOPH" ? "+08:00" : "+07:00")
          .format("YYYY-DD-MM HH:mm:ss"),
      );
    }, 1000);
    return () => clearTimeout(timer);
  }, [tickCount]);

  return <Wrapper>{`${timeText} ${systemTime}`}</Wrapper>;
};

export default SystemTime;
