import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  FC
} from "react";
import { useAccordionContext } from "../AccordionContext";
import { style } from "typestyle";

export interface SubpageContextProps {
  addNavigation: boolean;
  setAddNavigation: Dispatch<SetStateAction<boolean>>;
  navigation: FC<{}>;
  setNavigation: Dispatch<SetStateAction<FC<{}>>>;
}

const Test: React.FC<{}> = () => <div>Test</div>;

export const SubPageContext = createContext<SubpageContextProps>({
  addNavigation: false,
  setAddNavigation: () => {},
  navigation: Test,
  setNavigation: () => {}
});
export const SubpageContextProvider: React.FC<{}> = ({ children }) => {
  const {
    data: {
      actives: { ACTIVE_INDEX, ACTIVE_TYPEFACES }
    }
  } = useAccordionContext();
  const [navigation, setNavigation] = useState<any>();
  const [addNavigation, setAddNavigation] = useState(false);

  const navigationStyle = style({
    $debugName: "conditional-navigation",
    position: "fixed",
    top: ACTIVE_INDEX ? 60 : ACTIVE_TYPEFACES ? 118 : 176,
    zIndex: 999,
    mixBlendMode: "difference",
    color: "#ffffff"
  });
  return (
    <SubPageContext.Provider
      value={{ navigation, setNavigation, setAddNavigation, addNavigation }}
    >
      {addNavigation ? (
        <nav className={navigationStyle}>{navigation}</nav>
      ) : null}
      {children}
    </SubPageContext.Provider>
  );
};
export const SubpageContextConsumer = SubPageContext.Consumer;
export const useSubpageContext = () => useContext(SubPageContext);
