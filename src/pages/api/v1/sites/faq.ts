import { withDB } from "../../../../lib/database";

export default withDB(async (req, res, db) => {
  const { Faq } = db;
  const { method, body, query } = req;

  switch (method) {
    case "GET":
      return Faq.find({})
        .then(faqs => {
          res.status(200).json({ success: true, faqs });
        })
        .then(() => res.end())
        .catch(err => res.status(404).send(err));

    case "POST":
      const faq = new Faq(body);
      return faq
        .save()
        .then(doc => {
          res.status(201).json({ success: true, message: "Succeedeed", doc });
        })
        .catch(err => {
          res.json({ success: false, message: err.message });
        });

    case "DELETE":
      return Faq.deleteOne({ _id: query.id })
        .then(() => {
          res.status(200).json({ success: true, message: "Deleted" });
        })
        .catch(err => {
          res.status(400).json({ success: false, message: err.message });
        });

    case "PATCH":
      return Faq.findOneAndUpdate(
        { _id: body._id },
        { topic: body.topic, markup: body.markup }
      )
        .then(updated =>
          res.status(200).json({ success: true, message: "Updated", updated })
        )
        .catch(err =>
          res.status(400).json({ success: false, message: err.message })
        );

    default:
      return (
        res.setHeader("Allow", ["GET", "PUT"]),
        res.status(405).end(`Method ${method} Not Allowed!`)
      );
  }
});
