/**
 * Tutoring Session Booking Form Handler
 * Perfect for tutors, mentors, and coaches
 */
function doPost(e) {
  var SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE"; // Replace with YOUR Google Sheet ID

  var YOUR_EMAIL = "tutor@example.com"; // Replace with YOUR email address

  var YOUR_NAME = "Your Full Name"; // Replace with YOUR name

  var TUTOR_TITLE = "Math & Science Tutor"; // Replace with your tutoring specialty

  var YOUR_WEBSITE = "https://your-tutoring-website.com"; // Replace with your website

  var YOUR_PHONE = "+1 (555) 123-4567"; // Replace with your phone number

  var HOURLY_RATE = "$50/hour"; // Replace with your rates

  var LOCATION_INFO = "Online via Zoom or In-person in Downtown Area"; // Your location details

  try {
    // Connect to Google Sheet
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName("Sheet1"); // Make sure sheet name matches

    // Extract form data
    var studentName = e.parameter.student_name || "";
    var parentEmail = e.parameter.parent_email || "";
    var parentPhone = e.parameter.parent_phone || "";
    var subject = e.parameter.subject || "";
    var preferredDateTime = e.parameter.preferred_date_time || "";
    var additionalNotes = e.parameter.additional_notes || "";

    // Validate required fields
    if (
      !studentName.trim() ||
      !parentEmail.trim() ||
      !subject.trim() ||
      !preferredDateTime.trim()
    ) {
      return ContentService.createTextOutput(
        "Please fill in all required fields!"
      );
    }

    // Store data in Google Sheet
    sheet.appendRow([
      new Date(),
      studentName.trim(),
      parentEmail.trim(),
      parentPhone.trim(),
      subject.trim(),
      preferredDateTime.trim(),
      additionalNotes.trim(),
    ]);

    // Send Confirmation Email to Parent
    var parentSubject = `Tutoring Session Request Received - ${studentName}`;
    var parentBody = createParentEmailTemplate(
      studentName,
      subject,
      preferredDateTime,
      YOUR_NAME,
      TUTOR_TITLE,
      YOUR_WEBSITE,
      YOUR_PHONE,
      HOURLY_RATE,
      LOCATION_INFO
    );

    MailApp.sendEmail({
      to: parentEmail,
      subject: parentSubject,
      htmlBody: parentBody,
    });

    // Send Booking Notification Email to Tutor
    var tutorSubject = `📚 New Tutoring Session Request - ${subject} for ${studentName}`;
    var tutorBody = createTutorEmailTemplate(
      studentName,
      parentEmail,
      parentPhone,
      subject,
      preferredDateTime,
      additionalNotes,
      SPREADSHEET_ID
    );

    MailApp.sendEmail({
      to: YOUR_EMAIL,
      subject: tutorSubject,
      htmlBody: tutorBody,
    });

    return ContentService.createTextOutput(
      "Thank you! Your tutoring session request has been received. I'll contact you within 24 hours to confirm the details."
    );
  } catch (error) {
    console.error("Tutoring booking form error:", error);
    return ContentService.createTextOutput(
      "Something went wrong. Please try again or contact me directly at " +
        YOUR_EMAIL
    );
  }
}

/**
 * Parent/Student Confirmation Email Template
 */
function createParentEmailTemplate(
  studentName,
  subject,
  preferredDateTime,
  tutorName,
  tutorTitle,
  website,
  phone,
  hourlyRate,
  locationInfo
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: 'Inter', 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 650px; margin: 0 auto; border-left: 1px solid #ddd; border-right: 1px solid #ddd; border-top-left-radius: 12px; border-top-right-radius: 12px; overflow: hidden;}
            .header {background: linear-gradient(135deg, #4c51bf 0%, #667eea 100%); color: white; padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0 0 10px 0; font-size: 28px; font-weight: 700; }
            .header p { margin: 0; font-size: 16px; opacity: 0.9; }
            .content { background: white; padding: 40px 30px; }
            .booking-summary { background: linear-gradient(135deg, #f7fafc, #edf2f7); padding: 25px; border-left: 5px solid #4c51bf; margin: 25px 0; border-radius: 8px; }
            .booking-summary h3 { color: #2d3748; margin: 0 0 15px 0; font-size: 18px; }
            .booking-item { margin: 10px 0; }
            .booking-item strong { color: #4a5568; }
            .next-steps { background: linear-gradient(135deg, #e6fffa, #f0fff4); padding: 25px; border-radius: 12px; margin: 25px 0; border: 1px solid #68d391; }
            .next-steps h3 { color: #2f855a; margin: 0 0 15px 0; }
            .next-steps ol { margin: 10px 0 0 20px; }
            .next-steps li { margin: 8px 0; color: #2d3748; }
            .tutor-info { background: #4c51bf; color: white; padding: 25px; border-radius: 12px; margin: 25px 0; }
            .tutor-info h3 { margin: 0 0 15px 0; }
            .tutor-info ul { list-style: none; padding: 0; margin: 0; }
            .tutor-info li { margin: 10px 0; }
            .tutor-info a { color: #b3d9ff; text-decoration: none; }
            .tutor-info a:hover { text-decoration: underline; }
            .btn { display: inline-block; background: linear-gradient(135deg, #4c51bf, #667eea); color: white !important; padding: 14px 28px; text-decoration: none; border-radius: 8px; margin: 10px 10px 10px 0; font-weight: 600; }
            .btn:hover { opacity: 0.9; }
            .btn-outline { background: transparent; border: 2px solid #4c51bf; color: #4c51bf !important; }
            .footer { background: #f8f9fa; padding: 30px; text-align: center; color: #6c757d; font-size: 14px; }
            .footer p { margin: 5px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📚 Tutoring Session Request Received!</h1>
                <p>Thank you for choosing personalized learning</p>
            </div>
            <div class="content">
                <p>Hello,</p>
                
                <p>Thank you for submitting a tutoring session request for <strong>${studentName}</strong>! I'm excited to help with their ${subject} learning journey.</p>
                
                <div class="booking-summary">
                    <h3>📋 Session Request Summary</h3>
                    <div class="booking-item"><strong>Student:</strong> ${studentName}</div>
                    <div class="booking-item"><strong>Subject:</strong> ${subject}</div>
                    <div class="booking-item"><strong>Preferred Time:</strong> ${preferredDateTime}</div>
                    <div class="booking-item"><strong>Session Type:</strong> ${locationInfo}</div>
                    <div class="booking-item"><strong>Rate:</strong> ${hourlyRate}</div>
                </div>
                
                <div class="next-steps">
                    <h3>🚀 What Happens Next?</h3>
                    <ol>
                        <li><strong>Confirmation Call:</strong> I'll contact you within 24 hours to confirm details</li>
                        <li><strong>Schedule Setup:</strong> We'll finalize the date, time, and location/platform</li>
                        <li><strong>Learning Plan:</strong> I'll create a personalized approach based on ${studentName}'s needs</li>
                        <li><strong>Session Prep:</strong> I'll send any materials or prep instructions before our first meeting</li>
                    </ol>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${website}" class="btn">Learn More About My Teaching</a>
                    <a href="tel:${phone}" class="btn btn-outline">Call Me Directly</a>
                </div>
                
                <div class="tutor-info">
                    <h3>📞 Contact Information</h3>
                    <ul>
                        <li>🌐 Website: <a href="${website}">${website}</a></li>
                        <li>📧 Email: Reply to this email anytime</li>
                        <li>📞 Phone: <a href="tel:${phone}">${phone}</a></li>
                        <li>💼 Specialty: ${tutorTitle}</li>
                    </ul>
                    <p style="margin-top: 20px; font-size: 14px; opacity: 0.9;">Feel free to reach out with any questions before our session!</p>
                </div>
                
                <p><strong>Important:</strong> If you need to reschedule or have any questions, please contact me as soon as possible. I'm committed to providing the best learning experience for ${studentName}.</p>
                
                <p>Looking forward to helping ${studentName} achieve their academic goals!</p>
                
                <p>Best regards,<br>
                <strong>${tutorName}</strong><br>
                <em>${tutorTitle}</em></p>
            </div>
            <div class="footer">
                <p>This confirmation was sent automatically from my tutoring booking system.</p>
                <p>You can reply directly to this email if you have any questions.</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

/**
 * Tutor Booking Notification Email Template
 */
function createTutorEmailTemplate(
  studentName,
  parentEmail,
  parentPhone,
  subject,
  preferredDateTime,
  additionalNotes,
  sheetId
) {
  var phoneText = parentPhone ? parentPhone : "Not provided";
  var notesText = additionalNotes ? additionalNotes : "None provided";

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: 'Inter', 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 750px; margin: 0 auto; border-left: 1px solid #ddd; border-right: 1px solid #ddd; border-top-left-radius: 12px; border-top-right-radius: 12px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #38a169 0%, #48bb78 100%); color: white; padding: 30px; text-align: center; }
            .header h1 { margin: 0 0 10px 0; font-size: 24px; font-weight: 700; }
            .header p { margin: 0; font-size: 16px; opacity: 0.9; }
            .content { background: white; padding: 30px; }
            .priority-high { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 14px; margin: 0 0 20px 0; background: #fed7d7; color: #c53030; }
            .student-info { background: #f8f9fa; padding: 25px; border-radius: 12px; margin: 20px 0; border: 1px solid #e9ecef; }
            .student-info table { width: 100%; border-collapse: collapse; }
            .student-info td { padding: 8px 10px; border-bottom: 1px solid #e9ecef; }
            .student-info td.label { font-weight: bold; color: #495057; width: 30%; }
            .student-info td.value { color: #2d3748; }
            .session-details { background: #fff3cd; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 5px solid #ffc107; }
            .session-details h3 { color: #856404; margin: 0 0 15px 0; }
            .notes-box { background: white; padding: 20px; border-radius: 8px; border: 1px solid #ffeaa7; margin: 10px 0; }
            .notes-text { color: #2d3748; font-style: italic; line-height: 1.6; }
            .btn-group { text-align: center; margin: 20px 0; }
            .btn { display: inline-block; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 5px; font-weight: 600; font-size: 14px; color: white !important; }
            .btn-primary { background: #007bff; }
            .btn-success { background: #28a745; }
            .btn-info { background: #17a2b8; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 14px; border-top: 1px solid #ddd; }
            @media (max-width: 600px) {
                .student-info td.label, .student-info td.value { display: block; width: 100%; }
                .student-info td { border-bottom: none; }
                .btn-group .btn { display: block; margin: 5px auto; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>New Tutoring Session Request!</h1>
                <p>A parent has requested tutoring for their child</p>
            </div>
            <div class="content">
                
                <p><strong>You have a new tutoring session request!</strong> A parent has submitted a booking for <strong>${subject}</strong> tutoring.</p>
                
                <div class="student-info">
                    <h3>Student & Parent Information</h3>
                    <table>
                        <tr>
                            <td class="label">Student Name</td>
                            <td class="value">${studentName}</td>
                        </tr>
                        <tr>
                            <td class="label">Parent Email</td>
                            <td class="value"><a href="mailto:${parentEmail}" style="color: #007bff;">${parentEmail}</a></td>
                        </tr>
                        <tr>
                            <td class="label">Parent Phone</td>
                            <td class="value">${phoneText}</td>
                        </tr>
                        <tr>
                            <td class="label">Subject</td>
                            <td class="value">${subject}</td>
                        </tr>
                        <tr>
                            <td class="label">Preferred Date/Time</td>
                            <td class="value">${preferredDateTime}</td>
                        </tr>
                        <tr>
                            <td class="label">Request Received</td>
                            <td class="value">${new Date().toLocaleString()}</td>
                        </tr>
                    </table>
                </div>
                
                ${
                  additionalNotes
                    ? `
                <div class="session-details">
                    <h3>Additional Notes & Requirements</h3>
                    <div class="notes-box">
                        <div class="notes-text">"${notesText}"</div>
                    </div>
                </div>
                `
                    : ""
                }
                
                <div class="btn-group">
                    <a href="mailto:${parentEmail}?subject=Tutoring Session Confirmation for ${studentName}&body=Hi,%0D%0A%0D%0AThank you for your interest in ${subject} tutoring for ${studentName}. I've received your request for ${preferredDateTime}.%0D%0A%0D%0AI'm excited to help ${studentName} with their learning goals. Let me confirm a few details:%0D%0A%0D%0A• Session Date/Time: ${preferredDateTime}%0D%0A• Subject Focus: ${subject}%0D%0A• Location: [Please specify: Online via Zoom or In-person]%0D%0A• Session Duration: [Usually 1-2 hours]%0D%0A%0D%0APlease reply to confirm these details and we can get started!%0D%0A%0D%0ABest regards," class="btn btn-primary">Confirm Session</a>
                    <a href="https://docs.google.com/spreadsheets/d/${sheetId}" class="btn btn-success">View All Bookings</a>
                    <a href="tel:${parentEmail}" class="btn btn-info">Save Contact</a>
                </div>
                  
            </div>
            <div class="footer">
                <p>All tutoring requests are automatically saved to your <a href="https://docs.google.com/spreadsheets/d/${sheetId}" style="color: #007bff;">Booking Management Sheet</a></p>
                <p>Remember to follow up within 24 hours to maintain professionalism</p>
            </div>
        </div>
    </body>
    </html>
  `;
}
