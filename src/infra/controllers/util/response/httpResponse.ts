export function ok(value: any) {
  return {
    value,
    statusCode: 200,
  };
}

export function created(value: any) {
  return {
    value,
    statusCode: 201,
  };
}

export function badRequest(value: any) {
  return {
    value,
    statusCode: 400,
  };
}

export function unauthorized(value: any) {
  return {
    value,
    statusCode: 401,
  };
}

export function notFound(value: any) {
  return {
    value,
    statusCode: 404,
  };
}
