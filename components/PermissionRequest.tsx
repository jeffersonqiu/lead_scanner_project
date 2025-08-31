import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { checkPermissions, requestAllPermissions, PermissionStatus } from '@/utils/permissions';

interface PermissionRequestProps {
  onPermissionsGranted: () => void;
  children?: React.ReactNode;
}

export default function PermissionRequest({ onPermissionsGranted, children }: PermissionRequestProps) {
  const [permissions, setPermissions] = useState<PermissionStatus>({
    camera: false,
    mediaLibrary: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkCurrentPermissions();
  }, []);

  const checkCurrentPermissions = async () => {
    try {
      const currentPermissions = await checkPermissions();
      setPermissions(currentPermissions);
      
      // If all permissions are granted, call the callback
      if (currentPermissions.camera && currentPermissions.mediaLibrary) {
        onPermissionsGranted();
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestPermissions = async () => {
    try {
      setIsLoading(true);
      const newPermissions = await requestAllPermissions();
      setPermissions(newPermissions);
      
      if (newPermissions.camera && newPermissions.mediaLibrary) {
        onPermissionsGranted();
      } else {
        // Show alert if permissions were denied
        Alert.alert(
          'Permissions Required',
          'Camera and photo library access are required to scan business cards. Please enable these permissions in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => checkCurrentPermissions() },
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
      Alert.alert('Error', 'Failed to request permissions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Checking permissions...</ThemedText>
      </ThemedView>
    );
  }

  // If all permissions are granted, render children
  if (permissions.camera && permissions.mediaLibrary) {
    return <>{children}</>;
  }

  // Show permission request UI
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title">Permissions Required</ThemedText>
        <ThemedText type="subtitle">Lead Scanner Pro needs access to:</ThemedText>
        
        <ThemedView style={styles.permissionList}>
          <ThemedView style={styles.permissionItem}>
            <ThemedText type="defaultSemiBold">📷 Camera</ThemedText>
            <ThemedText>To scan business cards</ThemedText>
            <ThemedText style={styles.status}>
              {permissions.camera ? '✅ Granted' : '❌ Not granted'}
            </ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.permissionItem}>
            <ThemedText type="defaultSemiBold">🖼️ Photo Library</ThemedText>
            <ThemedText>To save scanned images</ThemedText>
            <ThemedText style={styles.status}>
              {permissions.mediaLibrary ? '✅ Granted' : '❌ Not granted'}
            </ThemedText>
          </ThemedView>
        </ThemedView>
        
        <ThemedText style={styles.description}>
          These permissions are essential for the app to function properly. 
          Your privacy is important - we only access these features when you actively use them.
        </ThemedText>
        
        <ThemedView style={styles.buttonContainer}>
          <ThemedView style={styles.button} onTouchEnd={handleRequestPermissions}>
            <ThemedText style={styles.buttonText}>Grant Permissions</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    gap: 20,
    maxWidth: 400,
  },
  permissionList: {
    width: '100%',
    gap: 16,
  },
  permissionItem: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 4,
  },
  status: {
    fontSize: 14,
    marginTop: 4,
  },
  description: {
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
