import * as dotenv from "dotenv";
dotenv.config();

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

if (!DB_USER || !DB_PASS || !DB_HOST || !DB_NAME) {
    throw new Error("Some required environment variables are undefined [database config]");
}

const mysql = {
    user: DB_USER,
    password: DB_PASS,
    host: DB_HOST,
    database: DB_NAME
};

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
    throw new Error("Some required environment variables are undefined [JWT config]");
}

const jwt = {
    secret: JWT_SECRET
};

const { MAILGUN_KEY, MAILGUN_DOMAIN } = process.env;

if (!MAILGUN_KEY || !MAILGUN_DOMAIN) {
    throw new Error("Some required environment variables are undefined [mail service config]");
}

const mailgun = {
    api_key: MAILGUN_KEY,
    domain: MAILGUN_DOMAIN
};

const { DOMAIN_URL } = process.env;

if (!DOMAIN_URL) {
    throw new Error("Some required environment variables are undefined [mail service config]");
}

const domain = {
    url: DOMAIN_URL
};

export default {
    mysql,
    jwt,
    mailgun,
    domain
};
