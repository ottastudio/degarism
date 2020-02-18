import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import nextCookie from "next-cookies";
import Axios from "axios";

import useRequest from "../../../lib/hooks/useRequest";
import { withAuthSync } from "../../../components/__HOCs/withAuthSync";
import { AccordionContainer } from "../../../components/Utils/Accordion";
import { useUrlOnServer } from "../../../lib/hooks/useUrlOnServer";
import { TokenType } from "../../../lib/context/AuthContext";

interface DashboardProps {
  token: TokenType;
  user: any;
}

const Admin = dynamic(() => import("../../../components/Etc/Admin"), {
  ssr: false,
  loading: () => <div style={{ padding: 20 }}>Loading...</div>
});
const Dashboard: NextPage<DashboardProps> = ({ user, token }) => {
  const { data } = useRequest(
    {
      url: "/api/v2/users/profile",
      headers: { Authorization: JSON.stringify({ token }) }
    },
    { initialData: user }
  );

  return (
    <AccordionContainer>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Admin user={data.profile} />
    </AccordionContainer>
  );
};

Dashboard.getInitialProps = async ctx => {
  const { BASE_URL } = await useUrlOnServer(ctx);
  const { token } = nextCookie(ctx);

  try {
    const resUserProfile = await Axios.get(`${BASE_URL}/api/v2/users/profile`, {
      withCredentials: true,
      headers: {
        Authorization: JSON.stringify({ token })
      }
    });
    return { token: token, user: resUserProfile.data };
  } catch (error) {
    return { token: undefined, user: null };
  }
};

export default withAuthSync(Dashboard);
