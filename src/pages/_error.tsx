import { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";

import { useCountDown } from "../lib/hooks/useCountDown";
import { AccordionContainer } from "../components/Utils/Accordion";

const Error: NextPage<{ statusCode: number | undefined }> = ({
  statusCode
}) => {
  const messages = statusCode
    ? statusCode === 404
      ? `${statusCode} → Page not found.`
      : `${statusCode} → Server error.`
    : "Client error.";

  const { counter } = useCountDown(10);
  counter < 1 ? Router.push("/") : null;

  return (
    <AccordionContainer>
      <Head>
        <title>{messages}</title>
      </Head>
      <p>
        <b>{messages}</b>
        <br />
        <small>Will be redirect to Index page in {counter} second(s)</small>
      </p>
    </AccordionContainer>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
