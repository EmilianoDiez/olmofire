export const diagnoseCameraError = (error: unknown): string => {
  if (error instanceof Error) {
    // Errores específicos de permisos
    if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
      return 'Acceso a la cámara denegado. Por favor, permite el acceso en la configuración de tu dispositivo.';
    }

    // Errores de hardware
    if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
      return 'No se encontró ninguna cámara en el dispositivo.';
    }

    if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
      return 'La cámara está en uso por otra aplicación o no responde.';
    }

    // Errores de seguridad
    if (error.name === 'SecurityError') {
      return 'Error de seguridad al acceder a la cámara.';
    }

    // Errores de soporte
    if (error.name === 'TypeError') {
      return 'Tu navegador no soporta el acceso a la cámara.';
    }
  }

  return 'Error desconocido al acceder a la cámara. Por favor, intenta de nuevo.';
};