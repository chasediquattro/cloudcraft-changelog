import { Schema, model } from "mongoose";

// Schema structure overview can be found on the Hackathon 2022 Content Changelogs project details sheet:
// https://docs.google.com/document/d/12OaU3h9u9p5QmP2IWzhC4R2kL5vgwEfD-AYTWhR1_Jc/edit?usp=sharing

var logeventSchema = new Schema({
  imported: Boolean,
  change_time_utc: String,
  change_duration: Number,
  change_type: String,
  change_description: String,
  change_reason: String,
  asana_task_link: String,

  effecting_user_id: String,
  effecting_username: String,
  effecting_user_occupation: String,

  replacement: {
    require: false,
    type: {
      content_type: String,
      content_id: String,
      content_name: String,
      replacement_changelog_id: String,
    },
  },

  learning_path: {
    require: false,
    type: {
      action: String,
      affected_content_id: String,
      affected_content_name: String,
    },
  },
});

var changelogSchema = new Schema({
  component_type: String,
  component_id: String,
  component_name: String,
  last_updated: String,
  events: [logeventSchema],
});

// ======================================================

// TODO: Add in further pre-save data validation for each field

logeventSchema.pre("save", () => {
  console.log("Ran Logevent presave!");
});

changelogSchema.pre("save", () => {
  console.log("Ran Changelog presave!");
});

// ======================================================

export var Logevent = model("Logevent", logeventSchema);
export var Changelog = model("Changelog", changelogSchema);
