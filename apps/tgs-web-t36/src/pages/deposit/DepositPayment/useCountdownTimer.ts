import moment from 'moment';
import { useState, useEffect } from 'react';

/**
 * 將總秒數轉為分鐘格式 e.g. 301秒 => 05:01
 */
function formatSeconds(seconds: number) {
  const duration = moment.duration(seconds, 'seconds');
  const minutes = Math.floor(duration.asMinutes());
  const secs = duration.seconds();
  return moment({ m: minutes, s: secs }).format('mm:ss');
}

export function useCountdownTimer(expired? : string) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if(!expired) return;
    const now = moment();
    const expiration = moment(expired);
    const totalSeconds = expiration.diff(now, 'seconds');
    setSeconds(totalSeconds);
    
    const timerId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [expired]);

  return {
    seconds: seconds <= 0 ? '00:00' : formatSeconds(seconds),
    isExpired: seconds <= 0,
  }
}
