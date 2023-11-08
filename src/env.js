export const config = {
  baseUrl: process.env.NODE_ENV === 'development'
    ? 'http://localhost:8001' // URL for development
    : 'https://idx-cfi.herokuapp.com', // URL for production
};
