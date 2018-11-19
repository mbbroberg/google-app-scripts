var REQ_SHEET = "Form Responses 1";
var SLACK_API = "INSERT YOURS HERE";
var BOT_ACTION = "Sent to Slack!";

function sortSheet() {
   var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REQ_SHEET); // hard coding which spreadsheet 
   sheet.sort(1, false);
   SpreadsheetApp.flush();
}

function myFunction() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REQ_SHEET); // hard coding which spreadsheet 
  var data = sheet.getDataRange().getValues();                                 // helpful in case we add a second sheet for filtering

  for (var i = 0; i < data.length; ++i) {
    var row = data[i] // extract the row

    // This is all formatting -- feel free to edit for your need
    var opener = "*New Request!*\n\nThe following user wants to join WADE: ";
    var detail = "*Description:* ";
    var type = "*Job Type:* "; 
    var contactHow = row[1];             // column B is EMAIL address
    var aboutMe = row[2];   // is column C 
    var jobType = row[3]

    var accessRequest = opener.concat(contactHow);
    var accessDetails = detail.concat(aboutMe);
    var accessType = type.concat(jobType); 
    
    var slackSent = row[4]; // column E -- Slack notes (as of 1/28/17)
    if (slackSent != BOT_ACTION) { // if we've never sent a notification to Slack, then:
      var url = SLACK_API;

      var payload = {
        channel: "#benevolent-dictators",
        username: "recruitbot",
        text: accessRequest + "\n" + accessType + "\n" + accessDetails,
        icon_url: "https://cloud.githubusercontent.com/assets/1744971/22398304/75f4e49e-e53a-11e6-85bc-bc7f4e70f9a8.jpg"
      };
      var options = {
        'method': 'post',
        'payload': JSON.stringify(payload)
      };
      var response = UrlFetchApp.fetch(url, options);
      
      
 //     // heads up to the rest of the community 
 //     var payload = {
 //       channel: "#growing-wade",
 //       username: "recruitbot",
 //       text: accessRequest + "\n" + "The admin team will review it soon. In the meantime, let us know if you know this person!",
 //       icon_url: //"https://cloud.githubusercontent.com/assets/1744971/22398304/75f4e49e-e53a-11e6-85bc//-bc7f4e70f9a8.jpg"
 //     };
 //     var options = {
 //       'method': 'post',
 //       'payload': JSON.stringify(payload)
 //     };
 //     var response = UrlFetchApp.fetch(url, options);
      

      sheet.getRange(1 + i, 5).setValue(BOT_ACTION); // reuse this! 
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
    } // end if -- out of here when we're done sending things out to slack
   } // end for
   sheet.sort(1, false);
   SpreadsheetApp.flush();
}

// https://developers.google.com/apps-script/guides/triggers/index
