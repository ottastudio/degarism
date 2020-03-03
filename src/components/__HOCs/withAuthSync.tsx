import Axios from "axios";
import Router from "next/router";
import nextCookie from "next-cookies";
import { DocumentContext } from "next/document";
import { verify, VerifyErrors } from "jsonwebtoken";
import { useEffect, ReactNode } from "react";
import { useUrlOnServer } from "../../lib/hooks/useUrlOnServer";

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
    const { BASE_URL } = await useUrlOnServer(ctx);

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
              return;
            } else {
              Router.push("/etc/account");
              return;
            }
          } else {
            return;
          }
        }
      );
    }

    const accessToken = token.replace(/"/g, "");
    const userProfile = await Axios.get(`${BASE_URL}/api/v3/user/profile`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const profile = userProfile.data;

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token, profile };
  };

  return Wrapper;
};
