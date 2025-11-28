// API URL configuration - works in both development and production
const getApiUrl = () => {
  // In development, use empty string to use Vite proxy
  if (import.meta.env.MODE === 'development') {
    return '';
  }
  
  // In production, use environment variable
  return import.meta.env.VITE_BACKEND_URL || '';
};

export const API_URL = getApiUrl();

// Helper function for API calls with credentials
export const fetchAPI = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  const defaultOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const config = { ...defaultOptions, ...options };
  
  // Merge headers properly
  if (options.headers) {
    config.headers = { ...defaultOptions.headers, ...options.headers };
  }

  const response = await fetch(url, config);
  return response;
};