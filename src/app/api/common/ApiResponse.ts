export type ApiResponse<T> =
  | {
      data: T;
      isSuccessful: true;
    }
  | { error: string; isSuccessful: false };
