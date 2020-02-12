import { NextPage } from "next";
import { AccordionContainer } from "../../components/Utils/Accordion";
import Head from "next/head";

const Faq: NextPage<{}> = () => {
  return (
    <AccordionContainer>
      <Head>
        <title>FAQs</title>
      </Head>
      Faq
    </AccordionContainer>
  );
};

export default Faq;
