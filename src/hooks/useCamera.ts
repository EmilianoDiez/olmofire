import { useState, useCallback } from 'react';
import { requestCameraPermission, checkCameraPermission } from '../utils/permissions';

interface UseCameraResult {
  isLoading: boolean;
  hasPermission: boolean;
  error: string | null;
  initializeCamera: () => Promise<void>;
  resetError: () => void;
}

export const useCamera = (): UseCameraResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const initializeCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Primero verificamos si ya tenemos permiso
      const hasExistingPermission = await checkCameraPermission();
      if (hasExistingPermission) {
        setHasPermission(true);
        return;
      }

      // Solicitamos permiso si es necesario
      const granted = await requestCameraPermission();
      if (!granted) {
        setError('Para usar el escáner, necesitamos acceso a la cámara. Por favor, revisa la configuración de tu dispositivo.');
        return;
      }

      setHasPermission(true);
    } catch (err) {
      setError('No se pudo acceder a la cámara. Por favor, verifica que tu dispositivo tenga una cámara y que esté funcionando correctamente.');
      console.error('Error al inicializar la cámara:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    hasPermission,
    error,
    initializeCamera,
    resetError
  };
};