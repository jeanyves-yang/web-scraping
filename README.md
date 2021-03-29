# web-scraping

Quick parsing of a website to get mail notifications to book appointments.

## How to run
- First set a mail as a sender, can be the same for 'user' and 'from' fields. 
- Set a mail as a receiver, the one who will get the notifications, in the 'to' field.
Then:
```
node dom_mairie_puteaux_scraper.js
``` 
It will open chromium browsers with the url specified and perform set of actions to identify a button or a field. It regularly (through a cron) sends mail with notifications.

## Author
Jean-Yves Yang
