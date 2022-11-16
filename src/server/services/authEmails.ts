import { getTempToken } from "../utilities/tokens";
import { mail } from "../utilities/mailer";
import config from "../config";
import { Code } from "../../types";

export const sendRegistrationEmail = (email: string) => {
    const token = getTempToken({ email });
    const html = `<p>Thank you for registering! Please click here to <a href="${config.domain.url}/verify?token=${token}&email=${email}&type=verify">verify your account</a></p>`;
    return mail({ to: email, from: "<Registration> auth@atlc.dev", subject: "Please verify your account", html });
};

export const sendMagicLinkEmail = (email: string) => {
    const token = getTempToken({ email });
    const html = `<p>Here is your<a href="${config.domain.url}/magic_link?token=${token}&email=${email}&type=magic">magic link</a> to log in!</p>`;
    return mail({ to: email, from: "<Magic Link> auth@atlc.dev", subject: "Magic Link for login", html });
};

export const sendResetLink = (email: string) => {
    const token = getTempToken({ email });
    const html = `<p>Here is your<a href="${config.domain.url}/reset?token=${token}&email=${email}&type=reset">password reset link</a> to log in!</p>`;
    return mail({ to: email, from: "<Password Reset> auth@atlc.dev", subject: "Password Reset Link", html });
};

export const sendMFALink = (code: Code) => {
    const html = `<p>Your 6 digit code is here: ${code.code}. We will never ask you to give this to us. Never share this with anyone</p>`;
    return mail({ to: code.email, from: "<MFA Code> auth@atlc.dev", subject: "MFA Login Code.", html });
};
