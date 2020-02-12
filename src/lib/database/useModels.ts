import { typedModel } from "ts-mongoose";
import site_schema from "./schemas/site_schema";

export const useModels = async () => {
  let Site: any;

  try {
    Site = await typedModel("Site");
  } catch (_error) {
    Site = await typedModel("Site", site_schema);
  }

  return { Site };
};
