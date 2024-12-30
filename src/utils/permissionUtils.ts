export const requestCameraPermission = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    stream.getTracks().forEach(track => track.stop());
    return true;
  } catch (error) {
    console.error('Error requesting camera permission:', error);
    return false;
  }
};

export const checkCameraPermission = async () => {
  try {
    const permissions = await navigator.permissions.query({ name: 'camera' as PermissionName });
    return permissions.state === 'granted';
  } catch (error) {
    console.error('Error checking camera permission:', error);
    return false;
  }
};