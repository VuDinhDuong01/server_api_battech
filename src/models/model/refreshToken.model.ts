import mongoose, { Model } from "mongoose";
import { RefreshTokenType,refreshTokenSchema } from "../schemas/refresh_token.schemas";

export const refreshTokenModel: Model<RefreshTokenType> = mongoose.model('refreshTokenModel', refreshTokenSchema);