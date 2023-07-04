export interface User {
    username: string;
    displayName: string;
    token: string;
    image?: null;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    userName?: string;
}