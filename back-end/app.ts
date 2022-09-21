
import { connect, disconnect } from "mongoose";

import * as config from "./config.json";
import { ChangelogModel, LogeventModel } from "./schema.js";

connect(`mongodb://${config.mongodbLocal.location}/${config.mongodbLocal.databaseName}`);

let demoChangelog = new ChangelogModel({ demofield: "TestingString :)"});

demoChangelog.save();

setTimeout(async () => {
    let res = await ChangelogModel.find();
    console.log(res);

    disconnect();
}, 1000);
