import { useAccordionContext } from "../../../lib/context/AccordionContext";
import { Fragment } from "react";
import Link from "next/link";
import {
  indexActive,
  labelIndex,
  typefacesActive,
  labelTypefaces,
  etcActive,
  labelEtc
} from "./AccordionStyle";

const AccordionLink: React.FC<{}> = () => {
  const {
    data: {
      labels: { LABEL_INDEX, LABEL_TYPEFACES, LABEL_ETC },
      actives: { ACTIVE_INDEX, ACTIVE_TYPEFACES, ACTIVE_ETC }
    }
  } = useAccordionContext();

  return (
    <Fragment>
      <Link href="/">
        <a className={indexActive(ACTIVE_INDEX)}>
          <span>{LABEL_INDEX}</span>
          <span className={labelIndex(ACTIVE_INDEX)} />
        </a>
      </Link>
      <Link href="/typeface">
        <a className={typefacesActive(ACTIVE_TYPEFACES, ACTIVE_ETC)}>
          <span>{LABEL_TYPEFACES}</span>
          <span className={labelTypefaces(ACTIVE_TYPEFACES)} />
        </a>
      </Link>
      <Link href="/etc">
        <a className={etcActive(ACTIVE_ETC)}>
          <span>{LABEL_ETC}</span>
          <span className={labelEtc(ACTIVE_ETC)} />
        </a>
      </Link>
    </Fragment>
  );
};

export default AccordionLink;
