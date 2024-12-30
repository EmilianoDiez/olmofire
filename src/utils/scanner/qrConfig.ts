import { Html5QrcodeScannerConfig } from 'html5-qrcode';

export const getQRScannerConfig = (): Html5QrcodeScannerConfig => ({
  fps: 10,
  qrbox: { width: 250, height: 250 },
  aspectRatio: 1,
  formatsToSupport: ['QR_CODE'],
  showTorchButtonIfSupported: true,
  hideControls: true, // Hide default controls
  videoConstraints: {
    facingMode: { exact: 'environment' },
    width: { min: 640, ideal: 1280, max: 1920 },
    height: { min: 480, ideal: 720, max: 1080 }
  }
});