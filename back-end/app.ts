const express = require("express");

// Instantiate the database accessor singleton module
require("./modules/database");

// Run the CSV importer process
require("./modules/csv-changelog-importer");

// =========================================

const changelogRouter = require("./modules/express-router")(express);
const api = express();
const port = 3000;

api.use("/demo_api", changelogRouter);

api.listen(port, () => {
  console.log(`Changelog demo api listening on port ${port}`);
});
