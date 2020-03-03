import Head from "next/head";
import { NextPage } from "next";
import { DocumentContext } from "next/document";
import { verify, VerifyErrors } from "jsonwebtoken";
import nextCookie from "next-cookies";

import { useAccordionContext } from "../../lib/context/AccordionContext";
import { AccordionContainer } from "../../components/Utils/Accordion";

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

const Etc: NextPage<{ auth: boolean }> = ({ auth }) => {
  const {
    data: {
      titles: { TITLE_ETC }
    }
  } = useAccordionContext();

  const cards = auth
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
  let auth: boolean = false;

  try {
    verify(
      token as string,
      process.env.SESSION_SECRET as string,
      (err: VerifyErrors) => {
        if (err) {
          auth = false;
        } else {
          auth = true;
        }
      }
    );
  } catch (error) {
    auth = false;
  }

  return { auth };
};

export default Etc;
