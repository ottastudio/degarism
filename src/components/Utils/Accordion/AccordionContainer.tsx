import { style } from "typestyle";
import { useAccordionContext } from "../../../lib/context/AccordionContext";

const AccordionContainer: React.FC<{}> = ({ children }) => {
  const {
    data: {
      actives: { ACTIVE_INDEX, ACTIVE_TYPEFACES }
    }
  } = useAccordionContext();

  const containerStyle = style({
    $debugName: "accordion-container",
    paddingTop: ACTIVE_INDEX ? 59 : ACTIVE_TYPEFACES ? 118 : 177,
    position: "relative",
    minHeight: "100vh"
  });
  return <div className={containerStyle}>{children}</div>;
};

export default AccordionContainer;
