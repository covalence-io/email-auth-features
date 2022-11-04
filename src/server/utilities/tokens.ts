import * as jwt from "jsonwebtoken";
import config from "../config";
import { LoginPayload, TempPayload } from "../../types";

const sign = (data: LoginPayload | TempPayload, time: string) => {
    return jwt.sign(data, config.jwt.secret, { expiresIn: time });
};

export const getLoginToken = (payload: LoginPayload) => sign(payload, "30d");
export const getTempToken = (payload: TempPayload) => sign(payload, "15m");

export const verify = (token: string) => {
    return jwt.verify(token, config.jwt.secret);
};
