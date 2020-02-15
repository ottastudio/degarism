import { ReactElement } from "react";
import { TabProvider } from "../../../lib/context/TabContext";
import TabBar from "./TabBar";
import TabPanel from "./TabPanel";

import DashboardFaqs from "./Faqs";
import DashboardProducts from "./Products";

export type TabProps = {
  tab: string;
  element: ReactElement;
};
export type TabsProps = Array<TabProps>;

const Admin: React.FC<{}> = () => {
  const tabs: TabsProps = [
    { tab: "faqs", element: <DashboardFaqs /> },
    { tab: "products", element: <DashboardProducts /> }
  ];
  return (
    <TabProvider initialTab={tabs[0].tab}>
      <TabBar tabs={tabs} />
      <TabPanel tabs={tabs} />
    </TabProvider>
  );
};

export default Admin;
