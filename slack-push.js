var REQ_SHEET = "Form Responses 1";
var SLACK_API = "INSERT WEBHOOK URL HERE";
var BOT_ACTION = "Sent to Slack!";

function myFunction() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REQ_SHEET); // hard coding which spreadsheet 
  var data = sheet.getDataRange().getValues();                                 // helpful in case we add a second sheet for filtering

  for (var i = 0; i < data.length; ++i) {
    var row = data[i] // extract the row

    // This is all formatting -- feel free to edit for your need
    var opener = "*New Request!*\n\nThe following user wants to join WADE: ";
    var detail = "*Description:* ";
    var contactHow = row[1];             // column B is EMAIL address
    var aboutMe = row[2];   // is column C 

    var accessRequest = opener.concat(contactHow);
    var accessDetails = detail.concat(aboutMe);
    
    var slackSent = row[3]; // column D -- Slack notes
    if (slackSent != BOT_ACTION) { // if we've never sent a notification to Slack, then:
      var url = SLACK_API;

      var payload = {
        channel: "#botspam",
        username: "recruitbot",
        text: accessRequest + "\n" + accessDetails,
        icon_url: "http://neckbeardinfluence.com/wp-content/uploads/2015/06/recruitbot.png"
      };
      var options = {
        'method': 'post',
        'payload': 'payload=' + JSON.stringify(payload)
      };
      var response = UrlFetchApp.fetch(url, options);

      sheet.getRange(1 + i, 4).setValue(BOT_ACTION); // reuse this! 
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
    } // end if -- out of here when we're done sending things out to slack
   } // end for
}

// https://developers.google.com/apps-script/guides/triggers/index
