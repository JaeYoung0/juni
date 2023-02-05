declare global {
  interface Window {
    ReactNativeWebView: any
  }
}

export class NativeBridge {
  constructor() {}

  openTimer = () => {
    window.ReactNativeWebView.postMessage('openTimer')
  }
}
