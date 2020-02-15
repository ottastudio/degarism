import { useTabContext } from "../../../lib/context/TabContext";
import { Fragment } from "react";
import { TabsProps } from ".";

export interface TabPanelProps {
  tabs: TabsProps;
}

const TabPanel: React.FC<TabPanelProps> = ({ tabs }) => {
  const { activeTab } = useTabContext();
  return (
    <Fragment>
      {tabs.map(({ tab, element }) =>
        activeTab === tab ? <Fragment key={tab}>{element}</Fragment> : null
      )}
    </Fragment>
  );
};

export default TabPanel;
