import { connect, disconnect } from "mongoose";

import * as config from "./config.json";
import { Changelog, Logevent } from "./schema.js";

connect(`mongodb://${config.mongodbLocal.location}/${config.mongodbLocal.databaseName}`);

let now = Date.now();
console.log(now);

let demoLogevent = new Logevent({ change_time_utc: now, change_type: "updated", effecting_username: "John Doe" });
let demoChangelog: any = new Changelog();
demoChangelog["events"].push(demoLogevent);

demoChangelog.save();

setTimeout(async () => {
    let res = await Changelog.find();
    console.log(res);

    disconnect();
}, 1000);

require("./modules/csv-changelog-importer");
