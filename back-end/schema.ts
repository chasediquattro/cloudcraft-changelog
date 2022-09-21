import { Schema, model } from "mongoose";

// Schema structure overview can be found on the Hackathon 2022 Content Changelogs project details sheet:
// https://docs.google.com/document/d/12OaU3h9u9p5QmP2IWzhC4R2kL5vgwEfD-AYTWhR1_Jc/edit?usp=sharing

export var ChangelogModel = model("Changelog", new Schema({
    demofield: String,
}));

export var LogeventModel = model("Logevent", new Schema({
    demofield: String,
}));
