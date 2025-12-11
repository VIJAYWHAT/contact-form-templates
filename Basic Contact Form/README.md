# **Basic Contact Form (for Portfolios)**

**Use case:** Students, freelancers, developers, or portfolio owners collecting general inquiries, collaboration requests, or project opportunities.

---

## Fields

Create a new Google Sheet with these exact column headers:

- Timestamp  
- Name  
- Email  
- Subject  
- Message  

**Clean and minimal — optimized for general inquiries and easy communication.**

---

## Professional Email Templates

- Beautiful **HTML-based** emails with gradient headers and modern typography  
- Responsive, **mobile-friendly design** for all devices  
- Personalized acknowledgment emails including sender name and subject  
- Branded layout matching your **portfolio color palette or personal style**  
- Optional portfolio/social media links to promote your work  

---

## Smart Features

- **One-Click Reply:** Opens your email client directly from notification emails  
- **Google Sheets Integration:** All form submissions auto-saved for easy access  
- **Message Preview:** Long messages are auto-truncated in thank-you emails  
- **Portfolio Promotion:** Automatically includes your portfolio URL in replies  
- **Input Validation:** Ensures all required fields are correctly entered  
- **Instant Notifications:** Real-time email when a new inquiry is received  

---

## Easy Customization

- Update key variables in the Apps Script file:
  - `SPREADSHEET_ID`: Your Google Sheet ID  
  - `YOUR_EMAIL`: Your receiving email address  
  - `YOUR_NAME`: Your full name (signature for email replies)  
  - `PORTFOLIO_URL`: Your portfolio or personal website URL  

- Fully modular HTML design — update colors, header text, or layout freely  
- Use any **custom color theme** to match your branding  
- No external dependencies – runs **100% in the Google ecosystem** (Sheets + Apps Script)  

---

## Setup Instructions

1. **Create your Google Sheet**  
   Add these columns in the first row:  
   `Timestamp | Name | Email | Subject | Message`

2. **Open Apps Script**  
   - Go to **Extensions → Apps Script**.  
   - Paste the provided Apps Script code.  
   - Update the variables under the configuration section.  

3. **Deploy as Web App**  
   - Click **Deploy → New Deployment**  
   - Select **Web App**  
   - Choose *“Anyone with the link”* for access.  
   - Copy the **Web App URL**.

4. **Update the HTML Form**  
   - Replace the form’s action URL with your Web App link.  
   - Host the HTML on your **portfolio site or personal domain**.

5. **Test the Form**  
   - Submit a sample message.  
   - Check the Google Sheet and your email for confirmation.

---

## Perfect For

- **Developers** showcasing projects and seeking collaboration  
- **Students/Freshers** collecting recruiter or mentor inquiries  
- **Freelancers** receiving project requests directly through their site  
- **Designers or Creators** maintaining client communication channels  

---

## Why This Works

- **Simple & Lightweight:** Minimal setup, zero dependencies  
- **Professional Look:** Clean interface that fits any portfolio design  
- **Immediate Reach:** Direct notifications keep communication prompt  
- **Better Engagement:** Personal thank-you emails encourage connections  
- **Fully Customizable:** Expandable structure for advanced workflows later  
```

Would you like me to append sample **Apps Script code** and **HTML form template** sections to this same README file?
