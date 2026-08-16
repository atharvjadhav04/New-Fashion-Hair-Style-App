import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Animated,
    ActivityIndicator,
    Platform,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { COLORS, SPACING, RADIUS } from "../../theme";
import Images from "../../constants/Images";
import AppScreen from "../../components/common/AppScreen";

export default function SplashScreen({ navigation }) {
    // Animation References
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.85)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        // Smooth Entrance Sequence
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 900,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 6,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            navigation.replace("Login");
        }, 2800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AppScreen style={styles.container}>
            <StatusBar
                backgroundColor={COLORS.black}
                barStyle="light-content"
            />

            {/* Background Aesthetic Accent Circles */}
            <View style={styles.glowCircle} />

            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [
                            { scale: scaleAnim },
                            { translateY: slideAnim },
                        ],
                    },
                ]}
            >
                {/* Logo with Gold Ring Highlight */}
                <View style={styles.logoBadgeContainer}>
                    <View style={styles.logoGlowRing} />
                    <Image
                        source={Images.logo}
                        style={styles.logo}
                        contentFit="contain"
                    />
                </View>

                {/* Typography Block */}
                <Text style={styles.title}>NEW FASHION</Text>
                <Text style={styles.subtitle}>HAIR STYLE</Text>

                {/* Subtitle Badge */}
                <View style={styles.tagBadge}>
                    <Ionicons
                        name="sparkles"
                        size={12}
                        color={COLORS.primary}
                    />
                    <Text style={styles.tagText}>
                        PREMIUM GROOMING EXPERIENCE
                    </Text>
                </View>
            </Animated.View>

            {/* Bottom Loading Bar & Copyright */}
            <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
                <ActivityIndicator size="small" color={COLORS.primary} style={styles.loader} />
                <Text style={styles.copyrightText}>
                    Powered by BarberApp • 2026
                </Text>
            </Animated.View>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: SPACING.lg,
    },

    glowCircle: {
        position: "absolute",
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: COLORS.primary,
        opacity: 0.05,
        top: "30%",
    },

    content: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },

    logoBadgeContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: "#18181B",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        marginBottom: 24,
        ...Platform.select({
            ios: {
                shadowColor: COLORS.primary,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.35,
                shadowRadius: 16,
            },
            android: {
                elevation: 10,
            },
        }),
    },

    logoGlowRing: {
        position: "absolute",
        width: 162,
        height: 162,
        borderRadius: 81,
        borderWidth: 1,
        borderColor: "#3D3012",
    },

    logo: {
        width: 100,
        height: 100,
    },

    title: {
        color: COLORS.white,
        fontSize: 32,
        fontWeight: "900",
        letterSpacing: 3,
        textAlign: "center",
    },

    subtitle: {
        color: COLORS.primary,
        fontSize: 22,
        fontWeight: "800",
        letterSpacing: 6,
        marginTop: 4,
        textAlign: "center",
    },

    tagBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1F1A0E",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: RADIUS.full,
        marginTop: 24,
        borderWidth: 1,
        borderColor: "#3D3012",
    },

    tagText: {
        color: COLORS.primary,
        fontSize: 10,
        fontWeight: "700",
        marginLeft: 6,
        letterSpacing: 1,
    },

    footer: {
        position: "absolute",
        bottom: 40,
        alignItems: "center",
    },

    loader: {
        marginBottom: 12,
    },

    copyrightText: {
        color: "#6B7280",
        fontSize: 11,
        fontWeight: "600",
        letterSpacing: 0.5,
    },
});