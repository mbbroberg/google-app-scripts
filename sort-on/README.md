# sortSheet
A simple helper function to organize a spreadsheet by date.

## How It Works
When run, the first column (1) will be used to sort the entire spreadsheet. Sorting will show **most recent date first** due to the `false` flag.

## Configuration
1. Copy `sortSheet.js` into the 'Tools >  Script editor...' area
1. Change the `REQ_SHEET` name for your spreadsheet. Its the name of your spreadsheet tab.
1. Test it out, which you can do by going 'Run > sortSheet'
1. Once it works, choose a way to trigger it to run under 'Resources > Current project triggers > Add a new trigger'. I prefer 'Run sortSheet; From Spreadsheet; On Open' for this tool to ensure every user gets a freshly organized list
