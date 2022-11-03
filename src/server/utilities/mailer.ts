import * as Mailgun from "mailgun.js";
import * as FormData from "form-data";
import MailGun from "mailgun.js";
import config from "../config";

const mailgun = new (<typeof MailGun>(<any>Mailgun))(<any>FormData).client({
    username: "api",
    key: config.mailgun.api_key
});

interface MailFunctionProps {
    to: string;
    from: string;
    subject: string;
    html: string;
}

export const mail = ({ to, from, subject, html }: MailFunctionProps) => {
    return mailgun.messages.create(config.mailgun.domain, { to, from, subject, html });
};
