export interface TokenResponse {
    success: boolean;
    expires_at: string;
    request_token: string;
}

export interface SessionResponse {
    success: boolean;
    session_id: string;
}

export interface AuthCredentials {
    username: string;
    password: string;
}
