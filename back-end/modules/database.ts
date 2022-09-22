import { Changelog, Logevent } from "../schema.js";
import { connect, disconnect, ObjectId } from "mongoose";
import * as config from "../config.json";


class Database {
  Database() {}

  // ==== Methods ======================
  // Connects to the locally hosted MongoDB cluster
  async connect() {
    connect(
      `mongodb://${config.mongodbLocal.location}/${config.mongodbLocal.databaseName}`
    );
  }

  // Closes the connection to the local MongoDB cluster
  async disconnect() {
    disconnect();
  }

  // ==== Getters ======================
  // Will return changelog object if it exists, which should also return any logevents that are associated
  async getChangelog(changelogOrContentID: string) {
    if (!changelogOrContentID) return;

    let res = await Changelog.findOne({ _id: changelogOrContentID });
    console.log(res);

    if (!res)
      res = await Changelog.findOne({ component_id: changelogOrContentID });
    console.log(res);

    return res;
  }

  // ==== Setters ======================
  // TODO: add validation and existing changelog / overwrite checks

  // Accepts changelog data and saves it to the DB as a new object
  async saveChangelog(changelogData: any) {
    if (!changelogData) return;

    let result = await changelogData.save();
    console.log("New changelog saved:", result);

    if (!result) return false;
    else return true;
  }

  // New log event should be added to the changelog object beforehand then passed to this method
  // Should be upgraded to push a new log to the changelog in the future, isntead of saving the whole object
  async insertLogevent(changelogDataIncludingNewLogEvent: any) {
    if (!changelogDataIncludingNewLogEvent) return;

    let result = await changelogDataIncludingNewLogEvent.save();
    console.log("New log event saved:", result);

    if (!result) return false;
    else return true;
  }

  // ==== Deletion ======================
  // Will take in an ID and delete the associated changelog
  async deleteChangelog(changelogOrContentID: string) {
    if (!changelogOrContentID) return;

    let res = await Changelog.deleteOne({ _id: changelogOrContentID });
    console.log(res);

    if (!res)
      res = await Changelog.deleteOne({ component_id: changelogOrContentID });
    console.log(res);

    return res;
  }

  // Will take in a Logevent ID and delete the associated log entry
  async deleteLogevent(changelogData: any, logEventID: string) {
    if (!changelogData || !logEventID) return;

    let indexOfLogevent: any;

    // Grab the index of the targeted log event within the provided changelog object
    changelogData.events.find((event: any, index: any) => {
      console.log("Checking id of logevent:", event._id);
      if (event._id === logEventID) {
          indexOfLogevent = index;
          return true;
      } else return false;
    });

    // If the logevent was found, delete it from the changelog
    if (!indexOfLogevent) return;
    console.log(changelogData.events[indexOfLogevent]);
    changelogData.events.splice(indexOfLogevent, 1);
    console.log(changelogData.events[indexOfLogevent]);

    // Save the logevent-less changelog object back to the DB
    let result = await changelogData.save();
    console.log("Log event deleted:", result);

    return result;
  }
}

// Create a singleton instance
export const database = new Database();
database.connect();
