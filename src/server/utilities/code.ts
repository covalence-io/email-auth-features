import { Code } from "../../types";
import Codes from "../database/queries/codes";
import { randomInt } from "crypto";

const FIFTEEN_MINUTES = 1000 * 60 * 15;

export const generateCode = async (email: string): Promise<Code> => {
    const start = Date.now();
    const end = start + FIFTEEN_MINUTES;

    const randomNumber = randomInt(999999);

    const code: Code = { email, created_at: start, expires_at: end, code: randomNumber };

    try {
        await Codes.destroy(email);
    } catch (error) {
        console.log(error);
    }

    return code;
};

export const validate = async (code: number, email: string) => {
    const now = Date.now();

    try {
        const [match] = await Codes.get(email);
        if (!match) return false;

        const isNotExpired = now <= match.expires_at;
        const codesMatch = code === match.code;

        return isNotExpired && codesMatch;
    } catch (error) {
        return false;
    }
};
