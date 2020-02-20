import { style, media } from "typestyle";

const accordionStyle = {
  overflow: "hidden",
  borderBottom: "2px solid currentColor",
  padding: "5px 22px 0px 20px",
  height: 60,
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "5.5rem",
  fontWeight: 800,
  textDecoration: "none",
  transition: "top 300ms cubic-bezier(1, 0, 0, 1)",
  zIndex: 1000
};
const accordionStyleMobile = {
  padding: "0px 5px",
  fontSize: "2.5rem"
};
export const indexActive = (active: boolean) =>
  style(
    accordionStyle,
    {
      $debugName: "accordion-index",
      position: "fixed",
      textTransform: "capitalize",
      top: active ? 0 : 0,
      mixBlendMode: active ? "difference" : "normal",
      backgroundColor: active ? "#000000" : "inherit",
      color: active ? "#ffffff" : "currentColor"
    },
    media({ maxWidth: 767 }, { ...accordionStyleMobile })
  );
export const typefacesActive = (active: boolean, etc: boolean) =>
  style(
    accordionStyle,
    {
      $debugName: "accordion-typefaces",
      position: "fixed",
      textTransform: "capitalize",
      top: active || etc ? 58 : "calc(100vh - 156px)",
      mixBlendMode: active ? "difference" : "normal",
      backgroundColor: active ? "#000000" : "inherit",
      color: active ? "#ffffff" : "currentColor",
      borderTop: active ? "2px solid #000000" : "2px solid currentColor"
    },
    media(
      { maxWidth: 767 },
      {
        top: active || etc ? 58 : "calc(100vh - 116px)",
        ...accordionStyleMobile
      }
    )
  );
export const etcActive = (active: boolean) =>
  style(
    accordionStyle,
    {
      $debugName: "accordion-etc",
      position: "fixed",
      textTransform: "capitalize",
      top: active ? 116 : "calc(100vh - 98px)",
      mixBlendMode: active ? "difference" : "normal",
      backgroundColor: active ? "#000000" : "inherit",
      color: active ? "#ffffff" : "currentColor",
      borderTop: active ? "2px solid #000000" : "2px solid currentColor"
    },
    media(
      { maxWidth: 767 },
      {
        top: active ? 116 : "calc(100vh - 58px)",
        ...accordionStyleMobile
      }
    )
  );

const spanLabel = {
  right: 22,
  top: "50%",
  width: 14,
  height: 14,
  border: "1px solid",
  borderRadius: "100%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transform: "translateY(-50%)",
  transition: `background-color 300ms cubic-bezier(1,0,0,1)`
};
export const labelIndex = (active: boolean) =>
  style(
    spanLabel,
    {
      $debugName: "accordion-label",
      position: "absolute",
      backgroundColor: active ? "currentColor" : "transparent"
    },
    media({ maxWidth: 767 }, { right: 12 })
  );
export const labelTypefaces = (active: boolean) =>
  style(
    spanLabel,
    {
      $debugName: "accordion-label",
      position: "absolute",
      backgroundColor: active ? "currentColor" : "transparent"
    },
    media({ maxWidth: 767 }, { right: 12 })
  );
export const labelEtc = (active: boolean) =>
  style(
    spanLabel,
    {
      $debugName: "accordion-label",
      position: "absolute",
      backgroundColor: active ? "currentColor" : "transparent"
    },
    media({ maxWidth: 767 }, { right: 12 })
  );
