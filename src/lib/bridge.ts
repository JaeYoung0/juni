declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: string) => void
    }
  }
}

export class NativeBridge {
  constructor() {}

  openTimer = () => {
    window.ReactNativeWebView.postMessage('openTimer')
  }
}
