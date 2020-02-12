import { useEffect, useState } from "react";
import { accordionData } from "../misc";

export const useDocTitle = () => {
  const [title, setTitle] = useState("Loading...");
  const {
    titles: { TITLE_INDEX, TITLE_TYPEFACES, TITLE_ETC }
  } = accordionData;

  useEffect(() => {
    const getTitle = setTimeout(() => {
      if (document.title !== undefined) {
        if (
          document.title !== TITLE_INDEX &&
          document.title !== TITLE_TYPEFACES &&
          document.title !== TITLE_ETC
        ) {
          setTitle(document.title);
        } else {
          setTitle("Loading...");
        }
      }
    }, 1000);
    return () => clearTimeout(getTitle);
  });

  return { title };
};
