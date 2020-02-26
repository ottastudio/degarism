import { ReactElement, memo, useState, useEffect } from "react";
import Axios from "axios";
import Router from "next/router";
import cookie from "js-cookie";
import Link from "next/link";
import nprogress from "nprogress";

import { useAuthContext } from "../../../lib/context/AuthContext";
import { useSubpageContext } from "../../../lib/context/SubPageContext";
import { IUserDocument } from "../../../../global";

import DashboardFaqs from "./Faqs";
import DashboardProducts from "./Products";
import DashboardAccount from "./Account";
import DashboardUsers from "./Users";
import DashboardCart from "./Cart";

export type TabsProps = Array<{ tab: string; element: ReactElement }>;

const MemoizedDashboardUsers = memo(DashboardUsers);
const MemoizedDashboardProucts = memo(DashboardProducts);
const MemoizedDashboardFaqs = memo(DashboardFaqs);
const MemoizedDashboardAccount = memo(DashboardAccount);
const MemoizedDashboardCart = memo(DashboardCart);

const tabsAdmin: TabsProps = [
  { tab: "users", element: <MemoizedDashboardUsers /> },
  { tab: "products", element: <MemoizedDashboardProucts /> },
  { tab: "faqs", element: <MemoizedDashboardFaqs /> }
];
const tabsUser: TabsProps = [
  {
    tab: "account",
    element: <MemoizedDashboardAccount />
  }
];
const tabGlobal: TabsProps = [
  { tab: "cart", element: <MemoizedDashboardCart /> }
];

const Admin: React.FC<{
  user: IUserDocument;
  revalidateProfile: () => Promise<boolean>;
}> = ({ user, revalidateProfile }) => {
  const { setToken } = useAuthContext();
  const [goodBye, setGoodBye] = useState(false);
  const logoutHandler = () => {
    nprogress.start();
    Axios.patch(`/api/v2/users/logout?token=${user.accessToken}`)
      .then(() => {
        setGoodBye(true);
        cookie.remove("token");
        window.localStorage.setItem("logout", Date.now().toString());
        setToken(undefined);
        nprogress.done();
      })
      .then(() => {
        revalidateProfile();
        Router.push("/");
      });
  };
  const tabs =
    user !== null && user?.role === 0
      ? tabsUser.concat(tabGlobal)
      : tabsUser.concat(tabsAdmin);
  const active = Router.query.tab;
  const tabsIndexActive = tabs.findIndex(({ tab }) => tab === active);

  const DashboardNav: React.FC<{}> = () => {
    return (
      <div
        style={{
          width: "100vw",
          color: "inherit",
          display: "table",
          borderCollapse: "collapse",
          height: 40
        }}
      >
        <div style={{ display: "table-row", color: "inherit" }}>
          {tabs.map(({ tab }) => (
            <Link key={tab} href={`/etc/dashboard?tab=${tab}`}>
              <a
                style={{
                  display: "table-cell",
                  color: "inherit",
                  border: "1px solid",
                  borderTop: "none",
                  width: `${100 / (tabs.length + 1)}%`,
                  textAlign: "center",
                  verticalAlign: "middle"
                }}
              >
                {tab}
              </a>
            </Link>
          ))}
          <span
            onClick={logoutHandler}
            title="Logout ?"
            style={{
              display: "table-cell",
              border: "1px solid",
              borderTop: "none",
              cursor: "pointer",
              textAlign: "center",
              verticalAlign: "middle"
            }}
          >
            Logout
          </span>
        </div>
      </div>
    );
  };
  const { setNavigation, setAddNavigation } = useSubpageContext();
  useEffect(() => {
    setNavigation(DashboardNav);
    setAddNavigation(true);
    return () => {
      setAddNavigation(false);
    };
  }, []);

  const Element = () =>
    tabsIndexActive > -1 ? (
      tabs[tabsIndexActive].element
    ) : (
      <MemoizedDashboardAccount />
    );

  return goodBye ? (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "10rem",
        fontWeight: "bold"
      }}
    >
      Bye bye...
    </div>
  ) : (
    Element()
  );
};

export default Admin;
