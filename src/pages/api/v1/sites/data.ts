import { NextApiRequest, NextApiResponse } from "next";
import { withDB } from "../../../../lib/database";
import { useModels } from "../../../../lib/database/useModels";

const siteData = async (_req: NextApiRequest, res: NextApiResponse) => {
  const { Site } = await useModels();

  try {
    const response = await Site.find({});
    const siteData = await response;
    res.status(200).json({ success: true, siteData });
    res.end();
  } catch (error) {
    res.status(400).end();
  }
};

export default withDB(siteData);
