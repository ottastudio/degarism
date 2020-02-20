import { style, media } from "typestyle";
import { useAccordionContext } from "../../../lib/context/AccordionContext";
import { useSubpageContext } from "../../../lib/context/SubPageContext";

const AccordionContainer: React.FC<{}> = ({ children }) => {
  const {
    data: {
      actives: { ACTIVE_INDEX, ACTIVE_TYPEFACES }
    }
  } = useAccordionContext();
  const { addNavigation } = useSubpageContext();

  const containerStyle = style(
    {
      $debugName: "accordion-container",
      paddingTop: ACTIVE_INDEX ? 60 : ACTIVE_TYPEFACES ? 118 : 176,
      paddingBottom: ACTIVE_INDEX ? 156 : ACTIVE_TYPEFACES ? 98 : 40,
      position: "relative",
      minHeight: addNavigation ? "calc(100vh - 40px)" : "100vh"
    },
    media(
      { maxWidth: 767 },
      {
        paddingBottom: ACTIVE_INDEX ? 116 : ACTIVE_TYPEFACES ? 58 : 0,
        overflowX: "hidden"
      }
    )
  );
  return (
    <div id="accordion-container" className={containerStyle}>
      {children}
    </div>
  );
};

export default AccordionContainer;
