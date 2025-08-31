import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface CameraViewProps {
    onCapture: (uri: string) => void;
    onError?: (error: string) => void;
}

export default function CameraView({ onCapture, onError }: CameraViewProps) {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [cameraReady, setCameraReady] = useState(false);
    const [flashMode, setFlashMode] = useState<'off' | 'on'>('off');
    const cameraRef = useRef<any>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleCameraReady = () => {
        setCameraReady(true);
    };

    const handleCapture = async () => {
        if (!cameraRef.current || !cameraReady) {
            Alert.alert('Camera not ready', 'Please wait for the camera to initialize.');
            return;
        }

        try {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.8,
                base64: false,
                skipProcessing: false,
            });

            if (photo.uri) {
                onCapture(photo.uri);
            } else {
                throw new Error('Failed to capture photo');
            }
        } catch (error) {
            console.error('Error capturing photo:', error);
            onError?.('Failed to capture photo. Please try again.');
        }
    };

    const toggleFlash = () => {
        setFlashMode(flashMode === 'off' ? 'on' : 'off');
    };

    if (hasPermission === null) {
        return (
            <ThemedView style={styles.container}>
                <ThemedText>Requesting camera permission...</ThemedText>
            </ThemedView>
        );
    }

    if (hasPermission === false) {
        return (
            <ThemedView style={styles.container}>
                <ThemedText>No access to camera</ThemedText>
                <ThemedText>Camera permission is required to scan business cards.</ThemedText>
            </ThemedView>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.camera}>
                {/* Placeholder for camera - will be implemented with proper expo-camera setup */}
                <View style={styles.overlay}>
                    {/* Bounding Box Guide */}
                    <View style={styles.boundingBox}>
                        <View style={styles.corner} />
                        <View style={[styles.corner, styles.topRight]} />
                        <View style={[styles.corner, styles.bottomLeft]} />
                        <View style={[styles.corner, styles.bottomRight]} />
                    </View>

                    {/* Instructions */}
                    <View style={styles.instructions}>
                        <ThemedText style={styles.instructionText}>
                            Position the business card within the frame
                        </ThemedText>
                    </View>
                </View>

                {/* Camera Controls */}
                <View style={styles.controls}>
                    {/* Flash Toggle */}
                    <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
                        <ThemedText style={styles.flashIcon}>
                            {flashMode === 'on' ? '⚡' : '⚡'}
                        </ThemedText>
                    </TouchableOpacity>

                    {/* Capture Button */}
                    <TouchableOpacity
                        style={[styles.captureButton, !cameraReady && styles.captureButtonDisabled]}
                        onPress={handleCapture}
                        disabled={!cameraReady}
                    >
                        <View style={styles.captureButtonInner} />
                    </TouchableOpacity>

                    {/* Placeholder for future controls */}
                    <View style={styles.placeholder} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        backgroundColor: '#000',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boundingBox: {
        width: 280,
        height: 180,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 8,
        position: 'relative',
    },
    corner: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderColor: '#007AFF',
        top: -2,
        left: -2,
    },
    topRight: {
        top: -2,
        right: -2,
        left: 'auto',
        borderLeftWidth: 0,
        borderRightWidth: 3,
    },
    bottomLeft: {
        bottom: -2,
        top: 'auto',
        borderTopWidth: 0,
        borderBottomWidth: 3,
    },
    bottomRight: {
        bottom: -2,
        right: -2,
        top: 'auto',
        left: 'auto',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 3,
        borderRightWidth: 3,
    },
    instructions: {
        position: 'absolute',
        bottom: 120,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    instructionText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    controls: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    flashButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flashIcon: {
        fontSize: 24,
        color: 'white',
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: 'white',
    },
    captureButtonDisabled: {
        opacity: 0.5,
    },
    captureButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
    },
    placeholder: {
        width: 50,
        height: 50,
    },
});
