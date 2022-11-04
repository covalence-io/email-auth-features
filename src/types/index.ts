export interface User {
    id?: number;
    email: string;
    password: string;
    isVerified: 0 | 1;
}

export interface LoginPayload {
    id: number;
    email: string;
    role: "user";
}

export interface TempPayload {
    email: string;
}
