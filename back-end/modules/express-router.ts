import { database } from "./database";

function expressRouter(express: any) {
  const router = express.Router();

  router.use((req: any, res: any, next: () => void) => {
    console.log("Time: ", Date.now());
    next();
  });

  // This route should return a with the basic data associated with a changelog, including its logevents (for now)
  router.get("/changelog/:changelogID", async (req: any, res: any) => {
    console.log(req.params.changelogID + " - asking for changelog");

    let result = await database.getChangelog(req.params.changelogID);
    res.json(result);
  });

  // This route should return a list of all log events associated with a changelog (NYI)
  router.get("/changelog/:changelogID/logevents", async (req: any, res: any) => {
    console.log(req.params.changelogID + " - asking for logevents");

    let result = await database.getChangelog(req.body.changelogData);
    res.json(result?.events);
  });

  // == Setters ===========================
  // This route should return the completion state of the update request as well as the changelog ID
  router.post("/newChangelog", async (req: any, res: any) => {
    console.log(req.body);

    let result = await database.saveChangelog(req.body.changelogData);
    res.json(result);
  });

  // This route should return the completion state of the update request
  router.patch("/updateChangelog/:changelogID", async (req: any, res: any) => {
    console.log(req.params.changelogID + " - updating a changelog");
    console.log(req.body);

    let result = await database.saveChangelog(req.body.changelogData);
    res.json(result);
  });

  return router;
}

// == Testing area for database access layer / methods =============
// async function testFunction() {
//   let changelogData = await database.getChangelog("632c8001755b3ac33b06fe6f");
//   let result = await database.deleteLogevent(
//     changelogData,
//     "632c8001755b3ac33b06fe6e"
//   );

//   console.log(result);
// }

// testFunction();
// =================================================================

module.exports = expressRouter;
