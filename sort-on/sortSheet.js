var REQ_SHEET = "Form Responses 1";

/*
* sortSheet() - a simple function to keep the latest entry of a form on top.
*
* By default, the newest entry to a Google form is at the bottom. Given the
* preference to login and see the latest entries, use sortSheet() to do so.
*
* To use on triggers, go to Resources > Current Triggers.
* I set ours to Run sortSheet; From Spreadsheet; On Open.
*
*/
function sortSheet() {
   var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REQ_SHEET);

   // sort on column 1 in descending order (most recent date on top)
   sheet.sort(1, false);
   SpreadsheetApp.flush();
}
