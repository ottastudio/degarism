import { useTabContext } from "../../../lib/context/TabContext";
import { TabsProps } from ".";
import { style } from "typestyle";

export interface TabBarProps {
  tabs: TabsProps;
}

const TabBar: React.SFC<TabBarProps> = ({ tabs }) => {
  const { setActiveTab, activeTab } = useTabContext();
  const repeat = tabs.length;
  const tabBarWrapper = style({
    $debugName: "tab-bar-wrapper",
    width: "100%",
    display: "grid",
    gridTemplateColumns: `repeat(${repeat}, 1fr)`,
    position: "sticky",
    top: 177,
    zIndex: 10,
    borderBottom: "1px solid",
    overflow: "hidden",
    padding: "0px 20px"
  });
  const buttonStyle = (active: boolean) =>
    style({
      outline: "none",
      border: "none",
      borderRight: "1px solid",
      borderLeft: "1px solid",
      backgroundColor: active ? "#ffffff" : "inherit",
      color: active ? "#000000" : "currentColor",
      cursor: "pointer",
      height: 40,
      fontSize: "1.5rem",
      textTransform: "capitalize"
    });
  return (
    <div className={tabBarWrapper}>
      {tabs.map(({ tab }) => (
        <button
          className={buttonStyle(activeTab === tab)}
          key={tab}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
