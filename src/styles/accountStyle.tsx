import { style, media } from "typestyle";

export const formStyle = style(
  {
    $debugName: "form",
    width: "100%",
    maxWidth: 360,
    padding: "20px 0px 20px 20px",
    position: "relative",
    display: "inline-block"
  },
  media({ maxWidth: 767 }, { width: "100%", maxWidth: "100%", padding: 5 })
);

export const buttonStyle = style({
  $debugName: "submit-button",
  background: "none",
  color: "currentColor",
  border: "none",
  padding: 0,
  margin: "10px 0px",
  fontSize: "2.5rem",
  cursor: "pointer",
  $nest: {
    "&:hover": {
      textDecoration: "underline"
    }
  }
});
