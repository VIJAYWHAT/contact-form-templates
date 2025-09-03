/**
 * Small Business Contact Form Handler
 * Perfect for general inquiries, bookings, and service requests
 */
function doPost(e) {
  
  var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';  // Replace with YOUR Google Sheet ID
 
  var YOUR_EMAIL = 'your-business-email@gmail.com';  // Replace with YOUR business email
  
  var BUSINESS_NAME = 'Your Business Name'; // Replace with YOUR business name
  
  var BUSINESS_WEBSITE = 'https://your-business-website.com'; // Replace with your website URL

  try {
    // Connect to Google Sheet
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName('Sheet1'); // Make sure sheet name matches

    // Extract form data
    var fullName = e.parameter.fullName || '';
    var email = e.parameter.email || '';
    var phone = e.parameter.phone || '';
    var reason = e.parameter.reason || '';
    var message = e.parameter.message || '';
    var contactMethod = e.parameter.contactMethod || 'Email';
    var preferredTime = e.parameter.preferredTime || 'Anytime';

    // Validate required fields
    if (!fullName.trim() || !email.trim() || !phone.trim() || !reason.trim() || !message.trim()) {
      return ContentService.createTextOutput("Please fill in all required fields!");
    }

    // Store data in Google Sheet
    sheet.appendRow([
      new Date(),
      fullName.trim(),
      email.trim(),
      phone.trim(),
      reason.trim(),
      message.trim(),
      contactMethod,
      preferredTime
    ]);

    // Send Thank You Email to Customer
    var customerSubject = `Thank you for contacting ${BUSINESS_NAME}!`;
    var customerBody = createCustomerEmailTemplate(fullName, reason, message, contactMethod, preferredTime, BUSINESS_NAME, BUSINESS_WEBSITE);
    
    MailApp.sendEmail({
      to: email,
      subject: customerSubject,
      htmlBody: customerBody
    });

    // Send Notification Email to Business Owner
    var ownerSubject = `New Contact: ${reason} - ${fullName}`;
    var ownerBody = createOwnerEmailTemplate(fullName, email, phone, reason, message, contactMethod, preferredTime, SPREADSHEET_ID);
    
    MailApp.sendEmail({
      to: YOUR_EMAIL,
      subject: ownerSubject,
      htmlBody: ownerBody
    });

    return ContentService.createTextOutput("Thank you! We've received your message and will contact you soon.");

  } catch (error) {
    console.error('Contact form error:', error);
    return ContentService.createTextOutput("Something went wrong. Please try again or call us directly.");
  }
}

/**
 * Thank You Email Template for Customers
 */
function createCustomerEmailTemplate(fullName, reason, message, contactMethod, preferredTime, businessName, businessWebsite) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background: white; }
            .header { background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 20px 20px 0 0;}
            .header h1 { margin: 0; font-size: 28px; }
            .header p { margin: 10px 0 0 0; opacity: 0.9; }
            .content { padding: 40px 30px; border: 1px solid #e0e0e0;}
            .content p { margin: 15px 0; }
            .info-box { background: #f8f9fa; padding: 20px; border-left: 4px solid #3498db; margin: 25px 0; border-radius: 4px; }
            .info-box strong { color: #2c3e50; }
            .highlight { background: #fff3cd; padding: 15px; border-radius: 4px; margin: 20px 0; border-left: 4px solid #ffc107; }
            .cta-button { display: inline-block; background: #3498db; color: white; padding: 14px 28px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: 600; }
            .footer { background: #2c3e50; color: white; padding: 30px 20px; text-align: center; border-radius: 0 0 20px 20px;}
            .footer p { margin: 8px 0; font-size: 14px; }
            .footer a { color: #3498db; text-decoration: none; }
            .divider { height: 1px; background: #e0e0e0; margin: 25px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📬 Message Received!</h1>
                <p>Thank you for reaching out to ${businessName}</p>
            </div>
            
            <div class="content">
                <p>Hi <strong>${fullName}</strong>,</p>
                
                <p>Thank you for contacting us! We've successfully received your inquiry regarding <strong>${reason}</strong>.</p>
                
                <div class="info-box">
                    <strong>📝 Your Inquiry Summary:</strong><br><br>
                    <strong>Reason:</strong> ${reason}<br>
                    <strong>Preferred Contact Method:</strong> ${contactMethod}<br>
                    <strong>Preferred Time:</strong> ${preferredTime}<br><br>
                    <strong>Your Message:</strong><br>
                    <em>"${message.length > 200 ? message.substring(0, 200) + '...' : message}"</em>
                </div>
                
                <div class="highlight">
                    <strong>⏱️ What happens next?</strong><br>
                    Our team will review your inquiry and reach out to you via <strong>${contactMethod}</strong> within 24-48 hours during business hours.
                </div>
                
                <p><strong>Need immediate assistance?</strong></p>
                <ul style="line-height: 2;">
                    <li>📞 Call us during business hours</li>
                    <li>📧 Reply directly to this email</li>
                    <li>🌐 Visit our <a href="${businessWebsite}" style="color: #3498db;">website</a> for more information</li>
                </ul>
                
                <div class="divider"></div>
                
                <p>We appreciate your interest in ${businessName} and look forward to serving you!</p>
                
                <p>Best regards,<br>
                <strong>The ${businessName} Team</strong></p>
            </div>
            
            <div class="footer">
                <p><strong>${businessName}</strong></p>
                <p>This is an automated confirmation email. Please do not reply directly to this message.</p>
                <p>We will respond from our business email shortly.</p>
                <p style="margin-top: 15px; opacity: 0.8;">© ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

/**
 * Notification Email Template for Business Owner
 */
function createOwnerEmailTemplate(fullName, email, phone, reason, message, contactMethod, preferredTime, sheetId) {
  // Determine priority based on reason
  var priorityColor = '#ffc107';
  var priorityLabel = 'Normal';
  
  if (reason.toLowerCase().includes('urgent') || reason.toLowerCase().includes('booking')) {
    priorityColor = '#dc3545';
    priorityLabel = 'High Priority';
  }
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 700px; margin: 20px auto; background: white; }
            .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 20px 20px 0 0;}
            .header h1 { margin: 0; font-size: 26px; }
            .priority-badge { display: inline-block; background: ${priorityColor}; color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin: 10px 0; }
            .content { padding: 30px; border: 1px solid #e0e0e0;}
            .info-grid { display: table; width: 100%; border-collapse: collapse; margin: 20px 0; }
            .info-row { display: table-row; }
            .info-label { display: table-cell; background: #f8f9fa; padding: 12px; font-weight: 600; border: 1px solid #dee2e6; width: 35%; }
            .info-value { display: table-cell; padding: 12px; border: 1px solid #dee2e6; }
            .message-box { background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #28a745; }
            .message-box h3 { margin: 0 0 15px 0; color: #28a745; }
            .contact-actions { text-align: center; margin: 30px 0; padding: 20px; background: #e7f5ff; border-radius: 6px; }
            .btn { display: inline-block; color: white !important; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 5px; font-weight: 600; }
            .btn-primary { background: #007bff; }
            .btn-success { background: #28a745; }
            .btn-info { background: #17a2b8; }
            .footer { background: #2c3e50; color: white; padding: 20px; text-align: center; font-size: 14px; border-radius: 0 0 20px 20px;}
            .footer a { color: #3498db; text-decoration: none; }
            .alert { padding: 12px; background: #fff3cd; border-left: 4px solid #ffc107; margin: 20px 0; border-radius: 4px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1> New Contact Form Submission</h1>
                <span class="priority-badge">${priorityLabel}</span>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">A potential customer is waiting for your response</p>
            </div>
            
            <div class="content">
                <p><strong>You have a new inquiry from your website contact form!</strong></p>
                
                <div class="info-grid">
                    <div class="info-row">
                        <div class="info-label"> Full Name</div>
                        <div class="info-value">${fullName}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label"> Email</div>
                        <div class="info-value"><a href="mailto:${email}" style="color: #007bff;">${email}</a></div>
                    </div>
                    <div class="info-row">
                        <div class="info-label"> Phone</div>
                        <div class="info-value"><a href="tel:${phone}" style="color: #007bff;">${phone}</a></div>
                    </div>
                    <div class="info-row">
                        <div class="info-label"> Reason</div>
                        <div class="info-value"><strong>${reason}</strong></div>
                    </div>
                    <div class="info-row">
                        <div class="info-label"> Preferred Method</div>
                        <div class="info-value">${contactMethod}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label"> Preferred Time</div>
                        <div class="info-value">${preferredTime}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label"> Submitted</div>
                        <div class="info-value">${new Date().toLocaleString()}</div>
                    </div>
                </div>
                
                <div class="message-box">
                    <h3>💬 Customer's Message:</h3>
                    <p style="background: white; padding: 15px; border-radius: 4px; margin: 0;">${message}</p>
                </div>
                
                <div class="alert">
                    <strong>⚡ Quick Tip:</strong> Customers prefer ${contactMethod} contact. Best time to reach them: ${preferredTime}
                </div>
                
                <div class="contact-actions">
                    <p style="margin: 0 0 15px 0; font-weight: 600;">Quick Actions:</p>
                    <a href="mailto:${email}?subject=Re: ${reason}&body=Hi ${fullName},%0D%0A%0D%0AThank you for contacting us regarding ${reason}." class="btn btn-primary">📧 Reply via Email</a>
                    <a href="tel:${phone}" class="btn btn-success">📞 Call ${fullName}</a>
                    <a href="https://docs.google.com/spreadsheets/d/${sheetId}" class="btn btn-info">📊 View All Inquiries</a>
                </div>
                
                <p style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
                    <em>Remember to respond within 24-48 hours for the best customer experience!</em>
                </p>
            </div>
            
            <div class="footer">
                <p><strong>📊 All submissions are automatically saved</strong></p>
                <p>View your complete inquiry log: <a href="https://docs.google.com/spreadsheets/d/${sheetId}">Google Sheet Dashboard</a></p>
                <p style="margin-top: 10px; opacity: 0.8;">This email was generated automatically by your contact form system</p>
            </div>
        </div>
    </body>
    </html>
  `;
}