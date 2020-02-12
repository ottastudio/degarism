import Document, { Html, Head, Main, NextScript } from "next/document";
import { getStyles } from "typestyle";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          <style>{getStyles()}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
