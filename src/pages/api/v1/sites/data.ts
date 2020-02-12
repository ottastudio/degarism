import { NextApiRequest, NextApiResponse } from "next";
import { withDB } from "../../../../lib/database";
import { useModels } from "../../../../lib/database/useModels";

const siteData = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    headers: { referer }
  } = req;
  const { Site } = await useModels();

  if (referer !== undefined) {
    switch (method) {
      case "GET":
        const response = await Site.find({});
        const siteData = await response;
        res.status(200).json({ success: true, siteData: siteData[0] });
        res.end();
        break;
      case "POST":
        break;
      default:
        break;
    }
  } else {
    // res.writeHead(302, { Location: "/?redirected=true" });
    // res.end();
    res.status(403).send("You're not allowed!");
  }
};

export default withDB(siteData);
