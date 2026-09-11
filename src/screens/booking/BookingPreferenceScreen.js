import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../../components/common/AppScreen";
import PrimaryButton from "../../components/common/PrimaryButton";

import { useBooking } from "../../context/BookingContext";

import {
    COLORS,
    SPACING,
    RADIUS,
} from "../../theme";

export default function BookingPreferenceScreen({ navigation }) {
    const { updateBooking } = useBooking();

    const [selected, setSelected] = useState("PREFERRED_TIME");

    const handleContinue = () => {
        updateBooking({
            bookingType: "PREFERRED_TIME",
            barber: null,
            chair: null,
        });

        navigation.navigate("SelectDate");
    };

    return (
        <AppScreen style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header Section */}
                <View style={styles.headerContainer}>
                    <View style={styles.stepBadge}>
                        <Ionicons
                            name="options-outline"
                            size={12}
                            color={COLORS.primary || "#D97706"}
                        />
                        <Text style={styles.stepBadgeText}>वेळ निवडा</Text>
                    </View>
                    <Text style={styles.heading}>
                        Appointment Preference
                    </Text>

                    <Text style={styles.subHeading}>
                        Choose when you would like to visit
                    </Text>
                </View>

                {/* Preferred Time */}
                <TouchableOpacity
                    activeOpacity={0.88}
                    style={[
                        styles.card,
                        selected === "PREFERRED_TIME" && styles.activeCard,
                    ]}
                    onPress={() => setSelected("PREFERRED_TIME")}
                >
                    <View style={styles.cardHeader}>
                        <View
                            style={[
                                styles.iconContainer,
                                selected === "PREFERRED_TIME" &&
                                styles.activeIconContainer,
                            ]}
                        >
                            <Ionicons
                                name="calendar-outline"
                                size={18}
                                color={
                                    selected === "PREFERRED_TIME"
                                        ? COLORS.white || "#FFFFFF"
                                        : COLORS.primary || "#D97706"
                                }
                            />
                        </View>

                        <Text style={styles.title}>
                            Choose Preferred Time
                        </Text>

                        {selected === "PREFERRED_TIME" ? (
                            <View style={styles.radioSelected}>
                                <Ionicons
                                    name="checkmark"
                                    size={14}
                                    color={COLORS.white || "#FFFFFF"}
                                />
                            </View>
                        ) : (
                            <View style={styles.radioUnselected} />
                        )}
                    </View>

                    <Text style={styles.desc}>
                        तुमची आवडती तारीख आणि वेळ निवडा. सलून तुमच्या विनंतीनुसार
                        उपलब्ध वेळ निश्चित करेल.
                    </Text>

                    <View style={styles.divider} />

                    <View style={styles.infoBadge}>
                        <View style={styles.waitIconWrapper}>
                            <Ionicons
                                name="information-circle-outline"
                                size={14}
                                color={COLORS.primary || "#D97706"}
                            />
                        </View>

                        <Text style={styles.infoText}>
                            Preferred time is not guaranteed
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>

            {/* Bottom Footer */}
            <View style={styles.footer}>
                <PrimaryButton
                    title="Continue"
                    onPress={handleContinue}
                />
            </View>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background || "#F9FAFB",
    },

    scrollContent: {
        padding: SPACING.lg || 20,
        paddingBottom: 110,
    },

    headerContainer: {
        marginBottom: 20,
    },

    stepBadge: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: "#FFFBEB",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#FEF3C7",
    },

    stepBadgeText: {
        fontSize: 12,
        fontWeight: "700",
        color: COLORS.primary || "#D97706",
        marginLeft: 4,
    },

    heading: {
        fontSize: 26,
        fontWeight: "800",
        color: COLORS.black || "#111827",
        letterSpacing: -0.5,
    },

    subHeading: {
        color: "#6B7280",
        marginTop: 4,
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 20,
    },

    card: {
        backgroundColor: COLORS.white || "#FFFFFF",
        padding: SPACING.lg || 20,
        borderRadius: RADIUS.xl || 20,
        borderWidth: 1.5,
        borderColor: "#E5E7EB",
        marginBottom: 16,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.04,
                shadowRadius: 10,
            },
            android: {
                elevation: 3,
            },
        }),
    },

    activeCard: {
        borderColor: COLORS.primary || "#F59E0B",
        backgroundColor: "#FFFDF9",
        ...Platform.select({
            ios: {
                shadowColor: COLORS.primary || "#F59E0B",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
            },
            android: {
                elevation: 4,
            },
        }),
    },

    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
    },

    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#FEF3C7",
        alignItems: "center",
        justifyContent: "center",
    },

    activeIconContainer: {
        backgroundColor: COLORS.primary || "#F59E0B",
    },

    title: {
        flex: 1,
        fontSize: 17,
        fontWeight: "700",
        color: COLORS.black || "#111827",
        marginLeft: 12,
        letterSpacing: -0.2,
    },

    radioSelected: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.primary || "#F59E0B",
        alignItems: "center",
        justifyContent: "center",
    },

    radioUnselected: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: "#D1D5DB",
    },

    desc: {
        marginTop: 10,
        color: "#4B5563",
        lineHeight: 20,
        fontSize: 13,
        fontWeight: "400",
    },

    divider: {
        height: 1,
        backgroundColor: "#F3F4F6",
        marginVertical: 14,
    },

    waitIconWrapper: {
        marginRight: 6,
    },
    infoBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFBEB",
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#FEF3C7",
    },

    infoText: {
        color: "#92400E",
        fontSize: 12,
        fontWeight: "600",
        marginLeft: 6,
    },

    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: SPACING.lg || 20,
        paddingBottom: Platform.OS === "ios" ? 32 : 20,
        paddingTop: 14,
        backgroundColor: COLORS.white || "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 8,
    },
});