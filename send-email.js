// I wrote this to automate a few hundred responses 
// And it worked. 

var NOMINATION_SHEET = 'EMC Elect Nomination Form';
var CONFIRMATION_SHEET = 'Confirmations All';
var EMAIL_SENT = "EMAIL_SENT";
var EMAIL = "EMAIL";
var DUPLICATE = "Yes";

var SUBJECT = "You've Been Nominated for EMC Elect 2014";

var MESSAGE = "<HTML><BODY>"
    + "<P>" + "Congratulations!"
    + "<P>You have been nominated for consideration as an EMC Elect. I am following up to see if you are interested in continuing down the selection process."
    + "<P>To be considered, <b>fill out your nomination confirmation by Nov 22nd: http://emc.im/18ZuWBC</b>"
    + "<P><b>What is EMC Elect?</b>"
    + "<P>EMC Elect is an annual award for people who have given back to the community of EMC users by sharing their technical expertise and evangelizing to others about EMC solutions and services."
    + "<P><b>How can I qualify for the award?</b>"
    + "<P>Candidates qualify by being active and sharing their EMC knowledge and experiences with others. This could be online -- answering questions on the EMC Communities, running a blog -- or it could be offline, for example, by helping organize or speaking at EMC User Groups or other local events."
    + "<P>"
    + "<P>We’d love the chance to consider you for this honor. Please fill out and return this form by November 22nd so that we can take the next step! In the meantime, you can learn more about EMC Elect on the EMC Community Network here: http://emc.im/RWbRKF"
    + "<P>"
    + "<P>Cheers,"
    + "The EMC Elect team"
    + "</HTML></BODY>";

function sendEmails2() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOMINATION_SHEET); // hard coding which spreadsheet 
  var lastRow = sheet.getLastRow();
  var startRow = 1;  // First row of data to process
  var numRows = 3;   // Number of rows to process
  // Fetch the range of cells
  var dataRange = sheet.getRange(startRow, 1, numRows, 11) // Actual bounds up to 11 to get row[10]
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  for (var i = 0; i < data.length; ++i) {
    var row = data[i]
    var contactHow = row[2];    // is column C is EMAIL
    var isDuplicate = row[0];   // is column A has YES
    var emailSent = row[5];     // Make EMAIL_SENT in column F now
    if ((emailSent != EMAIL_SENT) && (isDuplicate != DUPLICATE) && (contactHow == EMAIL)) {  // Prevents sending duplicates
      // Next step that'd be nice:
      // need to extact email address from entry -- example: "@xy , xy@x.com"
      var email = row[10]
     // MailApp.sendEmail(email, SUBJECT, MESSAGE);
      MailApp.sendEmail(email, SUBJECT, '', {htmlBody: MESSAGE});
      sheet.getRange(startRow + i, 6).setValue(EMAIL_SENT);
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
    }
  }
}