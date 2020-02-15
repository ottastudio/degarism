import { NextPage, NextPageContext, NextComponentType } from "next";
import { NextRouter } from "next/router";
import { AccordionProvider } from "../lib/context/AccordionContext";
import { Accordion } from "../components/Utils/Accordion";
import { PageTransition } from "next-page-transitions";
import Footer from "../components/Utils/Footer";

interface AppProps {
  Component: NextComponentType;
  pageProps: NextPageContext;
  router: NextRouter;
}

const MyApp: NextPage<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <AccordionProvider>
      <Accordion />
      <PageTransition
        timeout={300}
        classNames="accordion-container"
        tag="main"
        skipInitialTransition={true}
      >
        <Component {...pageProps} key={router.asPath} />
      </PageTransition>
      <Footer />

      <style jsx global>{`
        * {
          box-sizing: border-box;
          outline: none;

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

          scroll-behavior: smooth;
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
        .accordion-container-enter {
          opacity: 0;
        }
        .accordion-container-enter-active,
        .accordion-container-enter-done {
          opacity: 1;
          transition: opacity 300ms cubic-bezier(1, 0, 0, 1);
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
    </AccordionProvider>
  );
};

export default MyApp;
