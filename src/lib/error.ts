export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function isAPIError(error: unknown): error is APIError {
  return error instanceof APIError;
}

export async function handleAPIResponse<T>(response: Response): Promise<T> {
  let data;
  
  try {
    data = await response.json();
  } catch (error) {
    console.error('JSON Parse Error:', {
      error,
      status: response.status,
      url: response.url
    });
    throw new APIError(
      'خطا در پردازش پاسخ سرور',
      response.status || 500
    );
  }

  // لاگ کردن همه درخواست‌ها برای دیباگ
  console.debug('API Response:', {
    status: response.status,
    data,
    url: response.url,
  });

  if (!response.ok) {
    const errorMessage = data?.detail || 'خطای ناشناخته';
    console.error('API Error:', {
      status: response.status,
      message: errorMessage,
      data,
      url: response.url
    });

    throw new APIError(
      errorMessage,
      response.status || 500
    );
  }

  return data;
} 