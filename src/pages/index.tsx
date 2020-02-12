import { NextPage } from "next";
import Head from "next/head";

import useRequest from "../lib/hooks/useRequest";
import { useAccordionContext } from "../lib/context/AccordionContext";
import { AccordionContainer } from "../components/Utils/Accordion";

const Index: NextPage<{}> = () => {
  const {
    data: {
      titles: { TITLE_INDEX }
    }
  } = useAccordionContext();

  const { data: siteData } = useRequest(
    { url: "/api/v1/sites/data" },
    { revalidateOnFocus: true }
  );
  return (
    <AccordionContainer>
      <Head>
        <title>{TITLE_INDEX}</title>
      </Head>
      <pre>{JSON.stringify(siteData, null, 2)}</pre>
      Index
    </AccordionContainer>
  );
};

export default Index;
