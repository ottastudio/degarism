import { useEffect, useState } from "react";

const media = {
  phone: "(min-width: 320px) and (max-width: 767px)",
  tablet: "(min-width: 768px) and (max-width: 1024px)",
  sMonitor: "(min-width: 1025px) and (max-width: 1366px)",
  mMonitor: "(min-width: 1367px) and (max-width: 1600px)",
  lMonitor: "(min-width: 1601px) and (max-width: 2400px)"
};

const useMediaQuery = (mq: string) => {
  const [matches, setMatches] = useState(
    () =>
      typeof window !== "undefined" && window && window.matchMedia(mq).matches
  );

  useEffect(() => {
    const mql: any =
      typeof window !== "undefined" && window && window.matchMedia(mq);
    const listener = (e: any) => setMatches(e.matches);
    mql.addListener(listener);

    return () => mql.removeListener(listener);
  }, [mq]);

  return matches;
};

export const getMediaQuery = () => {
  const { phone, tablet, sMonitor, mMonitor, lMonitor } = media;

  const isPhone = useMediaQuery(phone);
  const isTablet = useMediaQuery(tablet);
  const isSmallMonitor = useMediaQuery(sMonitor);
  const isMediumMonitor = useMediaQuery(mMonitor);
  const isLargeMonitor = useMediaQuery(lMonitor);

  return { isPhone, isTablet, isSmallMonitor, isMediumMonitor, isLargeMonitor };
};
