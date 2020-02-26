import { NextPage } from "next";
import { DocumentContext } from "next/document";
import { AccordionContainer } from "../../components/Utils/Accordion";
import Head from "next/head";
import Router from "next/router";
import nextCookie from "next-cookies";

import LoginForm from "../../components/Etc/Account/loginForm";
import RegisterForm from "../../components/Etc/Account/registerForm";

const Account: NextPage<{}> = () => {
  return (
    <AccordionContainer>
      <Head>
        <title>Account</title>
      </Head>
      <div style={{ display: "flex", flexWrap: "wrap", paddingTop: 58 }}>
        <LoginForm />
        <RegisterForm />
      </div>
    </AccordionContainer>
  );
};

Account.getInitialProps = async (ctx: DocumentContext) => {
  const { token } = nextCookie(ctx);
  try {
    if (token) {
      if (typeof window === "undefined") {
        ctx.res?.writeHead(302, { Location: "/etc/dashboard" });
      } else {
        Router.push("/etc/dashboard");
      }
    }
    return { token };
  } catch (error) {
    throw error;
  }
};

export default Account;
