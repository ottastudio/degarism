import { NextPage } from "next";
import { AccordionContainer } from "../../components/Utils/Accordion";
import { style, media } from "typestyle";
import Head from "next/head";
import Axios from "axios";
import dynamic from "next/dynamic";

import useRequest from "../../lib/hooks/useRequest";
import { useUrlOnServer } from "../../lib/hooks/useUrlOnServer";

const FaqCard = dynamic(() => import("../../components/Etc/Faq/faqCards"));

const api = "/api/v1/sites/faq";

export type FaqType = {
  _id: string;
  topic: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
};

export type FaqsType = [FaqType];

const Faq: NextPage<{
  initialData: {
    success: boolean;
    faqs: FaqsType;
  };
}> = ({ initialData }) => {
  const { data: docs } = useRequest(
    { url: "/api/v1/sites/faq" },
    { initialData }
  );

  const payments = docs?.faqs.filter(({ topic }) => topic === "Payment");
  const licenses = docs?.faqs.filter(({ topic }) => topic === "Licenses");
  const electronicPublications = docs?.faqs.filter(
    ({ topic }) => topic === "Electronic publications"
  );
  const customFont = docs?.faqs.filter(({ topic }) => topic === "Custom Font");
  const installation = docs?.faqs.filter(
    ({ topic }) => topic === "Installation"
  );
  const discountCharity = docs?.faqs.filter(
    ({ topic }) => topic === "Discount and Charity"
  );

  const divStyle = style(
    {
      $debugName: "faq-title-big",
      fontSize: "13rem",
      fontWeight: "bold",
      padding: "0rem 0.5rem 15rem 0.5rem",
      lineHeight: 0.9,
      userSelect: "none",
      overflow: "hidden",
      borderBottom: "1px solid"
    },
    media(
      { maxWidth: 767 },
      {
        fontSize: "4rem",
        padding: 5,
        borderBottom: "none",
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
      <FaqCard items={payments} title="Payment" />
      <FaqCard items={licenses} title="Licenses" />
      <FaqCard items={electronicPublications} title="Electronic Publications" />
      <FaqCard items={customFont} title="Custom Font" />
      <FaqCard items={installation} title="Installation" />
      <FaqCard items={discountCharity} title="Discount and Charity" />
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
