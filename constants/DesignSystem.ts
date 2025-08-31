// Design System Constants for Lead Scanner Pro
// Inspired by Expensify and modern mobile app design patterns

export const DesignSystem = {
    // Color Palette
    colors: {
        primary: '#2E7D32', // Green accent color
        primaryLight: '#4CAF50', // Lighter green for buttons
        primaryDark: '#1B5E20', // Darker green for hover states
        secondary: '#666666', // Gray for inactive elements
        background: '#FFFFFF', // White background
        surface: 'rgba(255, 255, 255, 0.95)', // Semi-transparent white
        border: '#E0E0E0', // Light gray borders
        text: {
            primary: '#333333', // Dark text
            secondary: '#666666', // Secondary text
            inverse: '#FFFFFF', // White text on dark backgrounds
        },
        status: {
            success: '#4CAF50',
            warning: '#FF9800',
            error: '#F44336',
        }
    },

    // Typography
    typography: {
        fontSizes: {
            xs: 12,
            sm: 14,
            md: 16,
            lg: 18,
            xl: 20,
            xxl: 24,
        },
        fontWeights: {
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
        },
        lineHeights: {
            tight: 1.2,
            normal: 1.4,
            relaxed: 1.6,
        }
    },

    // Spacing
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },

    // Border Radius
    borderRadius: {
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        full: 9999,
    },

    // Shadows
    shadows: {
        sm: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
        },
        md: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 4,
        },
        lg: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 8,
        }
    },

    // Component Styles
    components: {
        button: {
            primary: {
                backgroundColor: '#4CAF50',
                borderRadius: 20,
                paddingVertical: 12,
                paddingHorizontal: 24,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
            },
            secondary: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 20,
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderWidth: 1,
                borderColor: '#E0E0E0',
            }
        },
        card: {
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
        },
        input: {
            backgroundColor: '#FFFFFF',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#E0E0E0',
            paddingHorizontal: 16,
            paddingVertical: 12,
        }
    }
};

export default DesignSystem;
