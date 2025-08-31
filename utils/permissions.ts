import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export interface PermissionStatus {
  camera: boolean;
  mediaLibrary: boolean;
}

/**
 * Request camera permission
 * @returns Promise<boolean> - true if permission granted, false otherwise
 */
export async function requestCameraPermission(): Promise<boolean> {
  try {
    const { status } = await Camera.requestCameraPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting camera permission:', error);
    return false;
  }
}

/**
 * Request media library permission
 * @returns Promise<boolean> - true if permission granted, false otherwise
 */
export async function requestMediaLibraryPermission(): Promise<boolean> {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting media library permission:', error);
    return false;
  }
}

/**
 * Check current permission status
 * @returns Promise<PermissionStatus> - current status of all permissions
 */
export async function checkPermissions(): Promise<PermissionStatus> {
  try {
    const [cameraStatus, mediaLibraryStatus] = await Promise.all([
      Camera.getCameraPermissionsAsync(),
      MediaLibrary.getPermissionsAsync(),
    ]);

    return {
      camera: cameraStatus.status === 'granted',
      mediaLibrary: mediaLibraryStatus.status === 'granted',
    };
  } catch (error) {
    console.error('Error checking permissions:', error);
    return {
      camera: false,
      mediaLibrary: false,
    };
  }
}

/**
 * Request all necessary permissions for the app
 * @returns Promise<PermissionStatus> - status after requesting permissions
 */
export async function requestAllPermissions(): Promise<PermissionStatus> {
  try {
    const [cameraGranted, mediaLibraryGranted] = await Promise.all([
      requestCameraPermission(),
      requestMediaLibraryPermission(),
    ]);

    return {
      camera: cameraGranted,
      mediaLibrary: mediaLibraryGranted,
    };
  } catch (error) {
    console.error('Error requesting all permissions:', error);
    return {
      camera: false,
      mediaLibrary: false,
    };
  }
}
