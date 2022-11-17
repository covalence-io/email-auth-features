export interface User {
    id?: number;
    email: string;
    password: string;
    isVerified: 0 | 1;
    mfaIsEnabled: 0 | 1;
    prefersSMS: 0 | 1;
    phone: string; // +12051231234
}

export interface Code {
    code: number;
    email: User["email"];
    created_at: number;
    expires_at: number;
}

export interface LoginPayload {
    id: number;
    email: string;
    role: "user";
}

export interface TempPayload {
    email: string;
}

export interface IAlert {
    text: string;
    variant: "success" | "error" | "";
}
