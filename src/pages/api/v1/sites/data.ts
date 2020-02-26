import { withDB } from "../../../../lib/database";

export default withDB(async (req, res, db) => {
  const { method } = req;
  const { Site } = db;

  switch (method) {
    case "GET":
      return Site.find({})
        .then(siteData =>
          res.status(200).json({ success: true, siteData: siteData[0] })
        )
        .then(() => res.end())
        .catch(err => res.status(400).json({ success: false, err }));

    default:
      return (
        res.setHeader("Allow", ["GET", "PUT"]),
        res.status(405).end(`Method ${method} Not Allowed!`)
      );
  }
});

// if (referer !== undefined) {
//   switch (method) {
//     case "GET":
//       const response = await Site.find({});
//       const siteData = response;
//       res.status(200).json({ success: true, siteData: siteData[0] });
//       res.end();
//       break;
//     case "POST":
//       break;
//     default:
//       break;
//   }
// } else {
//   // res.writeHead(302, { Location: "/?redirected=true" });
//   // res.end();
//   res.status(403).send("You're not allowed!");
// }
