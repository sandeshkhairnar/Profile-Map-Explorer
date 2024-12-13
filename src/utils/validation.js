/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  
  /**
   * Validate phone number
   * @param {string} phone - Phone number to validate
   * @returns {boolean} Whether phone number is valid
   */
  export const validatePhone = (phone) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(String(phone));
  };
  
  /**
   * Validate profile data
   * @param {Object} profile - Profile data to validate
   * @returns {Object} Validation errors
   */
  export const validateProfileData = (profile) => {
    const errors = {};
  
    if (!profile.name || profile.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }
  
    if (profile.email && !validateEmail(profile.email)) {
      errors.email = 'Invalid email address';
    }
  
    if (profile.phone && !validatePhone(profile.phone)) {
      errors.phone = 'Invalid phone number';
    }
  
    if (!profile.location || profile.location.trim().length < 2) {
      errors.location = 'Location is required';
    }
  
    return errors;
  };
  
  /**
   * Sanitize input string
   * @param {string} input - Input to sanitize
   * @returns {string} Sanitized input
   */
  export const sanitizeInput = (input) => {
    if (!input) return '';
    return input.replace(/[<>]/g, '').trim();
  };