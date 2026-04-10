/**
 * GOOGLE APPS SCRIPT — MVP Lead Capture → Google Sheet
 * =====================================================
 * HOW TO DEPLOY:
 *
 * 1. Open your Google Sheet:
 *    https://docs.google.com/spreadsheets/d/1f9mos93QHwx0FI2UHCStZ_0e-HLQ-Ru90dkuGWjGe10
 *
 * 2. Go to Extensions → Apps Script
 *
 * 3. Delete any existing code and paste this entire file
 *
 * 4. Click "Deploy" → "New deployment"
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    Click "Deploy" and authorise when prompted.
 *
 * 5. Copy the Web app URL (looks like:
 *    https://script.google.com/macros/s/AKfycb.../exec)
 *
 * 6. Add it to your Vercel environment variables as:
 *    GOOGLE_SHEET_WEBHOOK=<paste the URL here>
 *    Also add it to .env.local for local development.
 *
 * 7. Add a header row to your sheet (Row 1):
 *    Timestamp | Name | Email | Phone | Business Name | Source
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp
      .openById('1f9mos93QHwx0FI2UHCStZ_0e-HLQ-Ru90dkuGWjGe10')
      .getActiveSheet();

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.name        || '',
      data.email       || '',
      data.phone       || '',
      data.businessName || '—',
      'Innovator Founder Visa — MVP Validator',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: test this manually from Apps Script editor
function testPost() {
  var mockEvent = {
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        phone: '+447911123456',
        businessName: 'Test Startup',
      }),
    },
  };
  Logger.log(doPost(mockEvent).getContent());
}
