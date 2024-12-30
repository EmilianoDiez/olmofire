import React, { useEffect, useState } from 'react';
import { Camera } from 'lucide-react';
import { usePoolStore } from '../store/usePoolStore';
import { requestCameraPermission, checkCameraPermission } from '../utils/permissionUtils';

const PermissionRequest = () => {
  const [isChecking, setIsChecking] = useState(true);
  const { hasGrantedPermissions, setPermissionsGranted } = usePoolStore();

  useEffect(() => {
    const checkPermissions = async () => {
      const hasPermission = await checkCameraPermission();
      setPermissionsGranted(hasPermission);
      setIsChecking(false);
    };
    checkPermissions();
  }, [setPermissionsGranted]);

  const handleRequestPermission = async () => {
    const granted = await requestCameraPermission();
    setPermissionsGranted(granted);
  };

  if (isChecking) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (hasGrantedPermissions) {
    return null;
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <Camera className="w-6 h-6 text-blue-600 mt-1" />
        <div>
          <h3 className="font-medium text-blue-900">Permisos necesarios</h3>
          <p className="text-sm text-blue-700 mb-3">
            Para usar el escáner QR, necesitamos acceso a tu cámara.
          </p>
          <button
            onClick={handleRequestPermission}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Permitir acceso a la cámara
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionRequest;