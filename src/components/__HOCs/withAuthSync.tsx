import { DocumentContext } from "next/document";
import React, { useEffect } from "react";
import Router from "next/router";
import nextCookie from "next-cookies";

type WrapperProps = JSX.IntrinsicAttributes & {
  children?: React.ReactNode;
};

export const withAuthSync = (WrappedComponent: any) => {
  const Wrapper = (props: WrapperProps) => {
    const syncLogout = (event: StorageEvent) => {
      if (event.key === "logout") {
        Router.push("/");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);
      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx: DocumentContext) => {
    const { token } = nextCookie(ctx);
    if (!token) {
      if (typeof window === "undefined") {
        ctx.res?.writeHead(302, { Location: "/etc/login" }).end();
      } else {
        Router.push("/etc/login");
      }
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps, token };
  };

  return Wrapper;
};
