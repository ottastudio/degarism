import { withDB } from "../../../lib/database";
import adminMiddleware from "../../../lib/middleware/adminMiddleware";

export default withDB(async (req, res, db) => {
  const { method } = req;
  const { Faq } = db;
  const faqs = await Faq.find({});

  switch (method) {
    case "GET":
      return res.status(200).json({
        success: true,
        faqs
      });

    case "POST":
      await adminMiddleware(req, res, db, () => {
        return res.status(200).json({
          success: true,
          on: "post",
          faqs
        });
      });
      break;

    default:
      break;
  }
});
