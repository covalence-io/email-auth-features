import { getTempToken } from "../utilities/tokens";
import { mail } from "../utilities/mailer";
import config from "../config";

export const sendRegistrationEmail = (email: string) => {
    const token = getTempToken({ email });
    const html = `<p>Thank you for registering! Please click here to <a href="${config.domain.url}/verify?token=${token}&email=${email}&type=verify">verify your account</a></p>`;
    return mail({ to: email, from: "<Registration> auth@atlc.dev", subject: "Please verify your account", html });
};
