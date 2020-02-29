import { DocumentContext } from "next/document";
import React from "react";
import Router from "next/router";
import nextCookie from "next-cookies";
import { verify, VerifyErrors } from "jsonwebtoken";

type WrapperProps = JSX.IntrinsicAttributes & {
  children?: React.ReactNode;
};

export const withAuthCheck = (WrappedComponent: any) => {
  const Wrapper = (props: WrapperProps) => {
    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx: DocumentContext) => {
    const { token } = nextCookie(ctx);

    verify(
      token as string,
      process.env.SESSION_SECRET as string,
      (err: VerifyErrors) => {
        if (err) {
          return;
        } else {
          if (typeof window === "undefined") {
            ctx.res?.writeHead(302, { Location: "/etc/dashboard" }).end();
          } else {
            Router.push("/etc/dashboard");
          }
        }
      }
    );

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps, token };
  };

  return Wrapper;
};
