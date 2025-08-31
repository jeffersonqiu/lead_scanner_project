import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import PermissionRequest from '@/components/PermissionRequest';
import CameraView from '@/components/CameraView';

export default function CameraScreen() {
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [capturedImageUri, setCapturedImageUri] = useState<string | null>(null);

  const handlePermissionsGranted = () => {
    setPermissionsGranted(true);
  };

  const handleCapture = (uri: string) => {
    console.log('Image captured:', uri);
    setCapturedImageUri(uri);
    Alert.alert(
      'Image Captured!',
      'Business card image has been captured successfully. Processing will be implemented in the next phase.',
      [
        { text: 'OK', onPress: () => setCapturedImageUri(null) }
      ]
    );
  };

  const handleCameraError = (error: string) => {
    Alert.alert('Camera Error', error);
  };

  return (
    <PermissionRequest onPermissionsGranted={handlePermissionsGranted}>
      {permissionsGranted ? (
        <CameraView
          onCapture={handleCapture}
          onError={handleCameraError}
        />
      ) : (
        <ThemedView style={styles.container}>
          <ThemedView style={styles.content}>
            <ThemedText type="title">Camera Screen</ThemedText>
            <ThemedText type="subtitle">Business Card Scanner</ThemedText>
            <ThemedText>
              Camera permissions granted! Ready to scan business cards.
            </ThemedText>
          </ThemedView>
        </ThemedView>
      )}
    </PermissionRequest>
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
    gap: 16,
  },
});
