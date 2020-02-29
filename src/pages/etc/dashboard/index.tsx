import Head from "next/head";
import { NextPage } from "next";
import { withAuthSync } from "../../../components/__HOCs/withAuthSync";
import { AccordionContainer } from "../../../components/Utils/Accordion";

const Dashboard: NextPage<{ token: string | undefined }> = ({ token }) => {
  console.log("Dashboard >", token);

  return (
    <AccordionContainer>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div style={{ height: 98 }} />
    </AccordionContainer>
  );
};

export default withAuthSync(Dashboard);
