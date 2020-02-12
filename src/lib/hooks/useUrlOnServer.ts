import { NextPageContext } from "next";

export const useUrlOnServer = async (ctx: NextPageContext) => {
  const { req } = ctx;
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const url = process.browser ? window.location.host : req?.headers.host;
  const BASE_URL: string = `${protocol}://${url}`;

  return { BASE_URL };
};
