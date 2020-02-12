import Head from "next/head";
import { NextPage } from "next";

import { useAccordionContext } from "../../lib/context/AccordionContext";
import { AccordionContainer } from "../../components/Utils/Accordion";

const Etc: NextPage<{}> = () => {
  const {
    data: {
      titles: { TITLE_ETC }
    }
  } = useAccordionContext();
  return (
    <AccordionContainer>
      <Head>
        <title>{TITLE_ETC}</title>
      </Head>
      Etc
    </AccordionContainer>
  );
};

export default Etc;
