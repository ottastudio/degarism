import { AccordionContainer } from "../../components/Utils/Accordion";
import { useRouter } from "next/router";
import Head from "next/head";
import { NextPage } from "next";

const TypefaceDetail: NextPage<{}> = () => {
  const { query } = useRouter();
  return (
    <AccordionContainer>
      <Head>
        <title>{query.name}</title>
      </Head>
      <div style={{ paddingTop: 58, position: "relative" }}>
        <h1>{query.name}</h1>
      </div>
    </AccordionContainer>
  );
};

export default TypefaceDetail;
