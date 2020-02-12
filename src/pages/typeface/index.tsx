import Head from "next/head";
import { NextPage } from "next";

import { useAccordionContext } from "../../lib/context/AccordionContext";
import { AccordionContainer } from "../../components/Utils/Accordion";

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
      Typeface
    </AccordionContainer>
  );
};

export default Typeface;
