import { NextPage } from "next";
import { AccordionContainer } from "../../components/Utils/Accordion";
import { style, media } from "typestyle";
import Head from "next/head";
import dynamic from "next/dynamic";
import Axios from "axios";

import useRequest from "../../lib/hooks/useRequest";
import { useUrlOnServer } from "../../lib/hooks/useUrlOnServer";
import { FaqsType } from "../../lib/interfaces/sites";

const FaqCard = dynamic(() => import("../../components/Etc/Faq/faqCards"), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

const api = "/api/v1/sites/faq";

const Faq: NextPage<{
  initialData: {
    success: boolean;
    faqs: FaqsType;
  };
}> = ({ initialData }) => {
  const { data: docs } = useRequest(
    { url: "/api/v1/sites/faq" },
    { initialData, revalidateOnFocus: true }
  );

  const divStyle = style(
    {
      $debugName: "faq-title-big",
      fontSize: "13rem",
      fontWeight: "bold",
      padding: "0rem 0.5rem 1rem 0.5rem",
      lineHeight: 0.9,
      userSelect: "none",
      overflow: "hidden"
    },
    media(
      { maxWidth: 767 },
      {
        fontSize: "4.25rem",
        padding: 5,
        marginBottom: "2.5rem"
      }
    )
  );

  return (
    <AccordionContainer>
      <Head>
        <title>FAQs</title>
      </Head>
      <div className={divStyle}>Frequently Asking Questions.</div>
      <FaqCard faqs={docs?.faqs as FaqsType} />
    </AccordionContainer>
  );
};

Faq.getInitialProps = async ctx => {
  const { BASE_URL } = await useUrlOnServer(ctx);

  const response = await Axios.get(`${BASE_URL}${api}`);
  const result = await response.data;
  return { initialData: result };
};

export default Faq;
