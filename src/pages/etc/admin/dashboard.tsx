import { NextPage } from "next";
import { AccordionContainer } from "../../../components/Utils/Accordion";
import dynamic from "next/dynamic";
import Head from "next/head";

const Admin = dynamic(() => import("../../../components/Etc/Admin"), {
  ssr: false,
  loading: () => <div style={{ padding: 20 }}>Loading...</div>
});

const Dashboard: NextPage<{}> = () => {
  return (
    <AccordionContainer>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <Admin />
    </AccordionContainer>
  );
};

export default Dashboard;
