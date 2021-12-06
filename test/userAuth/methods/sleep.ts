export function sleep(ms: number) {
  return new Promise((resolve: any) => {
    return setTimeout(() => resolve(), ms);
  });
}
