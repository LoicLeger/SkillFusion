if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required');
}

if (!process.env.ALLOWED_ORIGINS) {
    throw new Error('ALLOWED_ORIGINS environment variable is required');
}

if (!process.env.CORS_ORIGIN_URL) {
    throw new Error('CORS_ORIGIN_URL environment variable is required');
}

if (!process.env.JWT_ACCES_EXPIRES_IN || Number.isNaN(Number(process.env.JWT_ACCES_EXPIRES_IN))) {
    throw new Error(
        'JWT_ACCES_EXPIRES_IN environment variable is required and must be a valid number'
    );
}

if (
    !process.env.JWT_REFRESH_EXPIRES_IN ||
    Number.isNaN(Number(process.env.JWT_REFRESH_EXPIRES_IN))
) {
    throw new Error(
        'JWT_REFRESH_EXPIRES_IN environment variable is required and must be a valid number'
    );
}

if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is required');
}

if (!process.env.RESEND_EMAIL) {
    throw new Error('RESEND_EMAIL environment variable is required');
}

export const config = {
    port: parseInt(process.env.PORT || '3000'),
    allowedOrigins: process.env.ALLOWED_ORIGINS!,
    isProd: process.env.NODE_ENV === 'production' || false,
    jwtSecret: process.env.JWT_SECRET!,
    jwtAccesExpireIn: Number(process.env.JWT_ACCES_EXPIRES_IN),
    jwtRefreshExpireIn: Number(process.env.JWT_REFRESH_EXPIRES_IN),
    resendApiKey: process.env.RESEND_API_KEY!,
    resendEmail: process.env.RESEND_EMAIL!,
    corsOriginUrl: process.env.CORS_ORIGIN_URL!,
};
