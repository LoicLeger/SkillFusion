import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { config } from "../config";
import type { User } from "../models/client";

export function generateAuthTokens(user: User) {
  const payload = {
    userId: user.id,
    role: user.roleId,
  };

  const accessToken = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtAccesExpireIn, audience: "access" });
  const refreshUniqueId = crypto.randomBytes(128).toString("base64");
  const refreshToken = jwt.sign(
    { refreshId: refreshUniqueId },
    config.jwtSecret,
    { expiresIn: config.jwtRefreshExpireIn, audience: "refresh" },
  );

  return {
    accessToken: {
      token: accessToken,
      expiresIn: config.jwtAccesExpireIn * 1000,
    },
    refreshToken: {
      token: refreshToken,
      expiresIn: config.jwtRefreshExpireIn* 1000,
    },
  };
}