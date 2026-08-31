import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Animated,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";

// Theme Colors derived from the target image
const THEME = {
    background: "#F5E6BD", // Warm Cream
    primaryGold: "#B88E28",
    darkBadgeBg: "#5E5647",
    glowRingBg: "#E8D5A3",
    whiteText: "#FFFFFF",
    subtleGoldText: "#C2A353",
    dotInactive: "#D2BD8E",
    dotActive: "#FFFFFF",
};

export default function SplashScreen({ navigation }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
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
        ]).start();

        const timer = setTimeout(() => {
            navigation.replace("Login");
        }, 2800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AppScreen style={styles.container}>
            <StatusBar
                backgroundColor={THEME.background}
                barStyle="dark-content"
            />

            {/* Top Small Badge Icon */}
            <Animated.View style={[styles.topBadgeContainer, { opacity: fadeAnim }]}>
                <View style={styles.topBadgeOuter}>
                    <View style={styles.topBadgeInner}>
                        <Ionicons name="cut" size={24} color={THEME.primaryGold} />
                    </View>
                </View>

                <View style={styles.headerRow}>
                    <Ionicons name="ribbon-outline" size={16} color={THEME.primaryGold} />
                    <Text style={styles.headerText}>PREMIUM SALON</Text>
                    <Ionicons name="ribbon-outline" size={16} color={THEME.primaryGold} />
                </View>
            </Animated.View>

            {/* Center Main Emblem & Text */}
            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                {/* Decorative Circular Emblem */}
                <View style={styles.emblemOuterCircle}>
                    <View style={styles.emblemDashedCircle}>
                        <Ionicons name="cut" size={28} color={THEME.primaryGold} style={styles.scissorsIcon} />
                        <View style={styles.dividerLine} />
                        <Text style={styles.emblemText}>LUXURY</Text>
                        <Text style={styles.emblemText}>GROOMING</Text>
                    </View>
                </View>

                {/* Main Devanagari Typography */}
                <Text style={styles.mainTitle}>NEW FASHION HAIR STYLE</Text>

                {/* Description Subtitle */}
                <Text style={styles.subtitle}>
                    Elegant cuts, premium styling, and{"\n"}modern salon care.
                </Text>
            </Animated.View>

            {/* Bottom Loader & Footer Text */}
            <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
                <View style={styles.paginationDots}>
                    <View style={[styles.dot, styles.dotInactive]} />
                    <View style={[styles.dot, styles.dotActive]} />
                    <View style={[styles.dot, styles.dotInactive]} />
                </View>

                <View style={styles.footerTextRow}>
                    <Ionicons name="sparkles-outline" size={12} color={THEME.subtleGoldText} style={styles.sparkleIcon} />
                    <Text style={styles.loadingText}>
                        LOADING PREMIUM EXPERIENCE
                    </Text>
                </View>
            </Animated.View>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.background,
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 50,
        paddingHorizontal: 24,
    },

    /* Top Section */
    topBadgeContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    topBadgeOuter: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: THEME.glowRingBg,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    topBadgeInner: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: THEME.darkBadgeBg,
        alignItems: "center",
        justifyContent: "center",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    headerText: {
        color: THEME.primaryGold,
        fontSize: 13,
        fontWeight: "700",
        letterSpacing: 4,
    },

    /* Content Section */
    content: {
        alignItems: "center",
        width: "100%",
        marginVertical: 40, // Adds vertical space above and below the center section
    },

    /* Footer Section */
    footer: {
        alignItems: "center",
        marginTop: "auto", // Pushes the footer all the way to the bottom edge
        paddingBottom: 20, // Creates margin from the device bottom screen boundary
    },
    emblemOuterCircle: {
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: THEME.glowRingBg,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 36,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 10,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    emblemDashedCircle: {
        width: 154,
        height: 154,
        borderRadius: 77,
        borderWidth: 1.5,
        borderColor: THEME.primaryGold,
        borderStyle: "dashed",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    scissorsIcon: {
        transform: [{ rotate: "-45deg" }],
        marginBottom: 4,
    },
    dividerLine: {
        width: 50,
        height: 1,
        backgroundColor: THEME.primaryGold,
        marginVertical: 6,
        opacity: 0.6,
    },
    emblemText: {
        color: THEME.subtleGoldText,
        fontSize: 9,
        fontWeight: "700",
        letterSpacing: 3,
        textAlign: "center",
        marginTop: 2,
    },
    mainTitle: {
        color: THEME.whiteText,
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        letterSpacing: 0.5,
        textShadowColor: "rgba(0, 0, 0, 0.15)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        color: THEME.whiteText,
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center",
        marginTop: 10,
        lineHeight: 20,
        opacity: 0.9,
    },

    /* Footer Section */
    paginationDots: {
        flexDirection: "row",
        gap: 6,
        marginBottom: 16,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    dotInactive: {
        backgroundColor: THEME.dotInactive,
    },
    dotActive: {
        backgroundColor: THEME.dotActive,
    },
    footerTextRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    sparkleIcon: {
        marginRight: 6,
    },
    loadingText: {
        color: THEME.whiteText,
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 2,
        opacity: 0.8,
    },
});