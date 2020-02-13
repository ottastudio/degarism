import { typedModel } from "ts-mongoose";
import site_schema from "./schemas/site_schema";
import faq_schema from "./schemas/faq_schema";

export const useModels = async () => {
  let Site: any;
  let Faq: any;

  try {
    Site = await typedModel("Site");
    Faq = await typedModel("Faq");
  } catch (_error) {
    Site = await typedModel("Site", site_schema);
    Faq = await typedModel("Faq", faq_schema);
  }

  return { Site, Faq };
};
