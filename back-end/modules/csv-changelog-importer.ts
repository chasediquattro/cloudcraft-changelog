// This module should take in a .csv file and extrapolate the desired information
// It will then import any relevent information into the changelog ecosystem
// Files will be passed to this module from an express forum upload to the local env. 
// (in the future this will be handled by using an S3 bucket for file upload and result caching)

/*
    Nice to have features:
    - Ability to upload multiple changelog files all at once
    - Ability to generate a quick view after a csv has been processed, so that it can be verified before import
    - Ability to track imported data via import group / batch ID's
    - Ability to utilize several different formats or source file types

    Features included in Revision 1:
    - Import from CSV file type to JSON array
    - Handle a few different common column naming conventions
    - Format imported data to match the active schema for the changelog DB
*/

let csvToJson = require('convert-csv-to-json');

// Convert the CSV file into a list of JSON objects
// Each object will contain a key that equals the colum names, and a value that equals all associated values
let json = csvToJson.parseSubArray('*',',').getJsonFromCsv("import_sources/export1.csv");

// Parse out a list of each column name from the first json object
let csvColumns = Object.keys(json[0])[0].split(",");

let listOfChangesAsJson = [];

// For each changelog entry
json.forEach((entry: any[]) => {
    // Extract a list of values for the entry and parse it into a list
    let values = Object.values(entry)[0].split(",");

    var entryAsJson: any = {};

    // Print out the name of the column, then the associated value of that column in the row
    values.forEach((value: String, index: number) => {
        if (index <= csvColumns.length) {  // TODO: Bind data length to length of columns instead of of values with proper N/A handling
            let jsonKey: string = csvColumns[index];
            entryAsJson[jsonKey] = value || "N/A";
        }
    });

    console.log(entryAsJson);
});


