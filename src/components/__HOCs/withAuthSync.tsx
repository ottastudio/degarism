import { DocumentContext } from "next/document";
import { verify, VerifyErrors } from "jsonwebtoken";
import { useEffect, ReactNode } from "react";
import Router from "next/router";
import nextCookie from "next-cookies";

type WrapperProps = JSX.IntrinsicAttributes & {
  children?: ReactNode;
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
        ctx.res?.writeHead(302, { Location: "/etc/account" }).end();
        return;
      } else {
        Router.push("/etc/account");
        return;
      }
    } else {
      verify(
        token as string,
        process.env.SESSION_SECRET as string,
        (err: VerifyErrors) => {
          if (err) {
            if (typeof window === "undefined") {
              ctx.res?.writeHead(302, { Location: "/etc/account" }).end();
              console.log("Server token expired");
              return;
            } else {
              Router.push("/etc/account");
              console.log("Client token expired");
              return;
            }
          } else {
            return;
          }
        }
      );
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps, token };
  };

  return Wrapper;
};
