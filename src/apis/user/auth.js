import axios from 'axios';
import Swal from 'sweetalert2';
import { config } from '../../env';

export const persistAuth = ({ access_token, fullname, level }) => {
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('fullname', fullname);
  localStorage.setItem('level', level);
}

export const login = async ({ nik, password }) => {
  const { data } = await axios.post(`${config.baseUrl}/user/login`, { nik, password });

  return data;
};

export const logout = async () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('fullname');
  localStorage.removeItem('level');
  localStorage.removeItem('reduxState');

  Swal.fire({
    position: 'top',
    icon: 'success',
    text: 'Logged out!',
    showConfirmButton: false,
    timer: 1000
  });
};

export const forgotPassword = async (nik) => {
  const { data } = await axios.post(`${config.baseUrl}/user/forgot-password`, { nik });
  return data;
};

export const resetPassword = async ({ token, newPassword }) => {
  const { data } = await axios.post(`${config.baseUrl}/user/reset-password`, {
    token,
    newPassword
  });
  return data;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('access_token');
  const fullname = localStorage.getItem('fullname');
  const level = localStorage.getItem('level');

  return !!(token && fullname && level);
};

// Redirect to login if not authenticated
export const requireAuth = (currentPath = window.location.pathname) => {
  const authPaths = ['/hr/login', '/hr/forgot-password', '/hr/reset-password'];
  const isAuthPath = authPaths.some(path => currentPath.includes(path));

  if (!isAuthenticated() && !isAuthPath) {
    window.location.href = '/hr/login';
    return false;
  }

  return true;
};

// Enhanced logout with automatic redirect to login
// export const logoutAndRedirectToLogin = async () => {
//   await logout();
//   window.location.href = '/hr/login';
// };

// Create a more robust logout that handles both normal and silent scenarios
// export const performLogout = (options = {}) => {
//   const { silent = false, redirect = true } = options;

//   if (silent) {
//     silentLogout();
//   } else {
//     logout();
//   }

//   if (redirect && !window.location.pathname.includes('/hr/login')) {
//     setTimeout(() => {
//       window.location.href = '/hr/login';
//     }, silent ? 0 : 1000); // Immediate redirect for silent, delay for normal logout
//   }
// };

// Get current user info from localStorage
// export const getCurrentUser = () => {
//   const token = localStorage.getItem('access_token');
//   const fullname = localStorage.getItem('fullname');
//   const level = localStorage.getItem('level');

//   if (!token) return null;

//   return {
//     access_token: token,
//     fullname,
//     level,
//     isAuthenticated: true
//   };
// };

// Silent logout without showing popup (for tab close events)
export const silentLogout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('fullname');
  localStorage.removeItem('level');
  localStorage.removeItem('reduxState');

  // Clear any other authentication-related data
  // You can add more items here if needed
  localStorage.removeItem('sessionData');
  sessionStorage.clear();
};

// Setup automatic logout when tab/window is closed
export const setupAutoLogoutOnTabClose = () => {
  // Handle page unload (tab close, browser close, page refresh)
  const handleBeforeUnload = (event) => {
    // Perform silent logout
    silentLogout();

    // Note: Modern browsers ignore custom messages in beforeunload
    // but we can still perform cleanup operations
  };

  // Handle visibility change (tab switching, minimizing)
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      // Optional: You can also logout when tab becomes hidden
      // Uncomment the line below if you want this behavior
      // silentLogout();
    }
  };

  // Handle page unload (more reliable for cleanup)
  const handleUnload = () => {
    silentLogout();
  };

  // Handle browser/tab close specifically
  const handleWindowBeforeUnload = (event) => {
    // This is specifically for when the user closes the tab/browser
    // Navigator.sendBeacon can be used for reliable cleanup even if page is closing
    silentLogout();

    // Try to send a logout signal to the server if needed
    // Uncomment and modify the following if you need server-side logout
    /*
    try {
      navigator.sendBeacon(`${config.baseUrl}/user/logout`, JSON.stringify({
        token: localStorage.getItem('access_token')
      }));
    } catch (error) {
      console.warn('Failed to send logout beacon:', error);
    }
    */
  };

  // Add event listeners
  window.addEventListener('beforeunload', handleWindowBeforeUnload);
  window.addEventListener('unload', handleUnload);
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Also handle page hide event (iOS Safari compatibility)
  window.addEventListener('pagehide', handleUnload);

  // Return cleanup function to remove listeners if needed
  return () => {
    window.removeEventListener('beforeunload', handleWindowBeforeUnload);
    window.removeEventListener('unload', handleUnload);
    window.removeEventListener('pagehide', handleUnload);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
};

// Enhanced logout with optional redirect
export const logoutWithRedirect = async (redirectPath = '/login') => {
  await logout();

  // Redirect to login page or specified path
  if (window.location.pathname !== redirectPath) {
    window.location.href = redirectPath;
  }
};

// Advanced auto-logout setup with options
export const setupAdvancedAutoLogout = (options = {}) => {
  const {
    logoutOnTabClose = true,
    logoutOnRefresh = false,
    logoutOnTabSwitch = false,
    excludePaths = ['/login', '/forgot-password', '/reset-password']
  } = options;

  // Check if current path should be excluded from auto-logout
  const shouldExcludePath = () => {
    return excludePaths.some(path => window.location.pathname.includes(path));
  };

  let isRefresh = false;

  const handleBeforeUnload = (event) => {
    if (shouldExcludePath()) return;

    // Detect if this is a page refresh
    isRefresh = event.persisted ||
      (window.performance && window.performance.navigation.type === 1);

    if (logoutOnTabClose && !isRefresh) {
      silentLogout();
    } else if (logoutOnRefresh && isRefresh) {
      silentLogout();
    }
  };

  const handleUnload = () => {
    if (shouldExcludePath()) return;

    if (logoutOnTabClose) {
      silentLogout();
    }
  };

  const handleVisibilityChange = () => {
    if (shouldExcludePath()) return;

    if (logoutOnTabSwitch && document.visibilityState === 'hidden') {
      silentLogout();
    }
  };

  // Add event listeners
  window.addEventListener('beforeunload', handleBeforeUnload);
  window.addEventListener('unload', handleUnload);
  window.addEventListener('pagehide', handleUnload);
  document.addEventListener('visibilitychange', handleVisibilityChange);

  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    window.removeEventListener('unload', handleUnload);
    window.removeEventListener('pagehide', handleUnload);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
};
