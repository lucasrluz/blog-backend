export function createResponse(
  status: number,
  data?: { message?: string; object?: any },
) {
  return {
    status,
    data,
  };
}
