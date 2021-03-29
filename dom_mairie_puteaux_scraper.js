const puppeteer = require('puppeteer');
var nodemailer = require('nodemailer');
var cron = require('node-cron');

let url = 'http://www.hauts-de-seine.gouv.fr/booking/create/14086';

cron.schedule('*/3 * * * *', async () => {
  console.log('Running scraping (every 3 mn)');
  const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
    console.log("hello");
    // console.log(text);

    await page.screenshot({
      path: 'page.png'
  });

    // // get webpage details
    let pageData = await page.evaluate(() => {
        // Accept condition and submit page
        let acceptCondition = document.getElementById("condition");
        acceptCondition.checked = true;

        let submitPage = document.getElementsByTagName("input")[3];
        submitPage.click();
        return;
    });

    await page.waitForNavigation();

    await page.screenshot({
      path: 'page2.png'
  });

    let pageData2 = await page.evaluate(async () => {
        let noBookingAvailableText = document.getElementsByTagName("form")[1].innerText;
        return noBookingAvailableText;
    });

    await page.screenshot({
      path: 'page3.png'
  });

    console.log(pageData2);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '',
          pass: 'webpagescraping92'
        }
      });
      
      var mailOptions = {
        from: '',
        to: '',
        subject: 'Sending Email using Node.js',
        text: pageData2
      };

      // If the text field does not specify "il n'existe plus de plage horaire", send a mail.
      if(!pageData2.includes("Il n'existe plus de plage horaire"))
      {
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
      }
      else
      {
        console.log("No timeslot, no email sent.")
      }
    await browser.close();
});