import { useRwd } from "@tgs-web-nx/core/hooks";

import DesktopRecentBigWins from "./DesktopRecentBigWins";
import MobileRecentBigWins from "./MobileRecentBigWins";

type BigWinType = {
  name: string;
  amount: number;
  code: string;
};

const RecentBigWins: React.FC<{ recentBigWins: BigWinType[] }> = ({ recentBigWins }) => {
  const { isMobileSize } = useRwd();

  return isMobileSize ? (
    <MobileRecentBigWins recentBigWins={recentBigWins} />
  ) : (
    <DesktopRecentBigWins recentBigWins={recentBigWins} />
  );
};

export default RecentBigWins;
