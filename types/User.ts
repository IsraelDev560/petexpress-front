export interface User {
    id: string;
    username: string;
    role: string;
    authorities: string[];
    enabled: boolean;
}