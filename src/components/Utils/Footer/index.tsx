import React from "react";
import { style, media } from "typestyle";

const footerClassName = style(
  {
    $debugName: "footer",
    position: "fixed",
    right: 0,
    bottom: 0,
    left: 0,
    height: 40,
    padding: "0px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 13,
    borderTop: "1px solid",
    zIndex: 1001,
    backgroundColor: "inherit",
    color: "inherit"
  },
  media({ maxWidth: 767 }, { display: "none" })
);

const aStyle = style({
  textDecoration: "none",
  color: "currentColor",
  $nest: {
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

const Footer: React.FC<{}> = () => {
  return (
    <footer className={footerClassName}>
      <div>&copy;Degarism Studio. All rights reserved.</div>
      <div>
        Design and built by{" "}
        <a
          className={aStyle}
          href="https://ottastudio.com"
          target="_blank"
          rel="noopener"
        >
          Otta &amp; Studio's
        </a>
      </div>
    </footer>
  );
};

export default Footer;
