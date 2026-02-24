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

export interface GuestSessionResponse {
    success: boolean;
    guest_session_id: string;
    expires_at: string;
}

export interface AccountDetails {
    id: number;
    username: string;
    avatar: {
        tmdb: { avatar_path: string | null };
    };
    include_adult: boolean;
}
