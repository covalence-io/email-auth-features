import * as jwt from "jsonwebtoken";
import config from "../config";

interface LoginPayload {
    id: number;
    email: string;
    role: "user";
}

interface TempPayload {
    email: string;
}

const sign = (data: LoginPayload | TempPayload, time: string) => {
    return jwt.sign(data, config.jwt.secret, { expiresIn: time });
};

export const getLoginToken = (payload: LoginPayload) => sign(payload, "30d");
export const getTempToken = (payload: TempPayload) => sign(payload, "15m");

export const verify = (data: string) => {
    return jwt.verify(data, config.jwt.secret);
};
