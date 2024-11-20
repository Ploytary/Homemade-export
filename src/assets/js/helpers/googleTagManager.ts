declare global {
  interface Window {
    dataLayer: Array<object>;
  }
}

export function callGTM(event: string, payload: object): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...payload,
  });
}
