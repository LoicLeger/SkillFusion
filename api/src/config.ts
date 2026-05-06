if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

if (!process.env.ALLOWED_ORIGINS) {
  throw new Error("ALLOWED_ORIGINS environment variable is required");
}

export const config = {
  port: parseInt(process.env.PORT || "3000"),
  allowedOrigins: process.env.ALLOWED_ORIGINS!,
  isProd: process.env.NODE_ENV === "production" || false,
  jwtSecret: process.env.JWT_SECRET!,
  jwtAccesExpireIn: 15 * 60,  
jwtRefreshExpireIn: 7 * 24 * 60 * 60,
  emailUser: process.env.EMAIL_USER ?? "",
  emailPass: process.env.EMAIL_PASS ?? "",
  corsOriginUrl: process.env.CORS_ORIGIN_URL ?? "",
};