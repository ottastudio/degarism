import Head from "next/head";
import { NextPage } from "next";
import { withAuthSync } from "../../../components/__HOCs/withAuthSync";
import { AccordionContainer } from "../../../components/Utils/Accordion";
import { IUserDocument } from "../../../../global";

import useRequest from "../../../lib/hooks/useRequest";
import dynamic from "next/dynamic";

const Admin = dynamic(() => import("../../../components/Etc/Dashboard"), {
  ssr: false
});

const Dashboard: NextPage<{
  token: string | undefined;
  user: { success: boolean; profile: IUserDocument };
}> = ({ token, user }) => {
  const accessToken = token?.replace(/"/g, "");

  const { data: userProfile, revalidate: revalidateProfile } = useRequest(
    {
      url: "/api/v3/user/profile",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    },
    { initialData: user }
  );

  if (!userProfile) return <div>Loading...</div>;
  console.log(userProfile);
  return (
    <AccordionContainer>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div style={{ height: 98 }} />
      <Admin user={userProfile.profile} revalidateProfile={revalidateProfile} />
    </AccordionContainer>
  );
};

export default withAuthSync(Dashboard);
