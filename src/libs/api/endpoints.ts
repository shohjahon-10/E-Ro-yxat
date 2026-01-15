export const ENDPOINTS = {
  userMe: "/auth/me",
  signIn: "/auth/login",
  refreshToken: "/auth/refresh",
  corporationEndpoint: "/api/book-corporations",
  storeEndpoint: "/api/store",
  storeWorkedUsersEndpoint: "/api/store/worked-users",
  invoiceEndpoint: "/api/sales/pdf/invoice",
  customersEndpoint: "/api/product-sale/customers",
  forgotPassword: "/api/auth/forgot-password",
  verifyCode: "/api/auth/verify-code",
} as const;
