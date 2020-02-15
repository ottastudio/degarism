import { createContext, useContext } from "react";

const phone = { minWidth: 320, maxWidth: 767 };
const tablet = { minWidth: 768, maxWidth: 1024 };
const sMonitor = { minWidth: 1025, maxWidth: 1366 };
const mMonitor = { minWidth: 1367, maxWidth: 1600 };
const lMonitor = { minWidth: 1601, maxWidth: 2450 };

type query = {
  minWidth: number;
  maxWidth: number;
};
export type MediaQueryType = {
  isPhone: query;
  isTablet: query;
  isSmallMonitor: query;
  isMediumMonitor: query;
  isLargeMonitor: query;
};
export interface AppContextProps {
  mediaQuery: MediaQueryType;
}

export const AppContext = createContext<AppContextProps>({
  mediaQuery: {
    isPhone: phone,
    isTablet: tablet,
    isSmallMonitor: sMonitor,
    isMediumMonitor: mMonitor,
    isLargeMonitor: lMonitor
  }
});
export const AppProvider: React.FC<{}> = ({ children }) => {
  return (
    <AppContext.Provider
      value={{
        mediaQuery: {
          isPhone: phone,
          isTablet: tablet,
          isSmallMonitor: sMonitor,
          isMediumMonitor: mMonitor,
          isLargeMonitor: lMonitor
        }
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const AppConsumer = AppContext.Consumer;
export const useAppContext = () => useContext(AppContext);
