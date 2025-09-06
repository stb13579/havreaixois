# Google Apps Script Web App Setup

Follow these steps to create a Web App that receives contact form submissions and sends them to your inbox.

1. **Create the script**
   1. Open [Google Drive](https://drive.google.com).
   2. Click **New → More → Google Apps Script**.
   3. Delete any sample code and paste the snippet below:

   ```javascript
   function doPost(e) {
     const data = JSON.parse(e.postData.contents);
     const body = `Name: ${data.name}\nEmail: ${data.email}\nDates: ${data.dates}\nGuests: ${data.guests}\n\n${data.message}`;
     MailApp.sendEmail('your-email@example.com', 'Havre Aixois Inquiry', body);
     return ContentService
       .createTextOutput(JSON.stringify({ status: 'success' }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

2. **Deploy as a Web App**
   1. Click **Deploy → New deployment**.
   2. Choose **Web app** as the deployment type.
   3. Set **Execute as** to **Me** and **Who has access** to **Anyone**.
   4. Click **Deploy** and authorize the script if prompted.
   5. Copy the Web App URL provided after deployment.

3. **Connect to the website**
   1. In the project root, create a `.env.local` file if it doesn't exist.
   2. Add the line:
      ```
      NEXT_PUBLIC_CONTACT_ENDPOINT="<paste Web App URL here>"
      ```
   3. Restart the development server so the new environment variable is available.

After completing these steps, form submissions on the site will POST to your Google Apps Script endpoint and forward the message to your email.
