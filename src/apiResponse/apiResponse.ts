export function apiResponse(
  status: number,
  data?: { message?: string; object?: any },
) {
  return {
    status,
    data,
  };
}
