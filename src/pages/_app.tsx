import { memo } from "react";
import { NextPage, NextPageContext, NextComponentType } from "next";
import { NextRouter } from "next/router";
import { AppProvider } from "../lib/context";
import { Accordion } from "../components/Utils/Accordion";
import { PageTransition } from "next-page-transitions";
import Footer from "../components/Utils/Footer";
import NProgress from "../components/Utils/Loader/NProgress";

interface AppProps {
  Component: NextComponentType;
  pageProps: NextPageContext;
  router: NextRouter;
}

const MemoizedFooter = memo(Footer);
const MemoizedAccordion = memo(Accordion);
const MemoizedPageTransition = memo(PageTransition);
const MemoizedNProgress = memo(NProgress);

const MyApp: NextPage<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <AppProvider>
      <MemoizedPageTransition
        timeout={300}
        classNames="accordion-container"
        tag="main"
        skipInitialTransition={true}
      >
        <Component {...pageProps} key={router.asPath} />
      </MemoizedPageTransition>
      <MemoizedAccordion />
      <MemoizedFooter />
      <MemoizedNProgress />

      <style jsx global>{`
        * {
          box-sizing: border-box;
          outline: none;
          scroll-behavior: smooth;

          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        body {
          margin: 0;
          padding: 0;

          font-family: "Helvetica Neue", sans-serif;
          background-color: #f5f5f5;
          color: #0a0a0a;
          transition: background-color cubic-bezier(1, 0, 0, 1),
            color cubic-bezier(1, 0, 0, 1);
        }

        a {
          /*text-decoration: none;*/
          /*color: currentColor;*/

          touch-action: none;
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
        }

        button {
          color: currentColor;
        }

        label {
          cursor: inherit;
        }

        #__next,
        main {
          background-color: inherit;
          color: inherit;
        }

        .theme-white {
          background-color: #f5f5f5;
          color: #000000;
        }
        .theme-black {
          background-color: #101010;
          color: #e5e5e5;
        }
        .theme-cyan {
          background-color: #00ffff;
          color: #ff0000;
        }
        .theme-magenta {
          background-color: #ff1493;
          color: #0ae162;
        }
        .theme-yellow {
          background-color: #ffff00;
          color: #0a0af5;
        }
        .accordion-container-enter,
        .accordion-container-enter-active {
          opacity: 0;
        }
        .accordion-container-enter-done {
          opacity: 1;
          transition: 300ms cubic-bezier(1, 0, 0.5, 1);
        }
        .accordion-container-exit-active,
        .accordion-container-exit-done {
          opacity: 0;
        }

        @keyframes autofill {
          0%,
          100% {
            color: currentColor;
            background: transparent;
          }
        }

        input:-webkit-autofill {
          animation-delay: 1s; /* Safari support - any positive time runs instantly */
          animation-name: autofill;
          animation-fill-mode: both;
          font-size: 24px !important;
        }

        @media (prefers-color-scheme: dark) {
          body {
            background-color: #252525;
            color: #d4d4d4;
          }
          a {
            color: lime;
          }
          .theme-white {
            background-color: #d8d8d8;
            color: #1d1d1d;
          }
          .theme-black {
            background-color: #080808;
            color: #ededed;
          }
          .theme-yellow {
            background-color: #d0d000;
            color: #2525f5;
          }
          .theme-magenta {
            background-color: #c10e6f;
            color: #34e786;
          }
          .theme-cyan {
            background-color: #00cece;
            color: #f52727;
          }
        }
        @media (prefers-color-scheme: light) {
          body {
            background-color: #f5f5f5;
            color: #0a0a0a;
          }
          a {
            color: red;
          }
          .theme-white {
            background-color: #f5f5f5;
            color: #000000;
          }
          .theme-black {
            background-color: #101010;
            color: #e5e5e5;
          }
          .theme-cyan {
            background-color: #00ffff;
            color: #ff0000;
          }
          .theme-magenta {
            background-color: #ff1493;
            color: #0ae162;
          }
          .theme-yellow {
            background-color: #ffff00;
            color: #0a0af5;
          }
        }
      `}</style>
    </AppProvider>
  );
};

export default MyApp;
