export function forEach(items: Number[], callback: any) {
  for (const item of items) {
    callback(item);
  }
}
