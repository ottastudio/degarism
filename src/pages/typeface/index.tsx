import Head from "next/head";
import { NextPage } from "next";

import { useAccordionContext } from "../../lib/context/AccordionContext";
import { AccordionContainer } from "../../components/Utils/Accordion";
import CardBlock from "../../components/Utils/Card";
import typefaceDummy from "../../../typefaces.json";

const Typeface: NextPage<{}> = () => {
  const {
    data: {
      titles: { TITLE_TYPEFACES }
    }
  } = useAccordionContext();
  return (
    <AccordionContainer>
      <Head>
        <title>{TITLE_TYPEFACES}</title>
      </Head>
      <CardBlock items={typefaceDummy} />
    </AccordionContainer>
  );
};

export default Typeface;
