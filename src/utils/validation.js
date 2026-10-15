/**
 * Validation utilities for customer forms
 */

export function validatePhone(phone) {
  if (!phone) return 'Mobile number is required';
  const cleanPhone = phone.replace(/[\s\-\+]/g, '');
  // Valid Indian mobile numbers are 10 digits (optionally prefixed by 91 or 0)
  const pattern = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
  if (!pattern.test(cleanPhone)) {
    return 'Enter a valid 10-digit Indian mobile number (e.g. 9876543210)';
  }
  return null;
}

export function validateEmail(email) {
  if (!email) return null; // Email often optional in sell form
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
}

export function validatePIN(pin) {
  if (!pin) return 'PIN code is required';
  const clean = pin.trim();
  if (!/^\d{6}$/.test(clean)) {
    return 'PIN code must be exactly 6 digits';
  }
  return null;
}

export const validatePincode = validatePIN;
