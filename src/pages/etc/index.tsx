import Head from "next/head";
import { NextPage } from "next";
import { DocumentContext } from "next/document";

import { useAccordionContext } from "../../lib/context/AccordionContext";
import { AccordionContainer } from "../../components/Utils/Accordion";

import nextCookie from "next-cookies";
import CardBlock from "../../components/Utils/Card";

type sectionsType = Array<{
  label: string;
  href: string;
  asPath?: string | undefined;
}>;

const authSection: sectionsType = [
  { label: "Dashboard", href: "/etc/dashboard", asPath: undefined }
];
const userSections: sectionsType = [
  { label: "Account", href: "/etc/account", asPath: undefined }
];
const etcSections: sectionsType = [
  { label: "FAQs", href: "/etc/faq", asPath: undefined }
];

const Etc: NextPage<{ token: string | undefined }> = ({ token }) => {
  const {
    data: {
      titles: { TITLE_ETC }
    }
  } = useAccordionContext();

  const cards = token
    ? etcSections.concat(authSection)
    : etcSections.concat(userSections);

  return (
    <AccordionContainer>
      <Head>
        <title>{TITLE_ETC}</title>
      </Head>
      <CardBlock items={cards} />
    </AccordionContainer>
  );
};

Etc.getInitialProps = async (ctx: DocumentContext) => {
  const { token } = nextCookie(ctx);
  return { token };
};

export default Etc;
