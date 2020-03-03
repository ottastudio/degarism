import React from "react";
import NProgress from "nprogress";
import Router from "next/router";

let timeout: any;

const originalScroll =
  typeof window !== "undefined" &&
  window?.getComputedStyle(document.body).overflow;

const start = () => {
  document.body.style.overflow = "hidden";
  timeout = setTimeout(NProgress.start, 100);
};
const done = () => {
  clearTimeout(timeout);
  NProgress.done();
  document.body.style.overflow = originalScroll as string;
};

Router.events.on("routeChangeStart", () => start());
Router.events.on("routeChangeComplete", () => done());
Router.events.on("routeChangeError", () => done());

export default () => (
  <style jsx global>{`
    #nprogress {
      pointer-events: none;
      z-index: 1200;

      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      overflow: hidden;
      mix-blend-mode: difference;

      height: 2px;
      background-color: #000000;
    }
    #nprogress .bar {
      width: 100%;
      height: 100%;
    }
    #nprogress .bar .peg {
      background-color: white;
      height: 100%;
    }

    #nprogress .spinner {
      display: block;
      position: fixed;
      top: 18px;
      right: 18px;
      color: #ffffff;
      mix-blend-mode: difference;
    }
    #nprogress .spinner .spinner-icon {
      width: 22px;
      height: 22px;
      box-sizing: border-box;
      border-radius: 100%;
      border: 2px solid transparent;
      border-top-color: inherit;
      border-right-color: inherit;

      animation: nprogress-spinner 500ms linear infinite;
    }

    @keyframes nprogress-spinner {
      0% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(180deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    @media screen and (max-width: 767px) {
      #nprogress .spinner {
        right: 8px;
      }
    }
  `}</style>
);
