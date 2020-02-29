import { NextPage } from "next";
import Head from "next/head";

import { AccordionContainer } from "../../components/Utils/Accordion";
import { withAuthCheck } from "../../components/__HOCs/withAuthCheck";

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

export default withAuthCheck(Account);
