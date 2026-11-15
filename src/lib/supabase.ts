import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// 1. Save Customer Order
export const saveOrderToSupabase = async (orderData: any) => {
  // Always save locally first
  try {
    const existing = JSON.parse(localStorage.getItem('manikanta_orders_v1') || '[]');
    const exists = existing.find((o: any) => o.orderId === orderData.orderId);
    if (!exists) {
      localStorage.setItem('manikanta_orders_v1', JSON.stringify([orderData, ...existing]));
    }
  } catch (e) {
    console.error('localStorage order save error', e);
  }

  // Then sync to Supabase if connected
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from('orders').insert([
      {
        order_id: orderData.orderId,
        customer_name: orderData.customer.fullName,
        customer_email: orderData.customer.email,
        customer_phone: orderData.customer.phone,
        address: `${orderData.customer.addressLine1}, ${orderData.customer.city}, ${orderData.customer.state} - ${orderData.customer.pincode}`,
        total_amount: orderData.total,
        payment_method: orderData.paymentMethod,
        payment_id: orderData.paymentId || null,
        items: orderData.items,
        status: orderData.status || 'Confirmed',
        created_at: orderData.createdAt || new Date().toISOString()
      }
    ]);
    if (error) {
      console.warn('Supabase orders table note (run SQL setup if table missing):', error.message);
    }
    return data;
  } catch (err) {
    console.warn('Could not sync to Supabase orders table:', err);
    return null;
  }
};

// 2. Save Newsletter Subscriber
export const saveSubscriberToSupabase = async (email: string) => {
  const newSub = {
    email: email.trim().toLowerCase(),
    brand: 'MANIKANTA GHEE — Ayyappa Dairy Farm',
    subscribed_at: new Date().toISOString()
  };

  // 1. Save to localStorage
  try {
    const existingSubs = JSON.parse(localStorage.getItem('manikanta_subscribers') || '[]');
    if (!existingSubs.some((s: any) => s.email === newSub.email)) {
      localStorage.setItem('manikanta_subscribers', JSON.stringify([newSub, ...existingSubs]));
    }
  } catch (e) {
    console.error('localStorage subscriber save error', e);
  }

  // 2. Sync to Supabase
  if (!supabase) return newSub;
  try {
    const { data, error } = await supabase.from('subscribers').insert([newSub]);
    if (error) {
      console.warn('Supabase subscribers table note:', error.message);
    }
    return data;
  } catch (err) {
    console.warn('Could not sync subscriber to Supabase:', err);
    return newSub;
  }
};

// 3. Save Contact Inquiry
export const saveInquiryToSupabase = async (inquiryData: any) => {
  const newInquiry = {
    ...inquiryData,
    created_at: new Date().toISOString()
  };

  try {
    const existing = JSON.parse(localStorage.getItem('manikanta_inquiries') || '[]');
    localStorage.setItem('manikanta_inquiries', JSON.stringify([newInquiry, ...existing]));
  } catch (e) {
    console.error('localStorage inquiry save error', e);
  }

  if (!supabase) return newInquiry;
  try {
    const { data, error } = await supabase.from('inquiries').insert([
      {
        full_name: inquiryData.fullName,
        email: inquiryData.email,
        phone: inquiryData.phone,
        subject: inquiryData.subject,
        message: inquiryData.message,
        created_at: newInquiry.created_at
      }
    ]);
    if (error) {
      console.warn('Supabase inquiries table note:', error.message);
    }
    return data;
  } catch (err) {
    console.warn('Could not sync inquiry to Supabase:', err);
    return newInquiry;
  }
};
