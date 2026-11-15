/**
 * =========================================================================
 * MANIKANTA GHEE — AYYAPPA DAIRY FARM
 * GOOGLE APPS SCRIPT AUTOMATED EMAIL WEBHOOK (100% FREE FOREVER)
 * =========================================================================
 * 
 * FEATURES:
 * 1. Dispatches luxury HTML Welcome Email when customer subscribes to newsletter.
 * 2. Dispatches Order Confirmation Email with item breakdown to the customer.
 * 3. Alerts the business owner (ayyappadairyfarms@gmail.com) on new orders and contact inquiries.
 * 4. Logs all events into Google Sheets automatically.
 * 
 * -------------------------------------------------------------------------
 * QUICK 3-MINUTE SETUP GUIDE:
 * 1. Open Google Sheets (https://sheets.new) and create a new blank spreadsheet.
 * 2. Name the sheet "Manikanta Ghee Orders & Subscribers".
 * 3. In the top menu, click Extensions > Apps Script.
 * 4. Delete any code in the editor, and paste THIS ENTIRE FILE.
 * 5. Update OWNER_EMAIL below if needed (currently set to ayyappadairyfarms@gmail.com).
 * 6. Click the blue "Deploy" button (top right) > "New deployment".
 * 7. Click the gear icon next to "Select type" and choose "Web app".
 * 8. In "Who has access", select "Anyone" (VERY IMPORTANT!).
 * 9. Click "Deploy", approve Google permissions.
 * 10. Copy the Web app URL (starts with https://script.google.com/macros/s/...)
 * 11. Paste that URL into your .env file:
 *     VITE_GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/.../exec"
 * =========================================================================
 */

var OWNER_EMAIL = "ayyappadairyfarms@gmail.com";
var BRAND_NAME = "MANIKANTA GHEE";
var SENDER_NAME = "MANIKANTA GHEE — Ayyappa Dairy Farm";

function doPost(e) {
  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    var action = data.action || "";

    // 1. NEWSLETTER SUBSCRIPTION
    if (action === "newsletter") {
      sendNewsletterWelcome(data.email);
      logToSheet("Subscribers", [new Date(), data.email, "Website Footer Newsletter"]);
      return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Welcome email sent" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 2. ORDER CONFIRMATION
    if (action === "order") {
      sendOrderConfirmation(data);
      sendOwnerOrderAlert(data);
      logToSheet("Orders", [
        new Date(),
        data.orderId,
        data.customerName,
        data.customerEmail,
        data.customerPhone,
        data.total,
        data.paymentMethod,
        data.shippingAddress
      ]);
      return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Order processed" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 3. CONTACT FORM INQUIRY
    if (action === "inquiry") {
      sendContactInquiryToOwner(data);
      logToSheet("Inquiries", [
        new Date(),
        data.fullName,
        data.email,
        data.phone,
        data.subject,
        data.message
      ]);
      return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Inquiry forwarded" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "ignored" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Sends a luxury HTML welcome email to the subscriber
 */
function sendNewsletterWelcome(toEmail) {
  var subject = "Welcome to MANIKANTA GHEE — The Golden Essence of Tradition";
  
  var htmlBody = "" +
    "<div style='background-color:#F4EBDD; padding:40px 15px; font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif; color:#432713;'>" +
      "<div style='max-width:600px; margin:0 auto; background-color:#FFFDF8; border-radius:20px; overflow:hidden; border:1px solid #E7DCCB; box-shadow:0 4px 20px rgba(67, 39, 19, 0.08);'>" +
        
        // Header
        "<div style='background-color:#432713; padding:32px 24px; text-align:center; border-bottom:3px solid #C49A45;'>" +
          "<h1 style='color:#FFFDF8; font-family: Georgia, serif; font-size:26px; margin:0; letter-spacing:0.12em; text-transform:uppercase;'>MANIKANTA GHEE</h1>" +
          "<p style='color:#C49A45; font-size:11px; margin:8px 0 0; text-transform:uppercase; letter-spacing:0.25em; font-weight:600;'>Tradition • Purity • Quality</p>" +
          "<p style='color:#E7DCCB; font-size:11px; margin:4px 0 0; font-style:italic;'>Ayyappa Dairy Farm</p>" +
        "</div>" +

        // Body Content
        "<div style='padding:36px 30px;'>" +
          "<h2 style='font-family: Georgia, serif; color:#432713; font-size:22px; font-weight:600; margin-top:0;'>Welcome to Our Dairy Circle</h2>" +
          "<p style='font-size:14px; line-height:1.7; color:#66594D;'>" +
            "Thank you for connecting with <strong>MANIKANTA GHEE</strong>. We specialize exclusively in pure Indian water buffalo ghee, honoring sacred Vedic culinary roots." +
          "</p>" +

          // 3 Highlights Box
          "<div style='background-color:#F4EBDD; border-left:4px solid #C49A45; padding:18px 20px; border-radius:8px; margin:24px 0;'>" +
            "<p style='margin:0 0 10px; font-size:13px; color:#432713;'><strong>Why Our Buffalo Ghee is Revered:</strong></p>" +
            "<ul style='margin:0; padding-left:18px; font-size:13px; color:#66594D; line-height:1.7;'>" +
              "<li><strong>100% Buffalo Milk Only:</strong> Strictly zero cow milk blending.</li>" +
              "<li><strong>Traditional A2 Bilona Method:</strong> Slow-churned from whole cultured curd.</li>" +
              "<li><strong>Naturally Danedar (Grainy):</strong> Golden crystalline texture with 250°C smoke point.</li>" +
            "</ul>" +
          "</div>" +

          "<p style='font-size:14px; line-height:1.7; color:#66594D;'>" +
            "As a subscriber, you will receive first privilege access to our seasonal small-batch churnings, festival bookings, and traditional culinary recipes." +
          "</p>" +

          // Button
          "<div style='text-align:center; margin:32px 0 16px;'>" +
            "<a href='http://localhost:5173/shop' style='background-color:#C49A45; color:#FFFDF8; padding:14px 28px; font-size:13px; font-weight:bold; text-transform:uppercase; letter-spacing:0.12em; text-decoration:none; border-radius:10px; display:inline-block; box-shadow:0 3px 10px rgba(196, 154, 69, 0.3);'>Explore Buffalo Ghee Jars</a>" +
          "</div>" +
        "</div>" +

        // Footer
        "<div style='background-color:#F4EBDD; padding:20px; text-align:center; border-top:1px solid #E7DCCB; font-size:11px; color:#66594D;'>" +
          "<p style='margin:0;'><strong>MANIKANTA GHEE • Ayyappa Dairy Farm</strong></p>" +
          "<p style='margin:4px 0 0;'>Customer Care: +91 6303328180 | " + OWNER_EMAIL + "</p>" +
          "<p style='margin:8px 0 0; color:#8C7B6E;'>You received this email because you subscribed on our official website.</p>" +
        "</div>" +

      "</div>" +
    "</div>";

  GmailApp.sendEmail(toEmail, subject, "", {
    name: SENDER_NAME,
    htmlBody: htmlBody
  });
}

/**
 * Sends order confirmation to the customer
 */
function sendOrderConfirmation(order) {
  var subject = "Order Confirmed #" + order.orderId + " — MANIKANTA GHEE";
  
  var itemsHtml = "";
  if (order.items && order.items.length) {
    for (var i = 0; i < order.items.length; i++) {
      var item = order.items[i];
      itemsHtml += "<tr>" +
        "<td style='padding:10px 0; border-bottom:1px solid #E7DCCB; font-size:13px; color:#432713;'>" + item.name + " (" + item.size + ") × " + item.quantity + "</td>" +
        "<td style='padding:10px 0; border-bottom:1px solid #E7DCCB; font-size:13px; color:#432713; text-align:right; font-weight:bold;'>₹" + (item.price * item.quantity) + "</td>" +
      "</tr>";
    }
  }

  var htmlBody = "" +
    "<div style='background-color:#F4EBDD; padding:40px 15px; font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif; color:#432713;'>" +
      "<div style='max-width:600px; margin:0 auto; background-color:#FFFDF8; border-radius:20px; overflow:hidden; border:1px solid #E7DCCB;'>" +
        
        // Header
        "<div style='background-color:#432713; padding:28px 24px; text-align:center; border-bottom:3px solid #C49A45;'>" +
          "<h1 style='color:#FFFDF8; font-family: Georgia, serif; font-size:24px; margin:0;'>MANIKANTA GHEE</h1>" +
          "<p style='color:#C49A45; font-size:11px; margin:6px 0 0; text-transform:uppercase; letter-spacing:0.2em;'>Order Confirmed • #" + order.orderId + "</p>" +
        "</div>" +

        "<div style='padding:30px;'>" +
          "<h2 style='font-family: Georgia, serif; color:#432713; font-size:20px; margin-top:0;'>Thank You, " + (order.customerName || "Patron") + "!</h2>" +
          "<p style='font-size:13px; line-height:1.6; color:#66594D;'>" +
            "Your pure buffalo ghee order has been received and verified. Our team is carefully packing your jars in shock-resistant protective cushions for transit." +
          "</p>" +

          // Order Table
          "<div style='background-color:#F4EBDD; padding:20px; border-radius:12px; margin:20px 0;'>" +
            "<table style='width:100%; border-collapse:collapse;'>" +
              itemsHtml +
              "<tr>" +
                "<td style='padding:12px 0 0; font-size:14px; font-weight:bold; color:#432713;'>Total Paid (" + order.paymentMethod + ")</td>" +
                "<td style='padding:12px 0 0; font-size:16px; font-weight:bold; color:#C49A45; text-align:right;'>₹" + order.total + "</td>" +
              "</tr>" +
            "</table>" +
          "</div>" +

          "<p style='font-size:12px; color:#66594D;'><strong>Shipping Address:</strong><br>" + (order.shippingAddress || "Provided during checkout") + "</p>" +
          "<p style='font-size:12px; color:#66594D;'>Questions regarding dispatch? WhatsApp us at: <strong>+91 6303328180</strong></p>" +
        "</div>" +

      "</div>" +
    "</div>";

  GmailApp.sendEmail(order.customerEmail, subject, "", {
    name: SENDER_NAME,
    htmlBody: htmlBody
  });
}

/**
 * Alerts the store owner when a new order arrives
 */
function sendOwnerOrderAlert(order) {
  var subject = "🚨 NEW ORDER ALERT #" + order.orderId + " — ₹" + order.total + " (MANIKANTA GHEE)";
  var body = "NEW ORDER RECEIVED ON MANIKANTA GHEE STORE:\n\n" +
    "Order ID: " + order.orderId + "\n" +
    "Customer: " + order.customerName + " (" + order.customerPhone + " / " + order.customerEmail + ")\n" +
    "Total: ₹" + order.total + " via " + order.paymentMethod + "\n" +
    "Address: " + order.shippingAddress + "\n" +
    "Time: " + new Date().toLocaleString() + "\n\n" +
    "View your admin dashboard at: http://localhost:5173/admin";

  GmailApp.sendEmail(OWNER_EMAIL, subject, body, {
    name: "MANIKANTA GHEE Store Alerts"
  });
}

/**
 * Forwards customer contact inquiries to the store owner
 */
function sendContactInquiryToOwner(inquiry) {
  var subject = "📩 New Contact Inquiry from " + inquiry.fullName + " — [" + inquiry.subject + "]";
  var body = "CUSTOMER CONTACT MESSAGE RECEIVED:\n\n" +
    "Name: " + inquiry.fullName + "\n" +
    "Email: " + inquiry.email + "\n" +
    "Phone: " + inquiry.phone + "\n" +
    "Subject: " + inquiry.subject + "\n" +
    "Message:\n" + inquiry.message + "\n\n" +
    "Received on: " + new Date().toLocaleString();

  GmailApp.sendEmail(OWNER_EMAIL, subject, body, {
    name: "MANIKANTA GHEE Customer Care"
  });
}

/**
 * Helper to log records to Google Sheets
 */
function logToSheet(sheetName, rowArray) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) return;
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }
    sheet.appendRow(rowArray);
  } catch (err) {
    // If running as standalone script without bound spreadsheet, continue gracefully
  }
}
