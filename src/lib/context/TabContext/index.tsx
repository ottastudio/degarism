import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState
} from "react";

export interface TabContextProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

export const TabContext = createContext<TabContextProps>({
  activeTab: "",
  setActiveTab: () => {}
});
export const TabProvider: React.FC<{ initialTab: string }> = ({
  children,
  initialTab
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};
export const TabConsumer = TabContext.Consumer;
export const useTabContext = () => useContext(TabContext);
