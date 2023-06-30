export interface User {
    username: string;
    displayNeame: string;
    token: string;
    image?: null;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayNeame?: string;
    userName?: string;
}