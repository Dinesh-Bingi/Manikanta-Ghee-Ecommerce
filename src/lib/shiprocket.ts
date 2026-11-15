import { OrderDetails } from '../types';
import { calculatePackageDimensionsAndWeight, PICKUP_FACILITY } from './shipping';

export interface ShiprocketConfig {
  email: string;
  password: string;
  pickupLocation: string;
  preferredCourier: 'delhivery_surface' | 'shadowfax_surface' | 'surface_lowest_rate' | 'express_air';
  autoPushOnOrder: boolean;
}

const STORAGE_KEY = 'manikanta_shiprocket_config_v1';

export const DEFAULT_SHIPROCKET_CONFIG: ShiprocketConfig = {
  email: '',
  password: '',
  pickupLocation: 'Ayyappa Dairy Farm',
  preferredCourier: 'delhivery_surface',
  autoPushOnOrder: false
};

export const getShiprocketConfig = (): ShiprocketConfig => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_SHIPROCKET_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Error reading Shiprocket config from localStorage', e);
  }
  return DEFAULT_SHIPROCKET_CONFIG;
};

export const saveShiprocketConfig = (config: Partial<ShiprocketConfig>): ShiprocketConfig => {
  const current = getShiprocketConfig();
  const updated = { ...current, ...config };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving Shiprocket config to localStorage', e);
  }
  return updated;
};

/**
 * Builds the official Shiprocket Adhoc Order Payload according to Shiprocket API v2 docs
 */
export const buildShiprocketOrderPayload = (
  order: OrderDetails,
  pickupLocationName: string = 'Ayyappa Dairy Farm'
) => {
  const { grossWeightKg, dimensions } = calculatePackageDimensionsAndWeight(order.items || []);

  const nameParts = (order.customer.fullName || 'Valued Patron').trim().split(' ');
  const firstName = nameParts[0] || 'Valued';
  const lastName = nameParts.slice(1).join(' ') || 'Patron';

  // Format date as YYYY-MM-DD HH:mm
  const dateObj = new Date(order.createdAt || Date.now());
  const formattedDate =
    dateObj.toISOString().slice(0, 10) +
    ' ' +
    dateObj.toTimeString().slice(0, 5);

  const orderItems = (order.items || []).map((item) => {
    let sku = 'MK-GHEE';
    if (item.category === 'traditional-bilona') {
      sku = `MK-BIL-${item.size.replace(/[^0-9a-zA-Z]/g, '')}`;
    } else {
      sku = `MK-MOD-${item.size.replace(/[^0-9a-zA-Z]/g, '')}`;
    }

    return {
      name: `${item.name} (${item.size})`,
      sku,
      units: item.quantity,
      selling_price: item.price,
      discount: 0,
      tax: 5, // 5% GST
      hsn: 4059020 // HSN code for Pure Dairy Ghee
    };
  });

  return {
    order_id: `MK-${order.orderId}`,
    order_date: formattedDate,
    pickup_location: pickupLocationName,
    channel_id: '',
    comment: 'Fragile Pure Buffalo Ghee in Food-Grade Glass Jars. Roadways/Surface dispatch.',
    billing_customer_name: firstName,
    billing_last_name: lastName,
    billing_address: order.customer.addressLine1,
    billing_address_2: order.customer.addressLine2 || '',
    billing_city: order.customer.city,
    billing_pincode: order.customer.pincode,
    billing_state: order.customer.state,
    billing_country: 'India',
    billing_email: order.customer.email,
    billing_phone: order.customer.phone.replace(/[^0-9]/g, '').slice(-10),
    shipping_is_billing: true,
    order_items: orderItems,
    payment_method: order.paymentMethod === 'COD' ? 'COD' : 'Prepaid',
    shipping_charges: order.shipping || 0,
    giftwrap_charges: 0,
    transaction_charges: 0,
    total_discount: order.discount || 0,
    sub_total: order.subtotal || order.total,
    length: dimensions.length,
    breadth: dimensions.breadth,
    height: dimensions.height,
    weight: grossWeightKg
  };
};

export interface ShiprocketPushResult {
  success: boolean;
  message: string;
  orderId?: string;
  shiprocketOrderId?: number | string;
  shiprocketShipmentId?: number | string;
  awbCode?: string;
  courierName?: string;
  trackingUrl?: string;
  labelUrl?: string;
}

/**
 * Pushes an order to Shiprocket via the backend Google Apps Script Webhook.
 * This ensures credentials are safe and bypasses browser CORS restrictions.
 */
export const pushOrderToShiprocket = async (
  order: OrderDetails,
  config?: ShiprocketConfig
): Promise<ShiprocketPushResult> => {
  const activeConfig = config || getShiprocketConfig();
  const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

  if (!activeConfig.email || !activeConfig.password) {
    return {
      success: false,
      message:
        'Shiprocket credentials missing. Please enter your Shiprocket email & password in the Admin Shipping Settings.'
    };
  }

  const payload = buildShiprocketOrderPayload(order, activeConfig.pickupLocation);

  // If Google Script backend URL is configured, send through it (No CORS)
  if (scriptUrl) {
    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'shiprocket_create_order',
          orderId: order.orderId,
          shiprocketEmail: activeConfig.email,
          shiprocketPassword: activeConfig.password,
          preferredCourier: activeConfig.preferredCourier,
          orderPayload: payload
        })
      });

      const resJson = await response.json();

      if (resJson.status === 'success') {
        const courierName = resJson.courierName || 'Delhivery Surface';
        const awbCode = resJson.awbCode || `DL-${order.orderId}`;
        const trackingUrl = resJson.trackingUrl || `https://shiprocket.co/tracking/${awbCode}`;

        // Update local order state
        const updatedOrder: OrderDetails = {
          ...order,
          status: 'Dispatched',
          shippingDetails: {
            courierName,
            awbNumber: awbCode,
            trackingUrl,
            pickupStatus: 'Pending Pickup',
            pickupLocation: `${activeConfig.pickupLocation} (${PICKUP_FACILITY.city})`,
            weightKg: payload.weight,
            dispatchedAt: new Date().toISOString(),
            shiprocketOrderId: resJson.shiprocketOrderId,
            shiprocketShipmentId: resJson.shiprocketShipmentId,
            labelUrl: resJson.labelUrl
          }
        };

        try {
          const orders: OrderDetails[] = JSON.parse(
            localStorage.getItem('manikanta_orders_v1') || '[]'
          );
          const idx = orders.findIndex((o) => o.orderId === order.orderId);
          if (idx >= 0) {
            orders[idx] = updatedOrder;
          } else {
            orders.unshift(updatedOrder);
          }
          localStorage.setItem('manikanta_orders_v1', JSON.stringify(orders));
        } catch (storageErr) {
          console.warn('Could not persist updated order to localStorage:', storageErr);
        }

        return {
          success: true,
          message: `Order #${order.orderId} successfully pushed to Shiprocket! Assigned Courier: ${courierName} (AWB: ${awbCode}).`,
          orderId: order.orderId,
          shiprocketOrderId: resJson.shiprocketOrderId,
          shiprocketShipmentId: resJson.shiprocketShipmentId,
          awbCode,
          courierName,
          trackingUrl,
          labelUrl: resJson.labelUrl
        };
      } else {
        return {
          success: false,
          message: resJson.error || 'Shiprocket API returned an error. Please verify credentials and pickup location name.'
        };
      }
    } catch (err: any) {
      console.error('Shiprocket webhook error:', err);
      return {
        success: false,
        message: `Network error communicating with Google Script Webhook: ${err.message}`
      };
    }
  }

  // Fallback: If Google Script URL is not set up, inform user clearly
  return {
    success: false,
    message:
      'VITE_GOOGLE_SCRIPT_URL is not configured in .env. Shiprocket API calls require the Google Apps Script backend to execute securely without CORS errors.'
  };
};

/**
 * Tests Shiprocket authentication
 */
export const testShiprocketAuth = async (
  email: string,
  pass: string
): Promise<{ success: boolean; message: string }> => {
  const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
  if (!scriptUrl) {
    return {
      success: false,
      message: 'VITE_GOOGLE_SCRIPT_URL is not set in .env. Please configure Google Apps Script first.'
    };
  }

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'shiprocket_test_auth',
        shiprocketEmail: email,
        shiprocketPassword: pass
      })
    });
    const res = await response.json();
    if (res.status === 'success') {
      return { success: true, message: 'Shiprocket API connected successfully! Token authenticated.' };
    }
    return { success: false, message: res.error || 'Authentication failed. Please check your Shiprocket email & password.' };
  } catch (e: any) {
    return { success: false, message: `Could not reach webhook: ${e.message}` };
  }
};
