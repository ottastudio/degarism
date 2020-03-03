import { createContext, useContext } from "react";
import { usePathChecker } from "../../hooks/usePathChecker";
import { useDocTitle } from "../../hooks/useDocTitle";
import { SubpageContextProvider } from "../SubPageContext";
import {
  INDEX_SECTION,
  TYPEFACES_SECTION,
  ETC_SECTION,
  accordionData
} from "../../misc";

export type AccordionDataType = {
  titles: {
    TITLE_INDEX: string;
    TITLE_TYPEFACES: string;
    TITLE_ETC: string;
  };
  labels: {
    LABEL_INDEX: string;
    LABEL_TYPEFACES: string;
    LABEL_ETC: string;
  };
  actives: {
    ACTIVE_INDEX: boolean;
    ACTIVE_TYPEFACES: boolean;
    ACTIVE_ETC: boolean;
  };
};
export interface AccordionProps {
  data: AccordionDataType;
}

export const AccordionContext = createContext<AccordionProps>({
  data: {
    titles: { TITLE_INDEX: "", TITLE_TYPEFACES: "", TITLE_ETC: "" },
    labels: { LABEL_INDEX: "", LABEL_TYPEFACES: "", LABEL_ETC: "" },
    actives: { ACTIVE_INDEX: true, ACTIVE_TYPEFACES: false, ACTIVE_ETC: false }
  }
});
export const AccordionConsumer = AccordionContext.Consumer;
export const useAccordionContext = () => useContext(AccordionContext);

export const AccordionProvider: React.FC<{}> = ({ children }) => {
  const { title } = useDocTitle();

  const typefaceRoutes = ["/typeface/[name]"];
  const etcRoutes = ["/", "/typeface", "/typeface/[name]", "/etc"];
  const TYPEFACES_TITLE_SLUG = usePathChecker(typefaceRoutes);
  const ETC_TITLE_SLUG = usePathChecker(etcRoutes);

  const data: AccordionDataType = {
    titles: accordionData.titles,
    actives: {
      ACTIVE_INDEX: usePathChecker(INDEX_SECTION),
      ACTIVE_TYPEFACES: usePathChecker(TYPEFACES_SECTION),
      ACTIVE_ETC: usePathChecker(ETC_SECTION)
    },
    labels: {
      LABEL_INDEX: accordionData.titles.TITLE_INDEX,
      LABEL_TYPEFACES: TYPEFACES_TITLE_SLUG
        ? `☞${title.replace(/-/g, " ")}.`
        : accordionData.titles.TITLE_TYPEFACES,
      LABEL_ETC: ETC_TITLE_SLUG
        ? accordionData.titles.TITLE_ETC
        : `☞${title.replace(/-/g, " ")}.`
    }
  };

  return (
    <AccordionContext.Provider value={{ data }}>
      <SubpageContextProvider>{children}</SubpageContextProvider>
    </AccordionContext.Provider>
  );
};
