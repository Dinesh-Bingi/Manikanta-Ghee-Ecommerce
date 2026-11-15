import emailjs from '@emailjs/browser';

const googleScriptUrl =
  import.meta.env.VITE_GOOGLE_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbwI0F6MRTX3cKCn029mlH6nVh7ax3LXbr5s2R1647JA4MpA4CVypOAt9x-bXMACgHSH5Q/exec';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

const isEmailJsConfigured =
  serviceId &&
  templateId &&
  publicKey &&
  !serviceId.includes('@') &&
  !publicKey.includes('@');

/**
 * 1. Dispatches Newsletter Welcome Email
 * Uses Google Apps Script webhook (free Gmail dispatch) or EmailJS
 */
export const sendNewsletterWelcomeEmail = async (subscriberEmail: string) => {
  // Option 1: Free Google Apps Script Webhook
  if (googleScriptUrl && googleScriptUrl.startsWith('http')) {
    try {
      await fetch(googleScriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Clean CORS-free dispatch to Google
        headers: {
          'Content-Type': 'text/plain;charset=utf-8' // Permitted in no-cors mode
        },
        body: JSON.stringify({
          action: 'newsletter',
          email: subscriberEmail,
          brandName: 'MANIKANTA GHEE',
          tagline: 'Tradition • Purity • Quality',
          farm: 'Ayyappa Dairy Farm',
          timestamp: new Date().toISOString()
        })
      });
      console.log('Dispatched newsletter email via Google Script webhook to:', subscriberEmail);
      return true;
    } catch (e) {
      console.warn('Google Script dispatch error:', e);
    }
  }

  // Option 2: EmailJS Fallback (if user configured real EmailJS credentials)
  if (isEmailJsConfigured) {
    try {
      const templateParams = {
        to_email: subscriberEmail,
        to_name: subscriberEmail.split('@')[0],
        from_name: 'MANIKANTA GHEE — Ayyappa Dairy Farm',
        brand_name: 'MANIKANTA GHEE',
        tagline: 'Tradition • Purity • Quality',
        message:
          'Thank you for subscribing to MANIKANTA GHEE (Ayyappa Dairy Farm). You are now part of our privileged circle celebrating 100% pure buffalo ghee, slow-churned Vedic Bilona traditions, and exclusive seasonal harvest allocations.'
      };

      const res = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      return res.status === 200;
    } catch (error) {
      console.warn('EmailJS newsletter dispatch error:', error);
      return false;
    }
  }

  return false;
};

/**
 * 2. Dispatches Order Confirmation Email
 */
export const sendOrderConfirmationEmail = async (order: any) => {
  // Option 1: Free Google Apps Script Webhook
  if (googleScriptUrl && googleScriptUrl.startsWith('http')) {
    try {
      await fetch(googleScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({
          action: 'order',
          orderId: order.orderId,
          customerName: order.customer?.fullName,
          customerEmail: order.customer?.email,
          customerPhone: order.customer?.phone,
          shippingAddress: `${order.customer?.addressLine1}, ${order.customer?.city}, ${order.customer?.state} - ${order.customer?.pincode}`,
          total: order.total,
          paymentMethod: order.paymentMethod,
          items: order.items,
          timestamp: new Date().toISOString()
        })
      });
      return true;
    } catch (e) {
      console.warn('Google Script order dispatch error:', e);
    }
  }

  // Option 2: EmailJS
  if (isEmailJsConfigured) {
    try {
      const templateParams = {
        to_email: order.customer.email,
        to_name: order.customer.fullName,
        from_name: 'MANIKANTA GHEE — Ayyappa Dairy Farm',
        order_id: order.orderId,
        total_amount: `₹${order.total}`,
        payment_method: order.paymentMethod,
        shipping_address: `${order.customer.addressLine1}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}`,
        message: `Your pure buffalo ghee order #${order.orderId} has been confirmed. It will be packed in protective glass cushions and dispatched within 24 hours.`
      };

      const res = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      return res.status === 200;
    } catch (error) {
      console.warn('EmailJS order dispatch error:', error);
      return false;
    }
  }

  return false;
};

/**
 * 3. Dispatches Contact Form Inquiry to Brand Owner
 */
export const sendContactInquiryEmail = async (inquiry: {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) => {
  if (googleScriptUrl && googleScriptUrl.startsWith('http')) {
    try {
      await fetch(googleScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({
          action: 'inquiry',
          fullName: inquiry.fullName,
          email: inquiry.email,
          phone: inquiry.phone,
          subject: inquiry.subject,
          message: inquiry.message,
          timestamp: new Date().toISOString()
        })
      });
      return true;
    } catch (e) {
      console.warn('Google Script inquiry dispatch error:', e);
    }
  }
  return false;
};
