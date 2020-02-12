import { createContext, useContext } from "react";

export const AppContext = createContext({});
export const AppProvider: React.FC<{}> = ({ children }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};
export const AppConsumer = AppContext.Consumer;
export const useAppContext = () => useContext(AppContext);
