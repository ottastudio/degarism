import { style, media } from "typestyle";
import { useAccordionContext } from "../../../lib/context/AccordionContext";

const AccordionContainer: React.FC<{}> = ({ children }) => {
  const {
    data: {
      actives: { ACTIVE_INDEX, ACTIVE_TYPEFACES }
    }
  } = useAccordionContext();

  const containerStyle = style(
    {
      $debugName: "accordion-container",
      paddingTop: ACTIVE_INDEX ? 59 : ACTIVE_TYPEFACES ? 118 : 177,
      paddingBottom: 40,
      position: "relative",
      minHeight: "100vh"
    },
    media({ maxWidth: 767 }, { paddingBottom: 0 })
  );
  return <div className={containerStyle}>{children}</div>;
};

export default AccordionContainer;
