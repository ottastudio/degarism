import { style } from "typestyle";

export const inputStyle = style({
  $debugName: "text-input",
  width: "100%",
  border: "none",
  height: 40,
  background: "none",
  borderBottom: "1px solid",
  padding: "0px 10px",
  fontSize: "inherit",
  color: "currentColor"
});

export const buttonStyle = style({
  $debugName: "button-submit",
  background: "none",
  border: "1px solid",
  height: 40,
  fontSize: "inherit",
  marginTop: "1rem",
  color: "currentColor",
  cursor: "pointer",
  marginRight: 10
});
