import Router from "next/router";
import cookie from "js-cookie";

export const loginHandler = (token: string) => {
  cookie.set("token", token, { expires: 1 });
  Router.push("/etc/dashboard");
};
