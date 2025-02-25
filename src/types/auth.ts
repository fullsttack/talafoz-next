export interface User {
  id: number;
  phone_number: string;
  full_name: string;
  is_verified: boolean;
}

export interface Tokens {
  access: string;
  refresh: string;
}

export interface FormState {
  success?: boolean;
  message?: string;
  data?: Record<string, unknown>;
}

export interface APIErrorResponse {
  detail: string;
  code?: string;
}

export interface APISuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface APIErrorResult {
  success: false;
  message: string;
  status?: number;
  code?: string;
}

export interface SendOTPResponse {
  detail: string;
}

export interface VerifyOTPResponse {
  detail: string;
  user: User;
  tokens: Tokens;
}

export interface APIResponse<T = Record<string, unknown>> {
  success: boolean;
  message: string;
  data?: T;
} 