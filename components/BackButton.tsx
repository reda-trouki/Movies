import { Pressable, StyleSheet, Platform, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BackButton() {
    const router = useRouter();

    return (
        <View style={styles.buttonContainer}>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed,
                ]}
                onPress={router.back}
                android_ripple={{ color: '#DDDDDD', borderless: true }} // Ripple effect for Android
                accessibilityRole="button"
                accessibilityLabel="Go back"
            >
                <Ionicons name="arrow-back" size={30} style={styles.icon} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: 'white', // White background for Android
        width: 50,
        height: 50,
        borderRadius: 25, // Make it circular
        overflow: 'hidden', // Ensure ripple effect stays within bounds
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 3, // Add elevation for Android
            },
        }),
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonPressed: {
        backgroundColor: '#F0F0F0', // Change background color when pressed
    },
    icon: {
        padding: 10,
    },
});