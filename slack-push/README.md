# Slack Push
Use Slack's webhook functionality to push details of the completed form to a channel. Here's an example: 

![The code](/docs/Slack_Push.png)

And a test output:

![Recruitbot](/docs/recruitbot-example.png)

## How It Works

When run, this script checks for the text in the variable `BOT_ACTION` in the column noted by `slackSent`. If the text doesn't match, the main `for` loop will send a notification to your Slack channel. There are a few variables used in the `for` loop to choose text and formatting. 

## Configuration

1. Copy `slack-push.js` into the 'Tools >  Script editor...' area
1. Change the `SLACK_API` key for your team. You can find it at https://MYTEAMHERE.slack.com/services under "Incoming WebHooks"
1. Adapt variables within the `for` loop to format the notification
1. Adapt the `payload` variable based on Slack's API guide to make it look like you want it to
1. Test it out, which you can do by going 'Run > MyFunction' 
1. Once it works, choose a way to trigger it to run under 'Resources > Current project triggers > Add a new trigger'. I prefer 'On form submit'

