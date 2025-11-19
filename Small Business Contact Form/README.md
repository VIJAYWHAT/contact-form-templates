# **Small Business Contact Form**

**Use case:** General inquiries, service requests, appointment bookings, customer support

**Fields:**

Create a new Google Sheet with these exact column headers:

- Timestamp
- Full Name
- Email
- Phone Number
- Reason for Contact
- Message
- Preferred Contact Method
- Preferred Time to Contact

**Complete customer engagement system — designed to capture leads and provide exceptional service.**

---

## Professional Email Templates:

- Modern HTML layout with business-grade design and branding
- Dual email system: Customer confirmation + Business owner notification
- Detailed inquiry summary cards with contact preferences highlighted
- Mobile-responsive design for seamless viewing on any device
- Quick action buttons for instant customer follow-up

---

## Smart Contact Management:

- **Instant Inquiry Alerts:** Get real-time notifications with full customer details
- **Automatic Confirmations:** Build trust with immediate acknowledgment emails
- **Priority Indicators:** Visual alerts for urgent inquiries and bookings
- **One-Click Contact:** Pre-filled email/phone links for fast responses
- **Contact Tracking:** Complete inquiry history stored in Google Sheets

---

## Advanced Features:

- **Required Field Validation:** Ensures complete contact information
- **8 Inquiry Categories:** General, Product Info, Service Info, Booking, Quotes, Support, Feedback, Other
- **Contact Preference Tracking:** Email, Phone, or Either option
- **Time Zone Flexibility:** Morning, Afternoon, Evening, or Anytime scheduling
- **Response Time Reminders:** Built-in 24-48 hour follow-up guidance
- **Professional Branding:** Custom business name, website, and contact integration

---

## Easy Customization:

- Editable variables (business name, email, website URL)
- Simple inquiry category modification — add your specific services
- Custom color schemes matching your brand identity
- 100% Google ecosystem — Sheets + Apps Script, zero monthly costs
- Perfect for any business size from solopreneurs to small teams

---

## Setup Instructions:

1. **Create Google Sheet** with the exact column headers listed above
2. **Copy the Apps Script code** and update these variables:
   - `SPREADSHEET_ID`: Your Google Sheet ID (from Sheet URL)
   - `YOUR_EMAIL`: Your business email address
   - `BUSINESS_NAME`: Your business or company name
   - `BUSINESS_WEBSITE`: Your website URL
3. **Deploy as Web App:**
   - Click Deploy → New Deployment
   - Select "Web App" type
   - Set "Execute as" to "Me"
   - Set "Who has access" to "Anyone"
   - Click Deploy and copy the Web App URL
4. **Update HTML file** with your Apps Script Web App URL
5. **Host the HTML form** on your website, landing page, or contact page

---

## Perfect For:

- **Local Businesses** managing customer inquiries and appointments
- **Service Providers** who need detailed booking information
- **Small Retailers** handling product questions and support
- **Consultants** qualifying potential clients professionally
- **Home Services** (contractors, cleaners, technicians) scheduling appointments
- **Medical/Dental Offices** managing patient inquiries
- **Salons & Spas** coordinating bookings and service requests

---

## Why This Works:

- **Builds Credibility** - Instant professional responses show you're organized
- **Never Miss a Lead** - Email notifications ensure quick follow-up
- **Respects Preferences** - Contact customers their preferred way, at their preferred time
- **Reduces No-Shows** - Clear confirmation emails increase commitment
- **Centralizes Communication** - All inquiries organized in one searchable spreadsheet
- **Saves Money** - No monthly subscription fees for contact form services
- **Mobile-Friendly** - Customers can reach you from any device, anywhere

---

## Email Features:

### Customer Confirmation Email Includes:

- Personalized greeting with their name
- Complete inquiry summary for their records
- Clear next steps and response timeline
- Multiple contact options for urgent needs
- Professional footer with business branding

### Business Owner Notification Includes:

- All customer details in easy-to-read format
- Priority badges for urgent/booking inquiries
- Quick action buttons (Reply via Email, Call Customer, View All Inquiries)
- Contact preference and timing recommendations
- Direct link to Google Sheets dashboard

---

## Customization Tips:

**Change Inquiry Categories:**
Edit the HTML form (lines 139-147) to match your services:

```html
<option value="Your Service 1">Your Service 1</option>
<option value="Your Service 2">Your Service 2</option>
```

**Modify Time Slots:**
Update the "Preferred Time" dropdown (lines 171-176) for your business hours

**Adjust Email Design:**
Change gradient colors in the email templates:

- Line 15 (App Script): `background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);`
- Replace `#2c3e50` and `#3498db` with your brand colors

**Add Auto-Responder Text:**
Customize the thank you message in the email templates (App Script lines 102-104)

---

## Pro Tips:

1. **Set Up Email Filters:** Create Gmail filters to label inquiry notifications automatically
2. **Use Conditional Formatting:** Highlight urgent inquiries in your Google Sheet with colors
3. **Create Saved Responses:** Draft common replies for faster customer communication
4. **Track Response Times:** Add a "Responded" column to monitor your follow-up speed
5. **Export for CRM:** Regularly export Sheet data to your customer management system
6. **Add Calendar Integration:** Include booking links in your confirmation emails
7. **Monitor Analytics:** Track which inquiry types are most common to optimize services

---

## Troubleshooting:

**Form not submitting?**

- Check that your Web App URL is correct in the HTML file
- Ensure the script deployment is set to "Anyone can access"
- Verify your Google Sheet ID matches the one in the script

**Emails not sending?**

- Confirm YOUR_EMAIL variable is correct in the script
- Check Gmail spam/promotions folders
- Verify the email addresses in form submissions are valid

**Data not saving to Sheet?**

- Ensure Sheet1 exists (or update the sheet name in the script)
- Check that column headers match exactly
- Look at the Apps Script execution logs for errors

---

## Security & Privacy:

- No customer data is shared with third parties
- All data stored securely in your Google account
- Form uses POST method for secure data transmission
- No API keys or external services required
- Full GDPR compliance when hosted properly

---

## Future Enhancements (DIY):

- Add file upload capability for project briefs
- Integrate with Google Calendar for automatic booking
- Connect to Zapier for CRM automation
- Add SMS notifications via Twilio
- Create a thank you page redirect
- Implement spam protection with reCAPTCHA
- Build a customer portal to track inquiry status

---


