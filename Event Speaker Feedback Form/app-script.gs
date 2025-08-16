/**
 * Event Speaker Feedback Form Handler
 * Perfect for public speakers and workshop trainers
 */
function doPost(e) {
  var SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE"; // Replace with YOUR Google Sheet ID

  var YOUR_EMAIL = "your-email@gmail.com"; // Replace with YOUR email address

  var YOUR_NAME = "Your Full Name"; // Replace with YOUR name

  var SPEAKER_WEBSITE = "https://your-speaker-website.com"; // Replace with your speaker profile or website

  var LINKEDIN_URL = "https://linkedin.com/in/your-profile"; // Replace with your LinkedIn profile URL

  // Replace with session materials link (leave empty if no materials)
  var SESSION_MATERIALS = "https://drive.google.com/your-materials-link";

  try {
    // Connect to Google Sheet
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName("Sheet1"); // Make sure sheet name matches

    // Extract form data
    var name = e.parameter.name || "Anonymous";
    var email = e.parameter.email || "";
    var rating = e.parameter.rating || "";
    var whatLiked = e.parameter.what_liked || "";
    var suggestions = e.parameter.suggestions || "";
    var attendAgain = e.parameter.attend_again || "";

    // Validate required fields (only email is required)
    if (!email.trim()) {
      return ContentService.createTextOutput(
        "Please provide your email address!"
      );
    }

    // Store data in Google Sheet (updated to include rating)
    sheet.appendRow([
      new Date(),
      name.trim(),
      email.trim(),
      rating,
      whatLiked.trim(),
      suggestions.trim(),
      attendAgain,
    ]);

    // Send Thank You Email to Attendee
    var attendeeSubject = "Thank you for your feedback!";
    var attendeeBody = createAttendeeEmailTemplate(
      name,
      YOUR_NAME,
      SPEAKER_WEBSITE,
      LINKEDIN_URL,
      SESSION_MATERIALS
    );

    MailApp.sendEmail({
      to: email,
      subject: attendeeSubject,
      htmlBody: attendeeBody,
    });

    // Send Feedback Notification Email to You
    var speakerSubject = `New Speaker Feedback from ${
      name !== "Anonymous" ? name : "an attendee"
    }`;
    var speakerBody = createSpeakerEmailTemplate(
      name,
      email,
      rating,
      whatLiked,
      suggestions,
      attendAgain,
      SPREADSHEET_ID
    );

    MailApp.sendEmail({
      to: YOUR_EMAIL,
      subject: speakerSubject,
      htmlBody: speakerBody,
    });

    return ContentService.createTextOutput(
      "Thank you for your valuable feedback! Your insights help me improve."
    );
  } catch (error) {
    console.error("Feedback form error:", error);
    return ContentService.createTextOutput(
      "Something went wrong. Please try again or email me directly."
    );
  }
}

/**
 * Thank You Email Template for Attendees
 */
function createAttendeeEmailTemplate(
  name,
  speakerName,
  speakerWebsite,
  linkedinUrl,
  sessionMaterials
) {
  var greeting = name !== "Anonymous" ? `Hi ${name}` : "Hi there";

  // Check if session materials link is provided
  var hasMaterials = sessionMaterials && sessionMaterials.trim() !== "";

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: white; padding: 30px 20px; border: 1px solid #e0e0e0; border-top: none; }
            .highlight-box { background: #fff5f5; padding: 20px; border-left: 4px solid #ff6b6b; margin: 20px 0; border-radius: 4px; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; color: #666; }
            .btn { display: inline-block; background: #ff6b6b; color: white !important; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
            .btn:hover { background: #ff5252; }
            .btn-linkedin { background: #0077b5; }
            .btn-linkedin:hover { background: #005885; }
            .btn-materials { background: #28a745; }
            .btn-materials:hover { background: #1e7e34; }
            .social-links { text-align: center; margin: 20px 0; }
            .social-links a { margin: 0 10px; color: #ff6b6b; text-decoration: none; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Thank You for Your Feedback!</h1>
                <p>Your insights are incredibly valuable</p>
            </div>
            <div class="content">
                <p>${greeting},</p>
                
                <p>Thank you so much for taking the time to share your feedback about my session! Your thoughts and suggestions are incredibly valuable and help me continuously improve my presentations.</p>
                
                <div class="highlight-box">
                    <p><strong> Why Your Feedback Matters:</strong></p>
                    <p>Every piece of feedback helps me understand what resonates with my audience and where I can enhance the learning experience for future sessions.</p>
                </div>
                
                <p>I'm always striving to deliver more engaging and valuable content. Your input directly influences how I structure future workshops and presentations.</p>
                
                <p><strong>Stay Connected:</strong></p>
                <ul>
                    <li>🌐 Visit my website: <a href="${speakerWebsite}" style="color: #ff6b6b;">${speakerWebsite}</a></li>
                    <li>💼 Connect with me on LinkedIn: <a href="${linkedinUrl}" style="color: #0077b5;">${linkedinUrl}</a></li>
                    <li>📧 Feel free to reach out with any questions</li>
                    <li>🔔 I'll keep you updated on upcoming sessions</li>
                </ul>
                
                <div style="text-align: center; margin: 25px 0;">
                    <a href="${speakerWebsite}" class="btn">Visit My Website</a>
                    <a href="${linkedinUrl}" class="btn btn-linkedin">Connect on LinkedIn</a>
                    ${
                      hasMaterials
                        ? `<a href="${sessionMaterials}" class="btn btn-materials">Download Session Materials</a>`
                        : ""
                    }
                </div>
                
                <p>Thank you again for being such an engaged participant. I hope to see you at future events!</p>
                
                <p>Best regards,<br>
                <strong>${speakerName}</strong></p>
            </div>
            <div class="footer">
                <p>This email was sent automatically from my speaker feedback form.</p>
                <p>If you have any additional thoughts, feel free to reply to this email!</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

/**
 * Feedback Notification Email Template for Speaker
 */
function createSpeakerEmailTemplate(
  name,
  email,
  rating,
  whatLiked,
  suggestions,
  attendAgain,
  sheetId
) {
  var attendAgainIcon =
    attendAgain === "Yes" ? "✅" : attendAgain === "No" ? "❌" : "❓";
  var attendAgainColor =
    attendAgain === "Yes"
      ? "#28a745"
      : attendAgain === "No"
      ? "#dc3545"
      : "#6c757d";

  // Format rating display
  var ratingDisplay = "";
  var ratingColor = "#6c757d";

  if (rating) {
    var ratingNum = parseInt(rating);
    var stars = "★".repeat(ratingNum) + "☆".repeat(5 - ratingNum);

    if (ratingNum >= 4) ratingColor = "#28a745"; // Green for 4-5 stars
    else if (ratingNum >= 3) ratingColor = "#ffc107"; // Yellow for 3 stars
    else ratingColor = "#dc3545"; // Red for 1-2 stars

    ratingDisplay = `<span style="color: ${ratingColor}; font-size: 18px;">${stars}</span> (${ratingNum}/5)`;
  } else {
    ratingDisplay = '<span style="color: #6c757d;">Not provided</span>';
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 700px; margin: 0 auto; padding: 20px; }
            .header { background: #17a2b8; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
            .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .info-table th { background: #f8f9fa; padding: 12px; text-align: left; border: 1px solid #dee2e6; font-weight: 600; }
            .info-table td { padding: 12px; border: 1px solid #dee2e6; }
            .feedback-section { background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0; }
            .positive-feedback { background: #d4edda; border-left: 4px solid #28a745; }
            .improvement-feedback { background: #fff3cd; border-left: 4px solid #ffc107; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; }
            .btn { display: inline-block; color: white !important; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 5px; }
            .btn-primary { background: #007bff; color: white; }
            .btn-success { background: #28a745; color: white; }
            .attend-again { font-weight: bold; padding: 5px 10px; border-radius: 15px; color: white; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>New Speaker Feedback!</h1>
                <p>Fresh insights from your audience</p>
            </div>
            <div class="content">
                <p><strong>You've received new feedback from your recent session!</strong></p>
                
                <table class="info-table">
                    <tr>
                        <th style="width: 25%;">Attendee Info</th>
                        <th>Details</th>
                    </tr>
                    <tr>
                        <td><strong>Name</strong></td>
                        <td>${name}</td>
                    </tr>
                    <tr>
                        <td><strong>Email</strong></td>
                        <td><a href="mailto:${email}" style="color: #007bff;">${email}</a></td>
                    </tr>
                    <tr>
                        <td><strong>Rating</strong></td>
                        <td>${ratingDisplay}</td>
                    </tr>
                    <tr>
                        <td><strong>Would Attend Again?</strong></td>
                        <td><span style="background: ${attendAgainColor}; color: white; padding: 3px 8px; border-radius: 12px; font-size: 12px;">${attendAgainIcon} ${
    attendAgain || "Not specified"
  }</span></td>
                    </tr>
                    <tr>
                        <td><strong>Submitted</strong></td>
                        <td>${new Date().toLocaleString()}</td>
                    </tr>
                </table>
                
                ${
                  whatLiked
                    ? `
                <div class="feedback-section positive-feedback">
                    <h3>🌟 What They Liked Most:</h3>
                    <p style="background: white; padding: 15px; border-radius: 4px; margin: 10px 0;">"${whatLiked}"</p>
                </div>
                `
                    : ""
                }
                
                ${
                  suggestions
                    ? `
                <div class="feedback-section improvement-feedback">
                    <h3>💡 Suggestions for Improvement:</h3>
                    <p style="background: white; padding: 15px; border-radius: 4px; margin: 10px 0;">"${suggestions}"</p>
                </div>
                `
                    : ""
                }
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="mailto:${email}?subject=Thank you for your feedback!" class="btn btn-primary">Send Personal Thank You</a>
                    <a href="https://docs.google.com/spreadsheets/d/${sheetId}" class="btn btn-success">View All Feedback</a>
                </div>
                
            </div>
            <div class="footer">
                <p> All feedback is automatically saved to your <a href="https://docs.google.com/spreadsheets/d/${sheetId}" style="color: #007bff;">Google Sheet</a></p>
                <p>Use this data to track trends and improve your future presentations!</p>
            </div>
        </div>
    </body>
    </html>
  `;
}
