import { OrderDetails, CartItem } from '../types';

/**
 * =========================================================================
 * MANIKANTA GHEE — SHIPPING & COURIER ENGINE (SHIPROCKET & DIRECT CARRIERS)
 * Pickup Hub: Ayyappa Dairy Farm, Yadadri Bhuvanagiri, Telangana 508105
 * =========================================================================
 */

export const PICKUP_FACILITY = {
  facilityName: 'Ayyappa Dairy Farm — Dispatch Hub',
  contactPerson: 'Logistics Manager',
  phone: '+91 6303328180',
  email: 'ayyappadairyfarms@gmail.com',
  address: 'Survey No. 115, Raghunathpur',
  city: 'Yadadri Bhuvanagiri',
  state: 'Telangana',
  pincode: '508105',
  country: 'India'
};

export interface PincodeEstimateResult {
  pincode: string;
  isServiceable: boolean;
  courierName: string;
  estimatedDays: string;
  expectedDeliveryDate: string;
  zone: string;
  freeShippingQualified: boolean;
}

/**
 * Calculates accurate Dead Weight and Volumetric Dimensions
 * for fragile glass jars enclosed in shock-absorbing air column bags
 */
export const calculatePackageDimensionsAndWeight = (items: CartItem[]) => {
  let totalNetGrams = 0;
  let totalGrossGrams = 0;

  items.forEach((item) => {
    const qty = item.quantity || 1;
    let netWeight = 460; // 500ml default
    let tareGlassWeight = 350; // glass jar weight

    if (item.size.includes('250')) {
      netWeight = 230;
      tareGlassWeight = 220;
    } else if (item.size.includes('500')) {
      netWeight = 460;
      tareGlassWeight = 350;
    } else if (item.size.includes('1000') || item.size.includes('1L')) {
      netWeight = 920;
      tareGlassWeight = 550;
    } else if (item.size.includes('2000') || item.size.includes('2L')) {
      netWeight = 1840;
      tareGlassWeight = 900;
    }

    totalNetGrams += netWeight * qty;
    // Includes jar + air column protective sleeve + corrugated box packaging
    totalGrossGrams += (netWeight + tareGlassWeight + 120) * qty;
  });

  const weightKg = Number((totalGrossGrams / 1000).toFixed(2));

  // Determine corrugated box size according to total jars
  const itemCount = items.reduce((sum, it) => sum + it.quantity, 0);
  let length = 15;
  let breadth = 15;
  let height = 18;

  if (itemCount === 1) {
    length = 14;
    breadth = 14;
    height = 18;
  } else if (itemCount === 2) {
    length = 26;
    breadth = 15;
    height = 18;
  } else {
    length = 30;
    breadth = 25;
    height = 22;
  }

  return {
    netWeightGrams: totalNetGrams,
    grossWeightKg: Math.max(0.5, weightKg),
    dimensions: { length, breadth, height }
  };
};

/**
 * Pincode Delivery Estimator for Indian Logistics
 */
export const estimateDeliveryByPincode = (pincode: string): PincodeEstimateResult => {
  const cleanPin = pincode.trim().slice(0, 6);
  if (!cleanPin || cleanPin.length !== 6 || !/^\d{6}$/.test(cleanPin)) {
    return {
      pincode: cleanPin,
      isServiceable: false,
      courierName: 'Standard Courier',
      estimatedDays: '3–5 Business Days',
      expectedDeliveryDate: 'Within 5 Days',
      zone: 'Unknown',
      freeShippingQualified: false
    };
  }

  const firstTwo = parseInt(cleanPin.slice(0, 2), 10);
  const now = new Date();

  // Zone 1: Telangana & Andhra Pradesh (Local Origin Hub)
  if ((firstTwo >= 50 && firstTwo <= 53) || firstTwo === 50) {
    const daysToAdd = 1 + (now.getHours() >= 14 ? 1 : 0); // 24-48 hours
    const deliveryDate = new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    return {
      pincode: cleanPin,
      isServiceable: true,
      courierName: 'BlueDart Express Air (Priority South Hub)',
      estimatedDays: 'Next-Day to 2 Days',
      expectedDeliveryDate: deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }),
      zone: 'Intra-State / Telangana & AP Hub',
      freeShippingQualified: true
    };
  }

  // Zone 2: South India (Karnataka 56-59, Tamil Nadu 60-64, Kerala 67-69)
  if (firstTwo >= 56 && firstTwo <= 69) {
    const deliveryDate = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
    return {
      pincode: cleanPin,
      isServiceable: true,
      courierName: 'Delhivery Direct Air Express',
      estimatedDays: '2–3 Business Days',
      expectedDeliveryDate: deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }),
      zone: 'South Zone Express',
      freeShippingQualified: true
    };
  }

  // Zone 3: Metro Tier 1 (Mumbai 40, Delhi NCR 11-13, Kolkata 70, Bangalore)
  if ([11, 12, 13, 20, 40, 41, 70].includes(firstTwo)) {
    const deliveryDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    return {
      pincode: cleanPin,
      isServiceable: true,
      courierName: 'BlueDart Air Cargo (Fragile Insured)',
      estimatedDays: '2–3 Business Days',
      expectedDeliveryDate: deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }),
      zone: 'Metro Express Corridors',
      freeShippingQualified: true
    };
  }

  // Zone 4: Rest of India (Standard)
  const deliveryDate = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);
  return {
    pincode: cleanPin,
    isServiceable: true,
    courierName: 'Delhivery Surface & DTDC Air',
    estimatedDays: '3–5 Business Days',
    expectedDeliveryDate: deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }),
    zone: 'National Delivery Coverage',
    freeShippingQualified: true
  };
};

/**
 * Generates an AWB Tracking number
 */
export const generateAwbNumber = (courierName: string) => {
  const prefix = courierName.toLowerCase().includes('bluedart')
    ? 'BD'
    : courierName.toLowerCase().includes('delhivery')
      ? 'DL'
      : 'MK';
  const randomNum = Math.floor(100000000 + Math.random() * 900000000);
  return `${prefix}-${randomNum}`;
};

/**
 * Books or synchronizes an order with Courier / Shiprocket
 */
export const bookCourierShipment = (
  order: OrderDetails,
  selectedCourier: string = 'BlueDart Express Air'
): OrderDetails => {
  const { grossWeightKg } = calculatePackageDimensionsAndWeight(order.items);
  const awb = generateAwbNumber(selectedCourier);
  const estimate = estimateDeliveryByPincode(order.customer.pincode);

  const updatedOrder: OrderDetails = {
    ...order,
    status: 'Dispatched',
    shippingDetails: {
      courierName: selectedCourier,
      awbNumber: awb,
      trackingUrl: `https://shiprocket.co/tracking/${awb}`,
      pickupStatus: 'Picked Up',
      estimatedDelivery: estimate.expectedDeliveryDate,
      weightKg: grossWeightKg,
      pickupLocation: `${PICKUP_FACILITY.facilityName}, ${PICKUP_FACILITY.city}`,
      dispatchedAt: new Date().toISOString()
    }
  };

  // 1. Update in local storage
  try {
    const existingOrders: OrderDetails[] = JSON.parse(
      localStorage.getItem('manikanta_orders_v1') || '[]'
    );
    const index = existingOrders.findIndex((o) => o.orderId === order.orderId);
    if (index >= 0) {
      existingOrders[index] = updatedOrder;
    } else {
      existingOrders.unshift(updatedOrder);
    }
    localStorage.setItem('manikanta_orders_v1', JSON.stringify(existingOrders));
  } catch (e) {
    console.warn('Could not persist updated shipment in localStorage:', e);
  }

  return updatedOrder;
};

/**
 * Generates and opens a printable 4x6 / A4 shipping label with barcode
 */
export const printShippingLabel = (order: OrderDetails) => {
  const awb = order.shippingDetails?.awbNumber || `MK-${order.orderId}`;
  const courier = order.shippingDetails?.courierName || 'BlueDart Express Air';
  const weight = order.shippingDetails?.weightKg || '0.95';

  const labelHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Shipping Label #${order.orderId} — MANIKANTA GHEE</title>
        <style>
          @page { size: 100mm 150mm; margin: 0; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; padding: 16px; color: #111; font-size: 11px; }
          .label-box { border: 2px solid #000; padding: 12px; max-width: 400px; margin: 0 auto; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 8px; }
          .logo { font-size: 16px; font-weight: 900; letter-spacing: 1px; }
          .tagline { font-size: 8px; text-transform: uppercase; color: #444; }
          .fragile-banner { background: #000; color: #fff; text-align: center; font-weight: 900; padding: 4px; font-size: 10px; letter-spacing: 1px; margin-bottom: 8px; text-transform: uppercase; }
          .barcode-box { text-align: center; border: 1px dashed #000; padding: 8px; margin-bottom: 10px; }
          .barcode { font-family: monospace; font-size: 18px; font-weight: bold; letter-spacing: 4px; }
          .meta-grid { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid #000; padding-bottom: 6px; margin-bottom: 8px; font-size: 10px; }
          .section-title { font-size: 9px; font-weight: bold; text-transform: uppercase; color: #555; margin-bottom: 2px; }
          .address-box { border-bottom: 1px solid #000; padding-bottom: 8px; margin-bottom: 8px; }
          .customer-name { font-size: 13px; font-weight: bold; }
          .pincode-highlight { font-size: 14px; font-weight: 900; }
          .items-list { font-size: 9px; line-height: 1.4; }
          .footer { font-size: 8px; text-align: center; color: #555; margin-top: 8px; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="label-box">
          <div class="header">
            <div>
              <div class="logo">MANIKANTA GHEE</div>
              <div class="tagline">Ayyappa Dairy Farm • 100% Pure Buffalo Ghee</div>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 11px; font-weight: bold; border: 1px solid #000; padding: 2px 6px;">${order.paymentMethod === 'COD' ? 'C.O.D.' : 'PREPAID'}</span>
            </div>
          </div>

          <div class="fragile-banner">
            ⚠️ FRAGILE: PURE BUFFALO GHEE IN GLASS JAR • HANDLE WITH CARE
          </div>

          <div class="barcode-box">
            <div style="font-size: 9px; color: #444; margin-bottom: 2px;">AIRWAY BILL (AWB) NO:</div>
            <div class="barcode">||| | |||| || |||||| | |||</div>
            <div style="font-size: 12px; font-weight: bold; margin-top: 4px;">${awb}</div>
          </div>

          <div class="meta-grid">
            <div>
              <div class="section-title">Courier Partner:</div>
              <strong>${courier}</strong>
            </div>
            <div style="text-align: right;">
              <div class="section-title">Gross Weight:</div>
              <strong>${weight} KG (Insured)</strong>
            </div>
          </div>

          <div class="address-box">
            <div class="section-title">Deliver To (Shipping Address):</div>
            <div class="customer-name">${order.customer.fullName}</div>
            <div>${order.customer.addressLine1}</div>
            ${order.customer.addressLine2 ? `<div>${order.customer.addressLine2}</div>` : ''}
            <div><strong>${order.customer.city}, ${order.customer.state}</strong> - <span class="pincode-highlight">${order.customer.pincode}</span></div>
            <div>Phone: <strong>${order.customer.phone}</strong></div>
          </div>

          <div class="address-box">
            <div class="section-title">Shipped From (Origin Dispatch Hub):</div>
            <div><strong>${PICKUP_FACILITY.facilityName}</strong></div>
            <div>${PICKUP_FACILITY.address}, ${PICKUP_FACILITY.city}</div>
            <div>${PICKUP_FACILITY.state} - <strong>${PICKUP_FACILITY.pincode}</strong></div>
            <div>Customer Care: <strong>${PICKUP_FACILITY.phone}</strong></div>
          </div>

          <div>
            <div class="section-title">Order Summary (#${order.orderId}):</div>
            <div class="items-list">
              ${order.items.map((i) => `<div>• ${i.quantity}× ${i.name} (${i.size})</div>`).join('')}
            </div>
            <div style="margin-top: 4px; font-weight: bold; font-size: 10px;">
              Invoice Value: ₹${order.total} (${order.paymentMethod})
            </div>
          </div>

          <div class="footer">
            Manufactured & Packed by Manikanta Ghee. Food Grade Nitrogen Sealed.<br>
            Please do not accept if outer seal or glass jar cushion is broken.
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(labelHtml);
    printWindow.document.close();
  }
};

/**
 * Converts numbers into English words for Indian currency
 */
function numberToWords(amount: number): string {
  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if (amount === 0) return 'Zero Rupees Only';

  function convertChunk(n: number): string {
    let str = '';
    if (n >= 100) {
      str += units[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    if (n >= 20) {
      str += tens[Math.floor(n / 10)] + ' ';
      n %= 10;
    }
    if (n > 0) {
      str += units[n] + ' ';
    }
    return str.trim();
  }

  let words = '';
  const crore = Math.floor(amount / 10000000);
  amount %= 10000000;
  const lakh = Math.floor(amount / 100000);
  amount %= 100000;
  const thousand = Math.floor(amount / 1000);
  amount %= 1000;
  const remaining = Math.floor(amount);

  if (crore > 0) words += convertChunk(crore) + ' Crore ';
  if (lakh > 0) words += convertChunk(lakh) + ' Lakh ';
  if (thousand > 0) words += convertChunk(thousand) + ' Thousand ';
  if (remaining > 0) words += convertChunk(remaining) + ' ';

  return `Rupees ${words.trim()} Only`;
}

/**
 * Generates and prints an Official Unique Minimal Tax Invoice & Receipt Bill
 * with the official MANIKANTA GHEE Logo, proper margins, and minimal luxury typography.
 */
export const printTaxInvoiceBill = (order: OrderDetails) => {
  const invoiceNumber = `INV-2026-${order.orderId}`;
  const invoiceDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  const invoiceTime = new Date(order.createdAt).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const awb = order.shippingDetails?.awbNumber || `BD-${order.orderId}`;
  const courier = order.shippingDetails?.courierName || 'BlueDart Express Air';
  const totalInWords = numberToWords(Math.round(order.total));

  // Determine destination tax jurisdiction based on customer delivery/billing address
  const customerState = (order.customer?.state || '').trim().toLowerCase();
  const customerPincode = (order.customer?.pincode || '').trim();
  const isTelangana =
    customerState === 'telangana' ||
    customerState.includes('telangana') ||
    customerPincode.startsWith('50');

  // Merchandise Subtotal (Sum of items at pure MRP / selling price)
  const merchandiseTotal = order.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Applicable discounted merchandise amount (handling promotional discounts if any)
  const discountAmount = Math.max(0, order.discount || 0);
  const discountedMerchandise = Math.max(0, merchandiseTotal - discountAmount);

  // Compute inclusive 5% GST breakdown for Dairy Ghee (HSN: 0405 9020)
  // Taxable value = GST-inclusive merchandise amount / 1.05
  // Total GST = GST-inclusive merchandise amount - taxable value
  const taxableMerchandise = Number((discountedMerchandise / 1.05).toFixed(2));
  const totalGst = Number((discountedMerchandise - taxableMerchandise).toFixed(2));
  const cgst = Number((totalGst / 2).toFixed(2));
  const sgst = Number((totalGst - cgst).toFixed(2)); // Exact split to prevent 1-paisa rounding error

  const itemsHtml = order.items
    .map((item, idx) => {
      const itemTotal = item.price * item.quantity;

      return `
        <tr style="border-bottom: 1px solid #E7DCCB;">
          <td style="padding: 12px 10px; text-align: center; font-variant-numeric: tabular-nums; font-weight: 600; color: #70431F;">${idx + 1}</td>
          <td style="padding: 12px 10px;">
            <div style="font-weight: 700; color: #432713; font-size: 13.5px;">${item.name}</div>
            <div style="font-size: 11px; color: #70431F; margin-top: 3px;">
              ${item.category === 'traditional-bilona' ? 'Traditional Vedic 6-Stage Curd Churn • 100% Buffalo Milk' : 'Hygienic 4-Stage Thermal Clarified • 250°C Smoke Point'}
            </div>
          </td>
          <td style="padding: 12px 10px; text-align: center; font-family: monospace; font-size: 11px; color: #432713;">0405 9020</td>
          <td style="padding: 12px 10px; text-align: center; font-weight: 600; color: #432713; font-size: 12px;">${item.size}</td>
          <td style="padding: 12px 10px; text-align: center; font-variant-numeric: tabular-nums; font-weight: 700; color: #432713; font-size: 12px;">${item.quantity}</td>
          <td style="padding: 12px 10px; text-align: right; font-variant-numeric: tabular-nums; font-weight: 600; color: #432713; font-size: 12px;">₹${item.price.toFixed(2)}</td>
          <td style="padding: 12px 10px; text-align: right; font-weight: 800; color: #432713; font-variant-numeric: tabular-nums; font-size: 13px;">₹${itemTotal.toFixed(2)}</td>
        </tr>
      `;
    })
    .join('');

  const invoiceHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tax Invoice #${invoiceNumber} — MANIKANTA GHEE</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');

          @page {
            size: A4 portrait;
            margin: 8mm 10mm;
          }

          * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          body {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            background-color: #EFE7DA;
            color: #432713;
            margin: 0;
            padding: 24px 16px;
            font-size: 11px;
            line-height: 1.5;
            font-variant-numeric: tabular-nums lining-nums;
          }

          .no-print-bar {
            max-width: 840px;
            margin: 0 auto 16px auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #432713;
            padding: 12px 20px;
            border-radius: 12px;
            color: #FFFDF8;
            box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          }

          .print-btn {
            background: #C49A45;
            color: #FFFDF8;
            border: none;
            padding: 8px 18px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 11px;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 2px 8px rgba(196,154,69,0.3);
          }

          .print-btn:hover {
            background: #B38936;
          }

          .invoice-sheet {
            max-width: 840px;
            margin: 0 auto;
            background: #FFFFFF;
            border: 2px solid #432713;
            outline: 1.5px solid #C49A45;
            outline-offset: -5px;
            border-radius: 8px;
            padding: 30px 34px;
            box-shadow: 0 10px 40px rgba(67, 39, 19, 0.12);
            position: relative;
          }

          .top-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #432713;
            padding-bottom: 18px;
            margin-bottom: 18px;
          }

          .logo-group {
            display: flex;
            align-items: center;
            gap: 14px;
          }

          .logo-badge {
            width: 52px;
            height: 52px;
            border-radius: 50%;
            background: #432713;
            border: 2px solid #C49A45;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          }

          .brand-name {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 24px;
            font-weight: 800;
            color: #432713;
            letter-spacing: 0.08em;
            margin: 0;
            line-height: 1;
          }

          .brand-motto {
            font-size: 9px;
            text-transform: uppercase;
            letter-spacing: 0.28em;
            color: #C49A45;
            font-weight: 700;
            margin-top: 4px;
          }

          .brand-sub {
            font-size: 11px;
            color: #70431F;
            font-weight: 600;
            margin-top: 2px;
          }

          .invoice-meta-box {
            text-align: right;
            border-left: 2px solid #E7DCCB;
            padding-left: 16px;
          }

          .invoice-badge {
            display: inline-block;
            background: #432713;
            color: #FFFDF8;
            border: 1px solid #C49A45;
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            padding: 4px 12px;
            border-radius: 5px;
            margin-bottom: 4px;
          }

          .invoice-number-text {
            font-family: monospace;
            font-size: 13px;
            font-weight: 800;
            color: #432713;
          }

          .party-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 18px;
          }

          .party-card {
            background: #FFFDF8;
            border: 1px solid #E7DCCB;
            border-left: 4px solid #C49A45;
            border-radius: 8px;
            padding: 12px 16px;
          }

          .party-heading {
            font-size: 9px;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            color: #C49A45;
            font-weight: 800;
            margin-bottom: 4px;
          }

          .party-title {
            font-size: 13px;
            font-weight: 800;
            color: #432713;
            margin-bottom: 3px;
          }

          .party-desc {
            font-size: 11px;
            color: #66594D;
            line-height: 1.5;
          }

          table.invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 16px;
            border: 1px solid #E7DCCB;
            border-radius: 6px;
            overflow: hidden;
          }

          table.invoice-table thead tr {
            background: #432713;
            color: #FFFDF8;
          }

          table.invoice-table th {
            padding: 9px 8px;
            font-size: 9px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-weight: 700;
          }

          .words-bar {
            background: #F4EBDD;
            border: 1px solid #E7DCCB;
            border-radius: 6px;
            padding: 8px 14px;
            font-size: 11px;
            color: #432713;
            margin-bottom: 16px;
          }

          .summary-grid {
            display: grid;
            grid-template-columns: 1.15fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
          }

          .pledge-box {
            background: #FFFDF8;
            border: 1px solid #E7DCCB;
            border-radius: 8px;
            padding: 14px 16px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .calc-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11px;
          }

          .calc-table td {
            padding: 4px 0;
            color: #66594D;
          }

          .calc-table tr.total-row td {
            border-top: 2px solid #432713;
            border-bottom: 2px solid #432713;
            padding: 8px 0;
            font-size: 14px;
            font-weight: 800;
            color: #432713;
          }

          .bottom-bar {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            border-top: 1px solid #E7DCCB;
            padding-top: 14px;
          }

          .terms-block {
            font-size: 9.5px;
            color: #70431F;
            line-height: 1.5;
            max-width: 480px;
          }

          .sign-block {
            text-align: right;
          }

          .sign-line {
            width: 170px;
            border-top: 1.5px solid #432713;
            margin-top: 35px;
            display: inline-block;
            text-align: center;
            font-size: 9.5px;
            font-weight: 700;
            color: #432713;
            padding-top: 4px;
          }

          @media print {
            body {
              background: #FFFFFF !important;
              padding: 0 !important;
            }
            .no-print-bar {
              display: none !important;
            }
            .invoice-sheet {
              max-width: 100% !important;
              margin: 0 !important;
              border: 2px solid #432713 !important;
              outline: 1.5px solid #C49A45 !important;
              outline-offset: -5px !important;
              padding: 22px 26px !important;
              box-shadow: none !important;
              border-radius: 0 !important;
            }
          }
        </style>
      </head>
      <body>
        <!-- Top Toolbar (Hidden during print) -->
        <div class="no-print-bar">
          <div>
            <strong style="font-size: 13px;">Official Tax Invoice & Receipt Bill</strong>
            <span style="font-size: 11px; color: #E7DCCB; margin-left: 8px;">• MANIKANTA GHEE (${invoiceNumber})</span>
          </div>
          <button class="print-btn" onclick="window.print()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
              <path d="M6 14h12v8H6z"/>
            </svg>
            Print / Save as PDF
          </button>
        </div>

        <!-- Printable Framed Invoice Card -->
        <div class="invoice-sheet">
          <!-- Header -->
          <div class="top-header">
            <div class="logo-group">
              <!-- Official Manikanta Ghee Gold Diwa Crest -->
              <div class="logo-badge">
                <svg width="28" height="28" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 10C30 10 18 24 18 34C18 41 23.5 47 30 47C36.5 47 42 41 42 34C42 24 30 10 30 10Z" fill="#C49A45"/>
                  <circle cx="30" cy="35" r="6" fill="#FFFDF8"/>
                  <circle cx="30" cy="35" r="3" fill="#70431F"/>
                </svg>
              </div>
              <div>
                <h1 class="brand-name">MANIKANTA GHEE</h1>
                <div class="brand-motto">Tradition • Purity • Quality</div>
                <div class="brand-sub">Ayyappa Dairy Farm • 100% Pure Indian Buffalo Ghee</div>
              </div>
            </div>

            <div class="invoice-meta-box">
              <div class="invoice-badge">TAX INVOICE & CASH BILL</div>
              <div class="invoice-number-text">${invoiceNumber}</div>
              <div style="font-size: 10.5px; color: #66594D; margin-top: 3px;">
                Date: <strong>${invoiceDate}</strong> (${invoiceTime})
              </div>
              <div style="font-size: 10.5px; color: #70431F; margin-top: 2px;">
                Status: <strong>${order.paymentMethod}</strong>
              </div>
              <div style="font-size: 10px; color: #C49A45; font-weight: 700; margin-top: 2px;">
                Carrier: ${courier} (AWB: ${awb})
              </div>
            </div>
          </div>

          <!-- Party Addresses -->
          <div class="party-grid">
            <div class="party-card">
              <div class="party-heading">Shipped & Billed By (Dairy Manufacturer):</div>
              <div class="party-title">MANIKANTA GHEE — Ayyappa Dairy Farm</div>
              <div class="party-desc">
                Survey No. 115, Raghunathpur<br>
                Yadadri Bhuvanagiri District, Telangana 508105, India<br>
                Customer Support: <strong>+91 6303328180</strong><br>
                Official Email: <strong>ayyappadairyfarms@gmail.com</strong><br>
                FSSAI License: <strong>Soon will be Apply</strong> (State Code: 36)
              </div>
            </div>

            <div class="party-card">
              <div class="party-heading">Billed & Delivered To (Consignee):</div>
              <div class="party-title">${order.customer.fullName}</div>
              <div class="party-desc">
                ${order.customer.addressLine1}${order.customer.addressLine2 ? ', ' + order.customer.addressLine2 : ''}<br>
                ${order.customer.city}, ${order.customer.state} - <strong>${order.customer.pincode}</strong><br>
                Contact Phone: <strong>${order.customer.phone}</strong><br>
                Customer Email: ${order.customer.email}<br>
                Order Reference: <strong>#${order.orderId}</strong>
              </div>
            </div>
          </div>

          <!-- Product Table -->
          <table class="invoice-table">
            <thead>
              <tr>
                <th style="width: 35px; text-align: center;">#</th>
                <th style="text-align: left;">Description of Goods & Craft</th>
                <th style="width: 80px; text-align: center;">HSN Code</th>
                <th style="width: 70px; text-align: center;">Jar Size</th>
                <th style="width: 45px; text-align: center;">Qty</th>
                <th style="width: 90px; text-align: right;">Unit Rate (₹)</th>
                <th style="width: 100px; text-align: right;">Total Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <!-- Amount In Words -->
          <div class="words-bar">
            <strong>Amount Chargeable (in words):</strong> ${totalInWords}
          </div>

          <!-- Summary & Quality Seal -->
          <div class="summary-grid">
            <div class="pledge-box">
              <div>
                <div style="font-weight: 700; color: #432713; font-size: 11px; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
                  <span style="color: #C49A45;">🛡️</span> Purity & Non-Adulteration Guarantee:
                </div>
                <p style="margin: 0; color: #66594D; font-size: 10px; line-height: 1.5;">
                  Manufactured exclusively from 100% pure Indian Murrah water buffalo milk fat.
                  Strictly zero cow milk blending, zero palm fats, and zero synthetic aromas.
                  Nitrogen-cushion sealed in high-density food-grade glass jars.
                </p>
              </div>
              <div style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed #E7DCCB; font-size: 9.5px; color: #70431F; display: flex; justify-content: space-between;">
                <span>Batch Ref: <strong>MK-BATCH-${order.orderId.slice(-4)}</strong></span>
                <span>Transit: <strong>Insured Fragile Cargo</strong></span>
              </div>
            </div>

            <div>
              <table class="calc-table">
                <tr>
                  <td>Merchandise Subtotal:</td>
                  <td style="text-align: right; font-weight: 700; color: #432713;">₹${merchandiseTotal.toFixed(2)}</td>
                </tr>
                ${order.discount && order.discount > 0 ? `
                <tr>
                  <td style="color: #166534;">Promotional Discount:</td>
                  <td style="text-align: right; font-weight: 700; color: #166534;">-₹${order.discount.toFixed(2)}</td>
                </tr>
                ` : ''}
                <tr>
                  <td>Doorstep Express Courier:</td>
                  <td style="text-align: right; font-weight: 600; color: ${order.shipping > 0 ? '#432713' : '#166534'};">
                    ${order.shipping > 0 ? `₹${order.shipping.toFixed(2)}` : 'FREE (Complimentary)'}
                  </td>
                </tr>
                <tr class="total-row">
                  <td>Total Invoice Value (INR):</td>
                  <td style="text-align: right; color: #C49A45;">₹${order.total.toFixed(2)}</td>
                </tr>
              </table>

              <!-- GST Tax Breakdown (Included in product price - No extra tax added) -->
              <div style="margin-top: 10px; padding: 10px 12px; background: #FFFDF8; border: 1px solid #E7DCCB; border-radius: 6px; font-size: 10px;">
                <div style="font-weight: 700; color: #432713; margin-bottom: 4px; display: flex; justify-content: space-between; border-bottom: 1px solid #E7DCCB; padding-bottom: 3px;">
                  <span>GST Tax Breakdown (5% Dairy Fat):</span>
                  <span style="color: #70431F; font-weight: 600;">(Included in Price)</span>
                </div>
                <div style="display: flex; justify-content: space-between; color: #66594D; padding: 2px 0;">
                  <span>• Base Taxable Value (HSN 0405 9020):</span>
                  <span style="font-weight: 600; color: #432713;">₹${taxableMerchandise.toFixed(2)}</span>
                </div>
                ${isTelangana ? `
                <div style="display: flex; justify-content: space-between; color: #66594D; padding: 2px 0;">
                  <span>• CGST (2.5% Intra-state):</span>
                  <span style="font-weight: 600; color: #432713;">₹${cgst.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; color: #66594D; padding: 2px 0;">
                  <span>• SGST (2.5% Intra-state):</span>
                  <span style="font-weight: 600; color: #432713;">₹${sgst.toFixed(2)}</span>
                </div>
                ` : `
                <div style="display: flex; justify-content: space-between; color: #66594D; padding: 2px 0;">
                  <span>• IGST (5.0% Inter-state):</span>
                  <span style="font-weight: 600; color: #432713;">₹${totalGst.toFixed(2)}</span>
                </div>
                `}
                <div style="display: flex; justify-content: space-between; color: #70431F; padding-top: 4px; margin-top: 4px; border-top: 1px dashed #E7DCCB; font-weight: 700;">
                  <span>Total 5% GST Included:</span>
                  <span>₹${totalGst.toFixed(2)}</span>
                </div>
                <div style="font-size: 9px; color: #70431F; margin-top: 4px; font-style: italic;">
                  * All product rates are inclusive of 5% GST. No extra tax is added to MRP.
                </div>
              </div>
            </div>
          </div>

          <!-- Footer & Signatures -->
          <div class="bottom-bar">
            <div class="terms-block">
              <strong>Terms & Conditions:</strong><br>
              1. Goods once dispatched in sealed glass containers cannot be returned if seal is opened.<br>
              2. Any rare transit dama-ge is covered under our 100% Free Replacement Guarantee.<br>
              3. Store at room temperature in a dry pantry away from direct sunlight. Do not refrigerate.
            </div>

            <div class="sign-block">
              <div style="font-size: 10px; color: #66594D; font-weight: 600;">For MANIKANTA GHEE — Ayyappa Dairy Farm</div>
              <div class="sign-line">
                Authorized Signatory / QC Officer
              </div>
            </div>
          </div>
        </div>

        <script>
          window.onload = function() {
            // Print automatically after page assets are ready
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(invoiceHtml);
    printWindow.document.close();
  }
};

