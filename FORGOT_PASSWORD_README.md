# Forgot Password Implementation

This implementation provides a complete forgot password flow with the following components:

## Files Created/Modified:

### 1. API Functions (`src/apis/user/auth.js`)
- **`forgotPassword(email)`**: Sends a POST request to `/user/forgot-password` with the user's email
- **`resetPassword({ token, newPassword })`**: Sends a POST request to `/user/reset-password` with the reset token and new password

### 2. ForgotPasswordModal Component (`src/views/Login/ForgotPasswordModal.js`)
- Modal that appears when user clicks "Forgot Password?" on login page
- Takes user's email input and sends forgot password request
- Shows success message when email is sent
- Handles validation and error display

### 3. ResetPassword Component (`src/views/Login/ResetPassword.js`)
- Standalone page for resetting password (accessible via URL with token)
- Extracts reset token from URL query parameters
- Validates token exists and redirects to login if invalid
- Form with new password and confirm password fields
- Password strength validation (minimum 6 characters)
- Redirects to login page after successful reset

### 4. Updated Login Component (`src/views/Login/Login.js`)
- Replaced static forgot password modal with new `ForgotPasswordModal`
- Updated state management and handlers

### 5. Routes (`src/routes/routes.js`)
- Added reset password route: `/hr/reset-password`
- Route is accessible without authentication (guest route)

## User Flow:

### Forgot Password Flow:
1. User clicks "Forgot Password?" on login page
2. ForgotPasswordModal opens with email input
3. User enters email and clicks "Send Reset Link"
4. API call to backend `/user/forgot-password` endpoint
5. Backend sends reset email with token link
6. Success message shown to user

### Reset Password Flow:
1. User clicks reset link in email (should redirect to `/hr/reset-password?token=RESET_TOKEN`)
2. ResetPassword component loads and extracts token from URL
3. User enters new password and confirms it
4. Form validates password length and match
5. API call to backend `/user/reset-password` endpoint
6. Success message shown and user redirected to login

## Backend Requirements:

The backend needs to implement these endpoints:

### POST `/user/forgot-password`
**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Password reset email sent successfully"
}
```

### POST `/user/reset-password`
**Request:**
```json
{
  "token": "reset_token_here",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "message": "Password reset successfully"
}
```

## Notes:
- The reset link sent via email should be in format: `https://your-domain.com/hr/reset-password?token=RESET_TOKEN`
- Token should have an expiration time for security
- Backend should validate the token before allowing password reset
- Consider rate limiting the forgot password endpoint to prevent abuse