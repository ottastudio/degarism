import Head from "next/head";
import { NextPage } from "next";

import { useAccordionContext } from "../../lib/context/AccordionContext";
import { AccordionContainer } from "../../components/Utils/Accordion";

import Card from "../../components/Utils/Card";

type sectionsType = Array<{
  label: string;
  href: string;
  asPath?: string | undefined;
}>;

const Etc: NextPage<{}> = () => {
  const {
    data: {
      titles: { TITLE_ETC }
    }
  } = useAccordionContext();

  const userSections: sectionsType = [
    { label: "Login", href: "/etc/login", asPath: undefined },
    { label: "Dashboard", href: "/etc/dashboard", asPath: undefined }
  ];
  const etcSections: sectionsType = [
    { label: "FAQs", href: "/etc/faq", asPath: undefined }
  ];

  const cards = etcSections.concat(userSections);
  return (
    <AccordionContainer>
      <Head>
        <title>{TITLE_ETC}</title>
      </Head>
      {cards.map(({ label, href, asPath }, i: number) => (
        <Card key={i} href={href} asPath={asPath} label={label} />
      ))}
    </AccordionContainer>
  );
};

export default Etc;
