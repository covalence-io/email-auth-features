import * as twilio from "twilio";
import config from "../config";

interface Message {
    body: string;
    to: string;
}

const { account_SID, auth_token, twilio_number } = config.twilio;

const client = twilio(account_SID, auth_token);

export const sendMessage = ({ to, body }: Message) => {
    return client.messages.create({ to, body, from: twilio_number });
};
