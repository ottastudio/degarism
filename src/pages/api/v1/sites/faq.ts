import { NextApiRequest, NextApiResponse } from "next";
import { withDB } from "../../../../lib/database";
import { useModels } from "../../../../lib/database/useModels";

const siteData = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req;
  const { Faq } = await useModels();

  switch (method) {
    case "GET":
      const response = await Faq.find({});
      const faqs = await response;
      res.status(200).json({ success: true, faqs });
      res.end();
      break;
    case "POST":
      const faq = await new Faq(body);
      faq.save((err: any, doc: any) => {
        if (err) return res.json({ success: false, message: err.message });
        res.status(201).json({ success: true, message: "Succeedeed", doc });
      });
      break;
    case "DELETE":
      try {
        await Faq.deleteOne({ _id: query.id });
        return res.status(200).json({ success: true, message: "Deleted" });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
    case "PATCH":
      try {
        const resUpdateFaq = await Faq.findOneAndUpdate(
          { _id: body._id },
          { topic: body.topic, markup: body.markup }
        );
        const updated = await resUpdateFaq;
        return res
          .status(200)
          .json({ success: true, message: "Updated", updated });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
    default:
      break;
  }
};

export default withDB(siteData);
