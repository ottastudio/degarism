import { NextPage } from "next";
import Head from "next/head";

import { useAccordionContext } from "../lib/context/AccordionContext";
import { AccordionContainer } from "../components/Utils/Accordion";
import CardBlock from "../components/Utils/Card";
import typefaceDummy from "../../typefaces.json";

const Index: NextPage<{}> = () => {
  const {
    data: {
      titles: { TITLE_INDEX }
    }
  } = useAccordionContext();

  return (
    <AccordionContainer>
      <Head>
        <title>{TITLE_INDEX}</title>
      </Head>
      <CardBlock items={typefaceDummy} />
    </AccordionContainer>
  );
};

export default Index;
