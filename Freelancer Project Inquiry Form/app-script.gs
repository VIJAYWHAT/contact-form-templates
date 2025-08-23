/**
 * Freelancer Project Inquiry Form Handler
 * Perfect for freelancers and service providers to qualify leads
 */
function doPost(e) {
  var SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE"; // Replace with YOUR Google Sheet ID

  var YOUR_EMAIL = "your-email@gmail.com"; // Replace with YOUR email address

  var YOUR_NAME = "Your Full Name"; // Replace with YOUR name

  var YOUR_BUSINESS = "Your Business Name"; // Replace with your business/freelance name

  var YOUR_WEBSITE = "https://your-portfolio.com"; // Replace with your portfolio/website URL

  var YOUR_LINKEDIN = "https://linkedin.com/in/your-profile"; // Replace with your LinkedIn profile URL

  var YOUR_PHONE = "+1 (555) 123-4567"; // Replace with your phone number (optional)

  try {
    // Connect to Google Sheet
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName("Sheet1"); // Make sure sheet name matches

    // Extract form data
    var name = e.parameter.name || "";
    var email = e.parameter.email || "";
    var company = e.parameter.company || "";
    var projectType = e.parameter.project_type || "";
    var budgetRange = e.parameter.budget_range || "";
    var timeline = e.parameter.timeline || "";
    var projectDescription = e.parameter.project_description || "";
    var additionalInfo = e.parameter.additional_info || "";

    // Validate required fields
    if (
      !name.trim() ||
      !email.trim() ||
      !projectType.trim() ||
      !budgetRange.trim() ||
      !projectDescription.trim()
    ) {
      return ContentService.createTextOutput(
        "Please fill in all required fields!"
      );
    }

    // Store data in Google Sheet
    sheet.appendRow([
      new Date(),
      name.trim(),
      email.trim(),
      company.trim(),
      projectType.trim(),
      budgetRange.trim(),
      timeline.trim(),
      projectDescription.trim(),
      additionalInfo.trim(),
    ]);

    // Send Confirmation Email to Client
    var clientSubject = `Thanks for your project inquiry, ${name}!`;
    var clientBody = createClientEmailTemplate(
      name,
      company,
      projectType,
      budgetRange,
      YOUR_NAME,
      YOUR_BUSINESS,
      YOUR_WEBSITE,
      YOUR_LINKEDIN,
      YOUR_PHONE
    );

    MailApp.sendEmail({
      to: email,
      subject: clientSubject,
      htmlBody: clientBody,
    });

    // Send Lead Notification Email to You
    var freelancerSubject = `🎯New Project Lead: ${projectType} - ${budgetRange}`;
    var freelancerBody = createFreelancerEmailTemplate(
      name,
      email,
      company,
      projectType,
      budgetRange,
      timeline,
      projectDescription,
      additionalInfo,
      SPREADSHEET_ID
    );

    MailApp.sendEmail({
      to: YOUR_EMAIL,
      subject: freelancerSubject,
      htmlBody: freelancerBody,
    });

    return ContentService.createTextOutput(
      "Thank you! I've received your project inquiry and will get back to you within 24 hours with a detailed proposal."
    );
  } catch (error) {
    console.error("Project inquiry form error:", error);
    return ContentService.createTextOutput(
      "Something went wrong. Please try again or email me directly at " +
        YOUR_EMAIL
    );
  }
}

/**
 * Client Confirmation Email Template
 */
function createClientEmailTemplate(
  name,
  company,
  projectType,
  budgetRange,
  freelancerName,
  businessName,
  website,
  linkedin,
  phone
) {
  var companyText = company ? ` from ${company}` : "";
  var phoneText = phone
    ? `<li>📞 Phone: <a href="tel:${phone}" style="color: #fff;">${phone}</a></li>`
    : "";

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: 'Inter', 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 650px; margin: 0 auto; border-left: 1px solid #ddd; border-right: 1px solid #ddd; border-top-left-radius: 12px; border-top-right-radius: 12px; overflow: hidden;}
            .header {background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0 0 10px 0; font-size: 28px; font-weight: 700; }
            .header p { margin: 0; font-size: 16px; opacity: 0.9; }
            .content { background: white; padding: 40px 30px; }
            .highlight-box { background: linear-gradient(135deg, #f7fafc, #edf2f7); padding: 25px; border-left: 5px solid #667eea; margin: 25px 0; border-radius: 8px; }
            .project-summary { background: #f8f9fa; padding: 20px; border-radius: 12px; margin: 25px 0; border: 1px solid #e9ecef; }
            .project-summary h3 { color: #2d3748; margin: 0 0 15px 0; font-size: 18px; }
            .project-item { margin: 10px 0; }
            .project-item strong { color: #4a5568; }
            .next-steps { background: linear-gradient(135deg, #e3f2fd, #f3e5f5); padding: 25px; border-radius: 12px; margin: 25px 0; border: 1px solid #90caf9; }
            .next-steps h3 { color: #1565c0; margin: 0 0 15px 0; }
            .next-steps ol { margin: 10px 0 0 20px; }
            .next-steps li { margin: 8px 0; color: #424242; }
            .contact-section { background: #667eea; color: white; padding: 25px; border-radius: 12px; margin: 25px 0; }
            .contact-section h3 { margin: 0 0 15px 0; }
            .contact-section ul { list-style: none; padding: 0; margin: 0; }
            .contact-section li { margin: 10px 0; }
            .contact-section a { color: #b3d9ff; text-decoration: none; }
            .contact-section a:hover { text-decoration: underline; }
            .btn { display: inline-block; background: linear-gradient(135deg, #667eea, #764ba2); color: white !important; padding: 14px 28px; text-decoration: none; border-radius: 8px; margin: 10px 10px 10px 0; font-weight: 600; }
            .btn:hover { opacity: 0.9; }
            .btn-outline { background: transparent; border: 2px solid #667eea; color: #667eea !important; }
            .footer { background: #f8f9fa; padding: 30px; text-align: center; color: #6c757d; font-size: 14px; }
            .footer p { margin: 5px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Thanks for Your Project Inquiry!</h1>
                <p>I'm excited to potentially work with you on this project</p>
            </div>
            <div class="content">
                <p>Hi ${name}${companyText},</p>
                
                <p>Thank you for reaching out about your <strong>${projectType}</strong> project! I've received your inquiry and I'm excited about the opportunity to help bring your vision to life.</p>
                
                <div class="project-summary">
                    <h3> Project Summary</h3>
                    <div class="project-item"><strong>Project Type:</strong> ${projectType}</div>
                    <div class="project-item"><strong>Budget Range:</strong> ${budgetRange}</div>
                    ${
                      company
                        ? `<div class="project-item"><strong>Company:</strong> ${company}</div>`
                        : ""
                    }
                </div>
                
                <div class="highlight-box">
                    <p><strong>🎯 What Makes Me Different:</strong></p>
                    <p>I don't just deliver projects – I deliver results. With a focus on quality, communication, and meeting deadlines, I ensure every client gets exactly what they envisioned (and often more!).</p>
                </div>
                
                <div class="next-steps">
                    <h3>What Happens Next?</h3>
                    <ol>
                        <li><strong>Review & Analysis:</strong> I'll thoroughly review your project requirements</li>
                        <li><strong>Custom Proposal:</strong> Within 24 hours, you'll receive a detailed proposal with timeline and pricing</li>
                        <li><strong>Discovery Call:</strong> We'll schedule a call to discuss your project in detail</li>
                        <li><strong>Project Kickoff:</strong> Once approved, we'll get started immediately!</li>
                    </ol>
                </div>
                
                <p>In the meantime, feel free to check out some of my recent work and client testimonials on my portfolio. I'm confident you'll love what you see!</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${website}" class="btn">View My Portfolio</a>
                    <a href="${linkedin}" class="btn btn-outline">Connect on LinkedIn</a>
                </div>
                
                <div class="contact-section">
                    <h3>Let's Connect</h3>
                    <ul>
                        <li>🌐 Portfolio: <a href="${website}">${website}</a></li>
                        <li>💼 LinkedIn: <a href="${linkedin}">Connect with me</a></li>
                        <li>📧 Email: Reply to this email anytime</li>
                        ${phoneText}
                    </ul>
                    <p style="margin-top: 20px; font-size: 14px; opacity: 0.9;">Have questions before our call? Don't hesitate to reach out!</p>
                </div>
                
                <p>Looking forward to creating something amazing together!</p>
                
                <p>Best regards,<br>
                <strong>${freelancerName}</strong><br>
                <em>${businessName}</em></p>
            </div>
            <div class="footer">
                <p>This email was sent automatically from my project inquiry form.</p>
                <p>You're receiving this because you submitted a project inquiry at ${website}</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

/**
 * Freelancer Lead Notification Email Template
 */
function createFreelancerEmailTemplate(
  name,
  email,
  company,
  projectType,
  budgetRange,
  timeline,
  projectDescription,
  additionalInfo,
  sheetId
) {
  var companyText = company ? ` (${company})` : "";
  var timelineText = timeline ? timeline : "Not specified";
  var additionalText = additionalInfo ? additionalInfo : "None provided";

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: 'Inter', 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 750px; margin: 0 auto; border-left: 1px solid #ddd; border-right: 1px solid #ddd; border-top-left-radius: 12px; border-top-right-radius: 12px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; }
            .header h1 { margin: 0 0 10px 0; font-size: 24px; font-weight: 700; }
            .header p { margin: 0; font-size: 16px; opacity: 0.9; }
            .content { background: white; padding: 30px; }
            .lead-quality { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 14px; margin: 0 0 20px 0; }
            .client-info { background: #f8f9fa; padding: 25px; border-radius: 12px; margin: 20px 0; border: 1px solid #e9ecef; }
            .client-info table { width: 100%; border-collapse: collapse; }
            .client-info td { padding: 8px 10px; border-bottom: 1px solid #e9ecef; }
            .client-info td.label { font-weight: bold; color: #495057; width: 30%; }
            .client-info td.value { color: #2d3748; }
            .project-details { background: #fff3cd; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 5px solid #ffc107; }
            .project-details h3 { color: #856404; margin: 0 0 15px 0; }
            .description-box { background: white; padding: 20px; border-radius: 8px; border: 1px solid #ffeaa7; margin: 10px 0; }
            .description-text { color: #2d3748; font-style: italic; line-height: 1.6; }
            .btn-group { text-align: center; margin: 20px 0; }
            .btn { display: inline-block; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 5px; font-weight: 600; font-size: 14px; color: white !important; }
            .btn-primary { background: #007bff; }
            .btn-success { background: #28a745; }
            .btn-info { background: #17a2b8; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 14px; border-top: 1px solid #ddd; }
            @media (max-width: 600px) {
                .client-info td.label, .client-info td.value { display: block; width: 100%; }
                .client-info td { border-bottom: none; }
                .btn-group .btn { display: block; margin: 5px auto; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1> New Project Lead Alert!</h1>
                <p>Someone is interested in working with you</p>
            </div>
            <div class="content">
                
                <p><strong>Great news!</strong> You've received a new project inquiry for a <strong>${projectType}</strong> project with a budget of <strong>${budgetRange}</strong>.</p>
                
                <div class="client-info">
                    <h3>Client Information</h3>
                    <table>
                        <tr>
                            <td class="label">Name</td>
                            <td class="value">${name}${companyText}</td>
                        </tr>
                        <tr>
                            <td class="label">Email</td>
                            <td class="value"><a href="mailto:${email}" style="color: #007bff;">${email}</a></td>
                        </tr>
                        <tr>
                            <td class="label">Project Type</td>
                            <td class="value">${projectType}</td>
                        </tr>
                        <tr>
                            <td class="label">Budget Range</td>
                            <td class="value">${budgetRange}</td>
                        </tr>
                        <tr>
                            <td class="label">Timeline</td>
                            <td class="value">${timelineText}</td>
                        </tr>
                        <tr>
                            <td class="label">Submitted</td>
                            <td class="value">${new Date().toLocaleString()}</td>
                        </tr>
                    </table>
                </div>
                
                <div class="project-details">
                    <h3>Project Description</h3>
                    <div class="description-box">
                        <div class="description-text">"${projectDescription}"</div>
                    </div>
                    
                    ${
                      additionalInfo
                        ? `
                    <h4 style="margin-top: 20px; color: #856404;">Additional Information:</h4>
                    <div class="description-box">
                        <div class="description-text">"${additionalText}"</div>
                    </div>
                    `
                        : ""
                    }
                </div>
                
                <div class="btn-group">
                    <a href="mailto:${email}?subject=Re: Your ${projectType} Project Inquiry&body=Hi ${name},%0D%0A%0D%0AThank you for your interest in working together on your ${projectType} project. I've reviewed your requirements and I'm excited about the opportunity to help bring your vision to life.%0D%0A%0D%0ABased on your project description and budget range of ${budgetRange}, I believe I can deliver exactly what you're looking for.%0D%0A%0D%0AWould you be available for a brief 15-minute call this week to discuss your project in more detail?%0D%0A%0D%0ABest regards," class="btn btn-primary">Reply to Client</a>
                    <a href="https://docs.google.com/spreadsheets/d/${sheetId}" class="btn btn-success">View All Leads</a>
                    <a href="tel:${email}" class="btn btn-info">Save Contact</a>
                </div>
                  
            </div>
            <div class="footer">
                <p>All project inquiries are automatically saved to your <a href="https://docs.google.com/spreadsheets/d/${sheetId}" style="color: #007bff;">Lead Tracking Sheet</a></p>
                <p>Manage your notification settings in Google Apps Script</p>
            </div>
        </div>
    </body>
    </html>
  `;
}
