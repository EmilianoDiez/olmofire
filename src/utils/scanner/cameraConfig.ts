export const getCameraConfig = () => ({
  facingMode: { exact: 'environment' },
  width: { min: 640, ideal: 1280, max: 1920 },
  height: { min: 480, ideal: 720, max: 1080 },
});

export const getQRScannerConfig = () => ({
  fps: 10,
  qrbox: { width: 250, height: 250 },
  aspectRatio: 1,
});