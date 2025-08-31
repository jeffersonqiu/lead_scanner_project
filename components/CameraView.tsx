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
                <View style={styles.placeholderCamera}>
                    <ThemedText style={styles.placeholderText}>
                        Camera Feed Placeholder
                    </ThemedText>
                    <ThemedText style={styles.placeholderSubtext}>
                        Live camera will be implemented in next phase
                    </ThemedText>
                </View>
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

                {/* Navigation Header */}
                <View style={styles.navigationHeader}>
                    <TouchableOpacity style={styles.backButton}>
                        <ThemedText style={styles.backIcon}>←</ThemedText>
                    </TouchableOpacity>
                    <ThemedText style={styles.headerTitle}>Scan Business Card</ThemedText>
                    <View style={styles.headerSpacer} />
                </View>

                {/* Mode Selection Bar */}
                <View style={styles.modeSelectionBar}>
                    <TouchableOpacity style={styles.modeButton}>
                        <ThemedText style={styles.modeText}>Gallery</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.modeButton, styles.activeModeButton]}>
                        <ThemedText style={styles.activeModeText}>Scan</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modeButton}>
                        <ThemedText style={styles.modeText}>Flash</ThemedText>
                    </TouchableOpacity>
                </View>

                {/* Bottom Control Bar */}
                <View style={styles.bottomControlBar}>
                    <View style={styles.placeholder} />
                    <TouchableOpacity
                        style={[styles.captureButton, !cameraReady && styles.captureButtonDisabled]}
                        onPress={handleCapture}
                        disabled={!cameraReady}
                    >
                        <View style={styles.captureButtonOuter} />
                        <View style={styles.captureButtonInner} />
                    </TouchableOpacity>
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
        width: 300,
        height: 190,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 12,
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    corner: {
        position: 'absolute',
        width: 24,
        height: 24,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderColor: '#00D4FF',
        top: -1,
        left: -1,
    },
    topRight: {
        top: -1,
        right: -1,
        left: 'auto',
        borderLeftWidth: 0,
        borderRightWidth: 2,
    },
    bottomLeft: {
        bottom: -1,
        top: 'auto',
        borderTopWidth: 0,
        borderBottomWidth: 2,
    },
    bottomRight: {
        bottom: -1,
        right: -1,
        top: 'auto',
        left: 'auto',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 2,
        borderRightWidth: 2,
    },
    instructions: {
        position: 'absolute',
        bottom: 200,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    instructionText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 20,
        letterSpacing: 0.5,
    },
    // Navigation Header
    navigationHeader: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        zIndex: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        fontSize: 18,
        color: '#333',
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2E7D32',
    },
    headerSpacer: {
        width: 40,
    },

    // Mode Selection Bar
    modeSelectionBar: {
        position: 'absolute',
        top: 120,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 25,
        paddingHorizontal: 4,
        paddingVertical: 4,
        zIndex: 10,
    },
    modeButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    modeText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    activeModeButton: {
        backgroundColor: '#E8F5E8',
    },
    activeModeText: {
        fontSize: 14,
        color: '#2E7D32',
        fontWeight: '600',
    },

    // Bottom Control Bar
    bottomControlBar: {
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40,
        zIndex: 10,
    },
    galleryButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    galleryIcon: {
        fontSize: 24,
        color: '#666',
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButtonOuter: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#E0E0E0',
        backgroundColor: 'transparent',
    },
    captureButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#4CAF50',
        borderWidth: 2,
        borderColor: '#45A049',
    },
    captureButtonDisabled: {
        opacity: 0.5,
    },
    flashButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flashIcon: {
        fontSize: 20,
        color: '#666',
    },
    placeholder: {
        width: 50,
        height: 50,
    },
    placeholderCamera: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    placeholderText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    placeholderSubtext: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
        textAlign: 'center',
    },
});
